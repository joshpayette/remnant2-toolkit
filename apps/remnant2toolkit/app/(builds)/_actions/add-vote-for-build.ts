'use server';

import { prisma } from '@repo/db';
import { bigIntFix } from '@repo/utils';
import { revalidatePath } from 'next/cache';

import { BUILD_REVALIDATE_PATHS } from '@/app/(builds)/_constants/build-revalidate-paths';
import { type BuildActionResponse } from '@/app/(builds)/_types/build-action-response';
import { getSession } from '@/app/(user)/_auth/services/sessionService';

export async function addVoteForBuild({
  buildId,
}: {
  buildId: string;
}): Promise<BuildActionResponse> {
  // session validation
  const session = await getSession();
  if (!session || !session.user) {
    return {
      message: 'You must be logged in.',
    };
  }

  if (!buildId) {
    return {
      errors: ['No buildId provided!'],
    };
  }

  try {
    // Check if user has a vote for this build already
    const isVoteRegistered = await prisma.buildVoteCounts.findFirst({
      where: {
        buildId,
        userId: session.user.id,
      },
    });

    if (isVoteRegistered) {
      return {
        message: 'Vote saved!',
      };
    }

    await prisma.buildVoteCounts.create({
      data: {
        buildId,
        userId: session.user.id,
      },
    });

    // Get the new total upvotes
    const totalUpvotes = await prisma.buildVoteCounts.count({
      where: {
        buildId,
      },
    });

    // Refresh the cache for the routes
    for (const path of BUILD_REVALIDATE_PATHS) {
      revalidatePath(path, 'page');
    }

    revalidatePath(`/builder/[buildId]`, 'page');
    revalidatePath(`/builder/linked/[linkedBuildId]`, 'page');

    return bigIntFix({
      message: 'Vote saved!',
      totalUpvotes: totalUpvotes,
    });
  } catch (e) {
    console.error(e);
    return {
      errors: ['Error in saving vote!'],
    };
  }
}
