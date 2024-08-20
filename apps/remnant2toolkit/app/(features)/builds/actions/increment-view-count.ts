'use server';

import { prisma } from '@repo/db';

import { getSession } from '@/app/(features)/auth/services/sessionService';
import { BuildActionResponse } from '@/app/(features)/builds/types/build-action-response';

export async function incrementViewCount({
  buildId,
}: {
  buildId: string;
}): Promise<BuildActionResponse & { viewCount: number }> {
  const session = await getSession();
  const userId = session?.user?.id;

  try {
    const build = await prisma.build.findUnique({
      where: {
        id: buildId,
      },
      select: {
        createdById: true,
        updatedAt: true,
        viewCount: true,
      },
    });

    if (!build) {
      return {
        errors: ['Build not found!'],
        viewCount: -1,
      };
    }

    // If the build is created by the user, do not add a view
    if (userId) {
      if (build?.createdById === userId) {
        return {
          message:
            'View count not incremented as the build is created by the user!',
          viewCount: build.viewCount,
        };
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
      });
    }

    const updatedBuild = await prisma.build.update({
      where: {
        id: buildId,
      },
      data: {
        viewCount: {
          increment: 1,
        },
        updatedAt: build.updatedAt,
      },
    });

    return {
      message: 'View count incremented!',
      viewCount: updatedBuild.viewCount,
    };
  } catch (e) {
    console.error(`Error in incrementing view count for build ${buildId}!`);
    return {
      errors: ['Error in incrementing view count!'],
      viewCount: -1,
    };
  }
}
