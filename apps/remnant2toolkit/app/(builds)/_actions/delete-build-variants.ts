'use server';

import { prisma } from '@repo/db';
import { revalidatePath } from 'next/cache';

import { getSession } from '@/app/(user)/_auth/services/sessionService';

import { BUILD_REVALIDATE_PATHS } from '../_constants/build-revalidate-paths';
import { type BuildActionResponse } from '../_types/build-action-response';

export async function DeleteBuildVariants(
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

    // find all build variants
    const buildVariantResponse = await prisma.buildVariant.findMany({
      where: {
        primaryBuildId: build.id,
      },
      select: {
        secondaryBuildId: true,
      },
    });

    const dbResponse = await prisma.build.deleteMany({
      where: {
        id: {
          in: [...buildVariantResponse.map((bv) => bv.secondaryBuildId)],
        },
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
      buildId,
    };
  } catch (e) {
    console.error(e);
    return {
      errors: ['Error in deleting build!'],
    };
  }
}
