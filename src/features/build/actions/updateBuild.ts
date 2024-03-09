'use server'

import { revalidatePath } from 'next/cache'

import { getServerSession } from '@/features/auth/lib'
import { checkBadWords, cleanBadWords } from '@/features/bad-word-filter'
import { getBuildDescriptionParams } from '@/features/build-feed-cache/getBuildDescriptionParams'
import { getBuildNameParams } from '@/features/build-feed-cache/getBuildNameParams'
import { getBuildPublicParams } from '@/features/build-feed-cache/getBuildPublicParams'
import { getBuildReferenceLinkParams } from '@/features/build-feed-cache/getBuildReferenceLinkParams'
import { sendBuildUpdateNotification } from '@/features/build-feed-cache/sendBuildUpdateNotification'
import { prisma } from '@/features/db'

import { BUILD_REVALIDATE_PATHS, DEFAULT_BUILD_NAME } from '../constants'
import { buildStateSchema } from '../lib/buildStateSchema'
import { buildStateToBuildItems } from '../lib/buildStateToBuildItems'
import { BuildActionResponse, BuildState } from '../types'

export async function updateBuild(data: string): Promise<BuildActionResponse> {
  // session validation
  const session = await getServerSession()
  if (!session || !session.user) {
    return {
      message: 'You must be logged in.',
    }
  }

  // build validation
  const unvalidatedData = JSON.parse(data)
  const validatedData = buildStateSchema.safeParse(unvalidatedData)
  if (!validatedData.success) {
    console.error('Error in data!', validatedData.error)
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

  const updatedBuildItems = buildStateToBuildItems(buildState)

  if (
    checkBadWords(buildState.name) ||
    checkBadWords(buildState.description ?? '')
  ) {
    buildState.isPublic = false
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
        buildLink: buildState.buildLink,
        isPatchAffected: false, // Automatically unflag if build was updated after being flagged
        BuildItems: {
          deleteMany: {},
          create: updatedBuildItems,
        },
      },
    })

    if (!updatedBuild) {
      return {
        errors: ['Error updating build.'],
      }
    }

    // If the build name has updated, send the build info to Discord
    if (existingBuild?.name !== buildState.name && buildState.isPublic) {
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
      buildState.isPublic
    ) {
      const params = getBuildReferenceLinkParams({
        referenceLink: buildState.buildLink,
      })
      await sendBuildUpdateNotification({ params, buildId: buildState.buildId })
    }

    // Refresh the cache for the route
    // Refresh the cache for the route
    for (const path of BUILD_REVALIDATE_PATHS) {
      revalidatePath(path)
    }
    revalidatePath(`/builder/${buildState.buildId}`)

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
