'use server'

import { revalidatePath } from 'next/cache'

import {
  BUILD_REVALIDATE_PATHS,
  DEFAULT_BUILD_NAME,
  MAX_BUILD_DESCRIPTION_LENGTH,
} from '@/app/(data)/builds/constants'
import { validateBuildState } from '@/app/(validators)/validate-build-state'
import { getServerSession } from '@/features/auth/lib'
import { checkBadWords, cleanBadWords } from '@/features/bad-word-filter'
import { buildStateToBuildItems } from '@/features/build/lib/buildStateToBuildItems'
import { BuildActionResponse, BuildState } from '@/features/build/types'
import { prisma } from '@/features/db'
import { getBuildDescriptionParams } from '@/features/moderation/build-feed/getBuildDescriptionParams'
import { getBuildNameParams } from '@/features/moderation/build-feed/getBuildNameParams'
import { getBuildPublicParams } from '@/features/moderation/build-feed/getBuildPublicParams'
import { getBuildReferenceLinkParams } from '@/features/moderation/build-feed/getBuildReferenceLinkParams'
import { sendBuildUpdateNotification } from '@/features/moderation/build-feed/sendBuildUpdateNotification'

export async function updateBuild(data: string): Promise<BuildActionResponse> {
  // session validation
  const session = await getServerSession()
  if (!session || !session.user) {
    return {
      message: 'You must be logged in.',
    }
  }

  // build validation
  let unvalidatedData = JSON.parse(data)
  // convert date strings to dates for validation
  unvalidatedData = {
    ...unvalidatedData,
    createdAt: new Date(unvalidatedData.createdAt),
    updatedAt: new Date(unvalidatedData.updatedAt),
    buildTags: unvalidatedData.buildTags.map((tag: any) => ({
      ...tag,
      createdAt: tag.createdAt ? new Date(tag.createdAt) : new Date(),
      updatedAt: tag.updatedat ? new Date(tag.updatedAt) : null,
    })),
  }

  const validatedData = validateBuildState(unvalidatedData)
  if (!validatedData.success) {
    console.error('Error in data!', validatedData.error.flatten().fieldErrors)
    return {
      errors: [validatedData.error.flatten().fieldErrors],
    }
  }
  const buildState = validatedData.data as BuildState

  if (buildState.createdById !== session.user.id) {
    return {
      errors: ['You must be logged in as the build creator to edit a build.'],
    }
  }

  if (!buildState.buildId) {
    return {
      errors: ['No buildId provided!'],
    }
  }

  // If no archetypes are selected, throw an error
  if (!buildState.items.archetype || buildState.items.archetype.length === 0) {
    return {
      errors: ['You must select at least one archetype.'],
    }
  }

  const updatedBuildItems = buildStateToBuildItems(buildState)

  if (
    checkBadWords(buildState.name) ||
    checkBadWords(buildState.description ?? '')
  ) {
    buildState.isPublic = false
  }

  // if the description is longer than allowed, truncate it
  if (
    buildState.description &&
    buildState.description.length > MAX_BUILD_DESCRIPTION_LENGTH
  ) {
    buildState.description =
      buildState.description.slice(0, MAX_BUILD_DESCRIPTION_LENGTH - 3) + '...'
  }

  // Get the existing build
  const existingBuild = await prisma.build.findUnique({
    where: {
      id: buildState.buildId,
    },
  })

  try {
    const updatedBuild = await prisma.build.update({
      where: {
        id: buildState.buildId,
        createdBy: {
          id: session.user.id,
        },
      },
      data: {
        name:
          buildState.name && buildState.name !== ''
            ? cleanBadWords(buildState.name)
            : DEFAULT_BUILD_NAME,
        description:
          buildState.description && buildState.description !== ''
            ? cleanBadWords(buildState.description)
            : '',
        isPublic: Boolean(buildState.isPublic),
        isPatchAffected: Boolean(buildState.isPatchAffected),
        buildLink: buildState.buildLink,
        BuildItems: {
          deleteMany: {}, // removes all items before creating them again
          create: updatedBuildItems,
        },
        BuildTags: buildState.buildTags
          ? {
              deleteMany: {}, // removes all tags before creating them again
              create: buildState.buildTags.map((tag) => {
                return {
                  tag: tag.tag,
                }
              }),
            }
          : undefined,
      },
    })

    if (!updatedBuild) {
      return {
        errors: ['Error updating build.'],
      }
    }

    // If the build name has updated, send the build info to Discord
    if (
      existingBuild?.name !== buildState.name &&
      buildState.isPublic === true
    ) {
      const params = getBuildNameParams({ newBuildName: buildState.name })
      await sendBuildUpdateNotification({ params, buildId: buildState.buildId })
    }

    // If the build was private but is now public, send the build info to Discord
    if (existingBuild?.isPublic === false && buildState.isPublic === true) {
      const params = getBuildPublicParams()
      await sendBuildUpdateNotification({ params, buildId: buildState.buildId })
    }

    // If the build description has updated, send the build info to Discord
    if (
      existingBuild?.description &&
      buildState.description &&
      existingBuild.description !== buildState.description &&
      buildState.description.trim().length > 0 &&
      existingBuild.description.trim().length > 0 &&
      buildState.isPublic
    ) {
      const params = getBuildDescriptionParams({
        buildId: buildState.buildId,
        newDescription: buildState.description.trim(),
        oldDescription: existingBuild.description.trim(),
      })
      await sendBuildUpdateNotification({ params, buildId: buildState.buildId })
    }

    // If the build link has updated, send the build info to Discord
    if (
      buildState.buildLink &&
      existingBuild?.buildLink !== buildState.buildLink &&
      buildState.buildLink.trim().length > 0 &&
      buildState.isPublic === true
    ) {
      const params = getBuildReferenceLinkParams({
        referenceLink: buildState.buildLink,
      })
      await sendBuildUpdateNotification({ params, buildId: buildState.buildId })
    }

    // Refresh the cache for the route
    for (const path of BUILD_REVALIDATE_PATHS) {
      revalidatePath(path, 'page')
    }
    revalidatePath(`/builder/[buildId]`, 'page')

    return {
      message: 'Build successfully updated!',
      buildId: updatedBuild.id,
    }
  } catch (e) {
    console.error(e)
    return {
      errors: ['Unknown error updating build.'],
    }
  }
}
