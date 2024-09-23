'use server';

import { prisma } from '@repo/db';
import { revalidatePath } from 'next/cache';

import { badWordFilter } from '@/app/_libs/bad-word-filter';
import { BUILD_REVALIDATE_PATHS } from '@/app/(builds)/_constants/build-revalidate-paths';
import { DEFAULT_BUILD_NAME } from '@/app/(builds)/_constants/default-build-name';
import { buildStateToBuildItems } from '@/app/(builds)/_libs/build-state-to-build-items';
import { type BuildActionResponse } from '@/app/(builds)/_types/build-action-response';
import { type BuildState } from '@/app/(builds)/_types/build-state';
import { getSession } from '@/app/(user)/_auth/services/sessionService';

export async function createBuild({
  buildVariants,
}: {
  buildVariants: BuildState[];
}): Promise<BuildActionResponse> {
  // session validation
  const session = await getSession();
  if (!session || !session.user || !session.user.id) {
    return {
      message: 'You must be logged in.',
    };
  }

  const mainBuildState = buildVariants[0];

  if (!mainBuildState) {
    return {
      errors: ['Error creating build - main build state not found.'],
    };
  }

  try {
    // Add each build and variant to the Build table
    const createBuildsResponse = await Promise.all(
      buildVariants.map((variant) => {
        return prisma.build.create({
          data: {
            name:
              variant.name && variant.name !== ''
                ? badWordFilter.clean(variant.name)
                : DEFAULT_BUILD_NAME,
            description:
              variant.description && variant.description !== ''
                ? badWordFilter.clean(variant.description)
                : '',
            isPublic: Boolean(variant.isPublic),
            isPatchAffected: Boolean(variant.isPatchAffected),
            isModeratorApproved: false,
            videoUrl: variant.videoUrl,
            buildLink: variant.buildLink,
            buildLinkUpdatedAt: variant.buildLinkUpdatedAt,
            createdBy: {
              connect: {
                id: session.user?.id,
              },
            },
            BuildItems: {
              create: buildStateToBuildItems(variant).filter(
                (variant) => variant !== undefined,
              ),
            },
            BuildTags: variant.buildTags
              ? {
                  create: variant.buildTags.map((tag) => {
                    return {
                      tag: tag.tag,
                    };
                  }),
                }
              : undefined,
          },
        });
      }),
    );

    const mainBuildResponse = createBuildsResponse[0];
    const variantBuildResponses = createBuildsResponse.slice(1);

    if (!mainBuildResponse || !mainBuildResponse.id) {
      console.error(
        'Error creating build - main build not created successfully.',
      );
      return {
        errors: ['Error creating build - main build not created successfully.'],
      };
    }

    // Add the newly created builds to the BuildVariant table
    const _createBuildVariantsResponse = await prisma.buildVariant.createMany({
      data: variantBuildResponses.map((build, index) => {
        return {
          primaryBuildId: mainBuildResponse?.id as string,
          secondaryBuildId: build.id,
          index: index + 1,
        };
      }),
    });

    // Refresh the cache for the route
    for (const path of BUILD_REVALIDATE_PATHS) {
      revalidatePath(path, 'page');
    }

    return {
      message: 'Build successfully saved!',
      buildId: createBuildsResponse[0]?.id,
    };
  } catch (error) {
    console.error('Error updating build:', error);
    return {
      errors: ['Error updating build - database error occurred.'],
    };
  }
}
