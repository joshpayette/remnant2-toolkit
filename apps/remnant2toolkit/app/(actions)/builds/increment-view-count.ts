'use server'

import { prisma } from '@repo/db'

import { getServerSession } from '@/app/(features)/auth'
import type { BuildActionResponse } from '@/app/(types)/builds'

export async function incrementViewCount({
  buildId,
}: {
  buildId: string
}): Promise<BuildActionResponse> {
  const session = await getServerSession()
  const userId = session?.user?.id

  try {
    const build = await prisma.build.findUnique({
      where: {
        id: buildId,
      },
      select: {
        createdById: true,
        updatedAt: true,
      },
    })

    if (!build) {
      return {
        errors: ['Build not found!'],
      }
    }

    // If the build is created by the user, do not add a view
    if (userId) {
      if (build?.createdById === userId) {
        return {
          message:
            'View count not incremented as the build is created by the user!',
        }
      }
    }

    // if the user is authenticated, add a BuildValidatedView count for the user and build if it doesn't exist
    if (userId) {
      await prisma.buildValidatedViews.upsert({
        where: {
          id: `${buildId}-${userId}`,
        },
        update: {},
        create: {
          id: `${buildId}-${userId}`,
          buildId,
          userId,
        },
      })
    }

    await prisma.build.update({
      where: {
        id: buildId,
      },
      data: {
        viewCount: {
          increment: 1,
        },
        updatedAt: build.updatedAt,
      },
    })

    return {
      message: 'View count incremented!',
    }
  } catch (e) {
    console.error(`Error in incrementing view count for build ${buildId}!`)
    return {
      errors: ['Error in incrementing view count!'],
    }
  }
}
