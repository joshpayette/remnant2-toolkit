'use server'

import { prisma } from '@repo/db'

import { getServerSession } from '@/app/(features)/auth'
import type { BuildActionResponse } from '@/app/(types)/builds'

export async function incrementDuplicateCount({
  buildId,
}: {
  buildId: string
}): Promise<BuildActionResponse> {
  const session = await getServerSession()
  const userId = session?.user?.id

  try {
    // If the build is created by the user, do not add a count
    if (userId) {
      const build = await prisma.build.findUnique({
        where: {
          id: buildId,
        },
        select: {
          createdById: true,
        },
      })

      if (build?.createdById === userId) {
        return {
          message:
            'Duplicate count not incremented as the build is created by the user!',
        }
      }
    }

    await prisma.build.update({
      where: {
        id: buildId,
      },
      data: {
        duplicateCount: {
          increment: 1,
        },
      },
    })

    return {
      message: 'Duplicate count incremented!',
    }
  } catch (e) {
    console.error(`Error in incrementing duplicate count for build ${buildId}!`)
    return {
      errors: ['Error in incrementing duplicate count!'],
    }
  }
}
