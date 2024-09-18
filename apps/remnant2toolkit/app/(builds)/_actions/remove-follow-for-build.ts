'use server';

import { prisma } from '@repo/db';
import { bigIntFix } from '@repo/utils';
import { revalidatePath } from 'next/cache';

import { BUILD_REVALIDATE_PATHS } from '@/app/(builds)/_constants/build-revalidate-paths';
import { type BuildActionResponse } from '@/app/(builds)/_types/build-action-response';
import { getSession } from '@/app/(user)/_auth/services/sessionService';

export async function removeFollowForBuild({
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
    // Check if user has followed for this build already
    const isBuildFollowed = await prisma.buildFollow.findFirst({
      where: {
        followedId: buildId,
        followerId: session.user.id,
      },
    });

    if (!isBuildFollowed) {
      return {
        message: 'Build unfollowed!',
      };
    }

    await prisma.buildFollow.deleteMany({
      where: {
        followedId: buildId,
        followerId: session.user.id,
      },
    });

    // Refresh the cache for the routes
    for (const path of BUILD_REVALIDATE_PATHS) {
      revalidatePath(path, 'page');
    }
    revalidatePath(`/builder/[buildId]`, 'page');
    revalidatePath(`/builder/linked/[linkedBuildId]`, 'page');

    return bigIntFix({
      message: 'Removed follow for build!',
    });
  } catch (e) {
    console.error(e);
    return {
      errors: ['Error in saving build unfollow!'],
    };
  }
}
