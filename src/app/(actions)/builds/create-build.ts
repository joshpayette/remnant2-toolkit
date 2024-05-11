'use server'

import { revalidatePath } from 'next/cache'

import {
  BUILD_REVALIDATE_PATHS,
  DEFAULT_BUILD_NAME,
  MAX_BUILD_DESCRIPTION_LENGTH,
} from '@/app/(data)/builds/constants'
import { BuildActionResponse } from '@/app/(types)/builds'
import { getServerSession } from '@/app/(utils)/auth'
import { checkBadWords, cleanBadWords } from '@/app/(utils)/bad-word-filter'
import { buildStateToBuildItems } from '@/app/(utils)/builds/build-state-to-build-items'
import { isPermittedBuilder } from '@/app/(utils)/builds/permitted-builders'
import { prisma } from '@/app/(utils)/db'
import { validateBuildState } from '@/app/(validators)/validate-build-state'

export async function createBuild(data: string): Promise<BuildActionResponse> {
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
    dateFeatured: unvalidatedData.dateFeatured
      ? new Date(unvalidatedData.dateFeatured)
      : null,
    updatedAt: unvalidatedData.updatedAt
      ? new Date(unvalidatedData.updatedAt)
      : null,
    buildTags: unvalidatedData.buildTags
      ? unvalidatedData.buildTags.map((tag: any) => ({
          ...tag,
          createdAt: tag.createdAt ? new Date(tag.createdAt) : new Date(),
          updatedAt: tag.updatedat ? new Date(tag.updatedAt) : null,
        }))
      : null,
  }

  const validatedData = validateBuildState(unvalidatedData)
  if (!validatedData.success) {
    console.error('Error in data!', validatedData.error.flatten().fieldErrors)
    return {
      errors: [validatedData.error.flatten().fieldErrors],
    }
  }
  const buildState = validatedData.data
  const buildItems = buildStateToBuildItems(buildState)

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

  // If no archetypes are selected, throw an error
  if (!buildState.items.archetype || buildState.items.archetype.length === 0) {
    return {
      errors: ['You must select at least one archetype.'],
    }
  }

  try {
    const dbResponse = await prisma.build.create({
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
        createdBy: {
          connect: {
            id: session.user.id,
          },
        },
        BuildItems: {
          create: buildItems,
        },
        BuildTags: buildState.buildTags
          ? {
              create: buildState.buildTags.map((tag) => {
                return {
                  tag: tag.tag,
                }
              }),
            }
          : undefined,
      },
    })

    // check for errors in dbResponse
    if (!dbResponse) {
      return {
        errors: ['Error saving build to the database.'],
      }
    }

    // Register a vote for the build
    await prisma.buildVoteCounts.create({
      data: {
        buildId: dbResponse.id,
        userId: session.user.id,
      },
    })

    // Trigger webhook to send build to Discord
    if (
      buildState.isPublic === true &&
      process.env.NODE_ENV === 'production' &&
      !isPermittedBuilder(session.user.id)
    ) {
      const params = {
        content: `New build created! https://www.remnant2toolkit.com/builder/${
          dbResponse.id
        }?t=${Date.now()}`,
      }

      const res = await fetch(`${process.env.WEBHOOK_COMMUNITY_BUILDS}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      })

      if (!res.ok) {
        console.error('Error in sending build moderation webhook to Discord!')
      }

      const res2 = await fetch(`${process.env.WEBHOOK_NEW_BUILD_FEED}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      })

      if (!res2.ok) {
        console.error('Error in sending new build webhook to Discord!')
      }
    }

    // Refresh the cache for the route
    for (const path of BUILD_REVALIDATE_PATHS) {
      revalidatePath(path, 'page')
    }

    return {
      message: 'Build successfully saved!',
      buildId: dbResponse.id,
    }
  } catch (e) {
    console.error(e)
    return {
      errors: ['Error saving build to the database.'],
    }
  }
}
