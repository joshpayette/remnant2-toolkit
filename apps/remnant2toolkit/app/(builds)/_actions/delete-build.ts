'use server';

import { prisma } from '@repo/db';
import { revalidatePath } from 'next/cache';

import { BUILD_REVALIDATE_PATHS } from '@/app/(builds)/_constants/build-revalidate-paths';
import { type BuildActionResponse } from '@/app/(builds)/_types/build-action-response';
import { getSession } from '@/app/(features)/auth/services/sessionService';

export async function deleteBuild(
  buildId: string,
): Promise<BuildActionResponse> {
  // session validation
  const session = await getSession();
  if (!session || !session.user) {
    return {
      errors: ['You must be logged in.'],
    };
  }

  try {
    const build = await prisma.build.findUnique({
      where: {
        id: buildId,
      },
      include: {
        createdBy: true,
      },
    });
    if (!build) {
      return {
        errors: [`Build with id ${buildId} not found.`],
      };
    }

    if (build.createdBy.id !== session.user.id) {
      return {
        errors: [
          'You must be logged in as the build creator to delete a build.',
        ],
      };
    }

    const dbResponse = await prisma.build.delete({
      where: {
        id: build.id,
      },
    });

    // check for errors in dbResponse
    if (!dbResponse) {
      return {
        errors: ['Error in deleting build!'],
      };
    }

    // Refresh the cache for the routes
    for (const path of BUILD_REVALIDATE_PATHS) {
      revalidatePath(path, 'page');
    }

    return {
      message: 'Build successfully deleted!',
      buildId: dbResponse.id,
    };
  } catch (e) {
    console.error(e);
    return {
      errors: ['Error in deleting build!'],
    };
  }
}
