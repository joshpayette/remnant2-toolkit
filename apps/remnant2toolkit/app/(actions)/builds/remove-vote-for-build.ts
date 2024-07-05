'use server'

import { prisma } from '@repo/db'
import { bigIntFix } from '@repo/utils/big-int-fix'
import { revalidatePath } from 'next/cache'

import { BUILD_REVALIDATE_PATHS } from '@/app/(data)/builds/constants'
import { getServerSession } from '@/app/(features)/auth'
import { BuildActionResponse } from '@/app/(types)/builds'

export async function removeVoteForBuild({
  buildId,
}: {
  buildId: string
}): Promise<BuildActionResponse> {
  // session validation
  const session = await getServerSession()
  if (!session || !session.user) {
    return {
      message: 'You must be logged in.',
    }
  }

  if (!buildId) {
    return {
      errors: ['No buildId provided!'],
    }
  }

  try {
    // If user created this build, they can't remove their vote
    const build = await prisma.build.findUnique({
      where: {
        id: buildId,
      },
    })

    if (!build) {
      return {
        errors: ['Build not found!'],
      }
    }

    const userCreatedBuild = build.createdById === session.user.id
    if (userCreatedBuild) {
      return {
        message: 'You cannot remove your vote from your own build!',
      }
    }

    // Remove the build from the user's loadouts if it's there
    await prisma.userLoadouts.deleteMany({
      where: {
        buildId,
        userId: session.user.id,
      },
    })

    // Check if user has a vote for this build already
    const isVoteRegistered = await prisma.buildVoteCounts.findFirst({
      where: {
        buildId,
        userId: session.user.id,
      },
    })

    if (!isVoteRegistered) {
      return {
        message: 'Vote removed!',
      }
    }

    await prisma.buildVoteCounts.delete({
      where: {
        id: isVoteRegistered.id,
      },
    })

    // Get the new total upvotes
    const totalUpvotes = await prisma.buildVoteCounts.count({
      where: {
        buildId,
      },
    })

    // Refresh the cache for the routes
    for (const path of BUILD_REVALIDATE_PATHS) {
      revalidatePath(path, 'page')
    }

    revalidatePath(`/builder/[buildId]`, 'page')
    revalidatePath(`/builder/linked/[linkedBuildId]`, 'page')

    return bigIntFix({
      message: 'Vote removed!',
      totalUpvotes: totalUpvotes,
    })
  } catch (e) {
    console.error(e)
    return {
      errors: ['Error in saving vote!'],
    }
  }
}
