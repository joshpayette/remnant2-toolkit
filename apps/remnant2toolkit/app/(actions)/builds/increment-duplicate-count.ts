'use server'

import { prisma } from '@repo/db'

import type { BuildActionResponse } from '@/app/(types)/builds'

export async function incrementDuplicateCount({
  buildId,
}: {
  buildId: string
}): Promise<BuildActionResponse> {
  try {
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
