'use server';

import { type BuildActionResponse } from '@/app/(builds)/_types/build-action-response';
import { getSession } from '@/app/(user)/_auth/services/sessionService';
import { Prisma, prisma } from '@/lib/db';

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

    // If the user is authenticated, record a BuildValidatedView for the user and
    // build if it doesn't already exist. We track whether a NEW row was created
    // so the validatedViewCount is only incremented once per user.
    //
    // Check for an existing row first so the repeat-view never attempts a
    // duplicate insert.
    let isNewValidatedView = false;
    if (userId) {
      const validatedViewId = `${buildId}-${userId}`;
      const existingView = await prisma.buildValidatedViews.findUnique({
        where: { id: validatedViewId },
        select: { id: true },
      });

      if (!existingView) {
        try {
          await prisma.buildValidatedViews.create({
            data: {
              id: validatedViewId,
              buildId,
              userId,
            },
          });
          isNewValidatedView = true;
        } catch (e) {
          // Blocks a concurrent request creating the row between our check and insert.
          // Don't double-count; any other error should surface.
          if (
            !(
              e instanceof Prisma.PrismaClientKnownRequestError &&
              e.code === 'P2002'
            )
          ) {
            throw e;
          }
        }
      }
    }

    const updatedBuild = await prisma.build.update({
      where: {
        id: buildId,
      },
      data: {
        viewCount: {
          increment: 1,
        },
        ...(isNewValidatedView
          ? { validatedViewCount: { increment: 1 } }
          : {}),
        updatedAt: build.updatedAt,
      },
    });

    return {
      message: 'View count incremented!',
      viewCount: updatedBuild.viewCount,
    };
  } catch (e) {
    console.error(`Error in incrementing view count for build ${buildId}!`, e);
    return {
      errors: ['Error in incrementing view count!'],
      viewCount: -1,
    };
  }
}
