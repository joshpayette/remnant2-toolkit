'use server'

import { revalidatePath } from 'next/cache'

import { getServerSession } from '@/features/auth/lib'
import { checkBadWords, cleanBadWords } from '@/features/bad-word-filter'
import { prisma } from '@/features/db'

import {
  BUILD_REVALIDATE_PATHS,
  DEFAULT_BUILD_NAME,
  MAX_BUILD_DESCRIPTION_LENGTH,
} from '../constants'
import { buildStateSchema } from '../lib/buildStateSchema'
import { buildStateToBuildItems } from '../lib/buildStateToBuildItems'
import { BuildActionResponse, BuildState } from '../types'

export async function createBuild(data: string): Promise<BuildActionResponse> {
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
    if (buildState.isPublic && process.env.NODE_ENV === 'production') {
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
        console.error('Error in sending build webhook to Discord!')
      }
    }

    // Refresh the cache for the route
    for (const path of BUILD_REVALIDATE_PATHS) {
      revalidatePath(path)
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
