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

export async function updateBuild({
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
  const newVariants = buildVariants
    .slice(1)
    .map((variant, index) => {
      variant.variantIndex = index;
      return variant;
    })
    .filter((variant) => variant.buildId);

  if (!mainBuildState) {
    return {
      errors: ['Error updating build - main build state not found.'],
    };
  }
  if (!mainBuildState.buildId) {
    return {
      errors: ['Error updating build - main build ID not found.'],
    };
  }

  try {
    // Select all current build variants to compare the new batch to
    const existingVariants = await prisma.buildVariant.findMany({
      where: {
        primaryBuildId: mainBuildState.buildId,
      },
    });

    // Need to delete all variants not found in variantStates
    const variantsToDelete = existingVariants.filter(
      (existingVariant) =>
        !newVariants.some(
          (newVariant) =>
            newVariant.buildId === existingVariant.secondaryBuildId,
        ),
    );
    // Need to create all variants not found in existingVariants
    const variantsToCreate = newVariants.filter(
      (newVariant) =>
        !existingVariants.some(
          (existingVariant) =>
            newVariant.buildId === existingVariant.secondaryBuildId,
        ),
    );
    // Need to update all variants found in both existingVariants and variantStates
    const variantsToUpdate = newVariants.filter((newVariant) =>
      existingVariants.some(
        (existingVariant) =>
          newVariant.buildId === existingVariant.secondaryBuildId,
      ),
    );

    const buildCreator = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
      include: {
        UserProfile: true,
      },
    });

    if (!buildCreator) {
      console.error('Error updating build - build creator not found.');
      return {
        errors: ['Error updating build - build creator not found.'],
      };
    }

    // Delete all variants from the Build and BuildVariant tables
    const [_deleteBuildResponse, _deleteBuildVariantResponse] =
      await prisma.$transaction([
        prisma.build.deleteMany({
          where: {
            createdById: buildCreator.id,
            id: {
              in: variantsToDelete.map((variant) => variant.secondaryBuildId),
            },
          },
        }),
        prisma.buildVariant.deleteMany({
          where: {
            primaryBuildId: mainBuildState.buildId,
            secondaryBuildId: {
              in: variantsToDelete.map((variant) => variant.secondaryBuildId),
            },
          },
        }),
      ]);

    // Create all variants in the Build table and get the new ids
    // We don't use createMany as it doesn't return the new record ids
    const createBuildsResponse = await Promise.all(
      variantsToCreate.map(async (variant) => {
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
                id: buildCreator.id,
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
    // Add the newly created builds to the BuildVariant table
    const _createBuildVariantsResponse = await prisma.buildVariant.createMany({
      data: createBuildsResponse.map((build) => {
        return {
          primaryBuildId: mainBuildState.buildId as string,
          secondaryBuildId: build.id,
        };
      }),
    });

    // Update the Build table for all variants in the new batch
    const _updateBuildsResponse = await Promise.all(
      variantsToUpdate.map(async (variant) => {
        return prisma.build.update({
          where: {
            id: variant.buildId as string,
            createdBy: {
              id: buildCreator.id,
            },
          },
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
            videoUrl: variant.videoUrl,
            buildLink: variant.buildLink,
            buildLinkUpdatedAt: variant.buildLinkUpdatedAt,
            isModeratorApproved: false,
            isVideoApproved: variant.isVideoApproved,
            BuildItems: {
              deleteMany: {},
              create: buildStateToBuildItems(variant).filter(
                (variant) => variant !== undefined,
              ),
            },
            BuildTags: variant.buildTags
              ? {
                  deleteMany: {}, // removes all tags before creating them again
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

    // Updated the index on all buildVariants
    const updatedVariants = await prisma.buildVariant.findMany({
      where: {
        primaryBuildId: mainBuildState.buildId,
      },
    });
    await Promise.all(
      updatedVariants.map(async (variant, index) => {
        await prisma.buildVariant.update({
          where: {
            id: variant.id,
          },
          data: {
            index: index + 1,
          },
        });
      }),
    );

    // Refresh the cache for the route
    for (const path of BUILD_REVALIDATE_PATHS) {
      revalidatePath(path, 'page');
    }
    revalidatePath(`/builder/[buildId]`, 'page');

    return {
      message: 'Build successfully updated!',
      buildId: mainBuildState.buildId,
    };
  } catch (error) {
    console.error('Error updating build:', error);
    return {
      errors: ['Error updating build - database error occurred.'],
    };
  }
}
