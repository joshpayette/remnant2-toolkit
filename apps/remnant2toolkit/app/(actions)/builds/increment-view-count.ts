'use server'

import { prisma } from '@repo/db'

import type { BuildActionResponse } from '@/app/(types)/builds'

export async function incrementViewCount({
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
        viewCount: {
          increment: 1,
        },
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
