'use server';

import { type BuildTags, prisma } from '@repo/db';
import { urlNoCache } from '@repo/utils';
import { revalidatePath } from 'next/cache';

import { badWordFilter } from '@/app/_libs/bad-word-filter';
import { getBuildDescriptionParams } from '@/app/_libs/moderation/get-build-description-params';
import { sendWebhook } from '@/app/_libs/moderation/send-webhook';
import { verifyBuildState } from '@/app/_libs/moderation/verify-build-state';
import { verifyCreatorInfo } from '@/app/_libs/moderation/verify-creator-info';
import { validateEnv } from '@/app/_libs/validate-env';
import { BUILD_REVALIDATE_PATHS } from '@/app/(builds)/_constants/build-revalidate-paths';
import { DEFAULT_BUILD_NAME } from '@/app/(builds)/_constants/default-build-name';
import { buildStateToBuildItems } from '@/app/(builds)/_libs/build-state-to-build-items';
import { isBuildQualityBuild } from '@/app/(builds)/_libs/is-build-quality-build';
import { isPermittedBuilder } from '@/app/(builds)/_libs/permitted-builders';
import { type BuildActionResponse } from '@/app/(builds)/_types/build-action-response';
import { type BuildState } from '@/app/(builds)/_types/build-state';
import { getSession } from '@/app/(user)/_auth/services/sessionService';

import { validateBuildState } from '../_libs/validate-build-state';

// * Data has to be passed in as a string due to error trying to pass in Traits as plain objects
export async function updateBuild({
  buildVariantsStringified,
}: {
  buildVariantsStringified: string[];
}): Promise<BuildActionResponse> {
  const env = validateEnv();

  // session validation
  const session = await getSession();
  if (!session || !session.user || !session.user.id) {
    return {
      message: 'You must be logged in.',
    };
  }
  const userId = session.user.id;

  const buildVariants: BuildState[] = [];
  for (const variant of buildVariantsStringified) {
    // build validation
    let unvalidatedData = JSON.parse(variant);
    // convert date strings to dates for validation
    unvalidatedData = {
      ...unvalidatedData,
      createdAt: new Date(unvalidatedData.createdAt),
      dateFeatured: unvalidatedData.dateFeatured
        ? new Date(unvalidatedData.dateFeatured)
        : null,
      updatedAt: unvalidatedData.updatedAt
        ? new Date(unvalidatedData.updatedAt)
        : null,
      buildLinkUpdatedAt: unvalidatedData.buildLinkUpdatedAt
        ? new Date(unvalidatedData.buildLinkUpdatedAt)
        : new Date(),
      buildTags: unvalidatedData.buildTags
        ? unvalidatedData.buildTags.map((tag: BuildTags) => ({
            ...tag,
            createdAt: tag.createdAt ? new Date(tag.createdAt) : new Date(),
            updatedAt: tag.updatedAt ? new Date(tag.updatedAt) : null,
          }))
        : null,
      variantIndex: unvalidatedData.variantIndex ?? 0,
      viewCount: 0,
      validatedViewCount: 0,
      duplicateCount: 0,
      percentageOwned: 0,
      isVideoApproved: false,
    };

    const validatedData = validateBuildState(unvalidatedData);
    if (!validatedData.success) {
      console.error(
        'Error in data!',
        validatedData.error.flatten().fieldErrors,
      );
      return {
        errors: [validatedData.error.flatten().fieldErrors],
      };
    }
    const buildState = validatedData.data;
    buildVariants.push(buildState);
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
    for await (const variant of buildVariants) {
      const verifyBuildStateResponse = verifyBuildState({
        buildState: variant,
        userDisplayName: session.user?.name as string,
      });

      if (verifyBuildStateResponse.errorMessage) {
        return {
          errors: [verifyBuildStateResponse.errorMessage],
        };
      }

      if (
        verifyBuildStateResponse.webhook &&
        env.WEBHOOK_DISABLED === 'false'
      ) {
        await sendWebhook(verifyBuildStateResponse.webhook);
        return {
          errors: [
            `Error creating build - bad language detected. Build: ${variant.name}`,
          ],
        };
      }
    }

    await verifyCreatorInfo(session);

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
            isQualityBuild: isBuildQualityBuild(variant).length === 0,
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
    const createBuildVariantsResponse = await Promise.all(
      createBuildsResponse.map(async (build) => {
        return prisma.buildVariant.create({
          data: {
            primaryBuildId: mainBuildState.buildId as string,
            secondaryBuildId: build.id,
          },
        });
      }),
    );

    const existingUpdatableBuildIds = await prisma.build.findMany({
      where: {
        id: {
          in: [
            mainBuildState.buildId,
            ...variantsToUpdate.map((variant) => variant.buildId as string),
          ],
        },
      },
    });
    const existingUpdatableBuilds = await prisma.build.findMany({
      where: {
        id: {
          in: existingUpdatableBuildIds.map((build) => build.id),
        },
      },
    });

    // Update the Build table for all variants in the new batch
    const existingBuild = existingUpdatableBuilds.find(
      (build) => build.id === mainBuildState.buildId,
    );

    let buildLinkUpdatedAt = mainBuildState.buildLinkUpdatedAt;
    let isVideoApproved = mainBuildState.isVideoApproved;

    if (existingBuild?.buildLink !== mainBuildState.buildLink) {
      buildLinkUpdatedAt = isPermittedBuilder(userId)
        ? new Date(Date.now() - 60 * 60 * 24 * 1000)
        : new Date();

      isVideoApproved = false;
    }

    const updateMainBuildResponse = await prisma.build.update({
      where: {
        id: mainBuildState.buildId,
        createdBy: {
          id: buildCreator.id,
        },
      },
      data: {
        name:
          mainBuildState.name && mainBuildState.name !== ''
            ? badWordFilter.clean(mainBuildState.name)
            : DEFAULT_BUILD_NAME,
        description:
          mainBuildState.description && mainBuildState.description !== ''
            ? badWordFilter.clean(mainBuildState.description)
            : '',
        isPublic: Boolean(mainBuildState.isPublic),
        isPatchAffected: Boolean(mainBuildState.isPatchAffected),
        isModeratorApproved: false,
        isQualityBuild: isBuildQualityBuild(mainBuildState).length === 0,
        videoUrl: mainBuildState.videoUrl,
        buildLink: mainBuildState.buildLink,
        buildLinkUpdatedAt,
        isVideoApproved,
        BuildItems: {
          deleteMany: {},
          create: buildStateToBuildItems(mainBuildState).filter(
            (variant) => variant !== undefined,
          ),
        },
        BuildTags: mainBuildState.buildTags
          ? {
              deleteMany: {}, // removes all tags before creating them again
              create: mainBuildState.buildTags.map((tag) => {
                return {
                  tag: tag.tag,
                };
              }),
            }
          : undefined,
      },
    });

    const updateBuildVariantsResponse = await Promise.all(
      variantsToUpdate.map(async (variant) => {
        const existingBuild = existingUpdatableBuilds.find(
          (build) => build.id === variant.buildId,
        );

        let buildLinkUpdatedAt = variant.buildLinkUpdatedAt;
        let isVideoApproved = variant.isVideoApproved;

        if (existingBuild?.buildLink !== variant.buildLink) {
          buildLinkUpdatedAt = isPermittedBuilder(userId)
            ? new Date(Date.now() - 60 * 60 * 24 * 1000)
            : new Date();

          isVideoApproved = false;
        }

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
            buildLinkUpdatedAt,
            isModeratorApproved: false,
            isVideoApproved,
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

    // Send webhooks for new variants
    const shouldSendWebhook =
      mainBuildState.isPublic && process.env.WEBHOOK_DISABLED !== 'true';
    if (shouldSendWebhook) {
      let index = 0;
      for await (const response of createBuildsResponse) {
        const matchingVariant = createBuildVariantsResponse.find(
          (v) => v.secondaryBuildId === response.id,
        );

        const buildLink = `${urlNoCache(
          `https://remnant2toolkit.com/builder/${mainBuildState.buildId}`,
        )}&variant=${matchingVariant?.index ?? index + 1}`;

        const shouldSendWebhook =
          mainBuildState.isPublic && process.env.WEBHOOK_DISABLED !== 'true';
        if (shouldSendWebhook) {
          const newBuildParams = {
            content: `New build variant created: ${response.name}! ${buildLink}`,
          };
          const newBuildWebhookResponse = await fetch(
            `${process.env.WEBHOOK_MOD_QUEUE}`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(newBuildParams),
            },
          );
          if (!newBuildWebhookResponse.ok) {
            console.error(
              'Error in sending build moderation webhook to Discord!',
            );
          }
        }
        index++;
      }
    }

    // Send webhooks for updated variants
    const shouldSendUpdateWebhooks =
      updateMainBuildResponse.isPublic && env.WEBHOOK_DISABLED === 'false';
    if (shouldSendUpdateWebhooks) {
      let index = 0;
      for await (const response of [
        updateMainBuildResponse,
        ...updateBuildVariantsResponse,
      ]) {
        const matchingVariant = variantsToUpdate[index];

        const buildLink = `${urlNoCache(
          `https://remnant2toolkit.com/builder/${mainBuildState.buildId}`,
        )}${
          index > 0
            ? `&variant=${matchingVariant?.variantIndex ?? index + 1}`
            : ''
        }`;

        const existingBuild = existingUpdatableBuilds.find(
          (build) => build.id === response.id,
        );

        const isPrivateBuildNowPublic =
          existingBuild?.isPublic === false &&
          mainBuildState.isPublic === true &&
          !isPermittedBuilder(session.user.id);
        if (isPrivateBuildNowPublic) {
          await sendWebhook({
            webhook: 'modQueue',
            params: {
              embeds: [
                {
                  title: `Build Changed From Private to Public`,
                  color: 0x00ff00,
                  fields: [
                    {
                      name: 'Build Name',
                      value: `${response.name} (${updatedVariants.length} variants)`,
                    },
                    {
                      name: 'Build Reference Link?',
                      value:
                        response.buildLink && response.buildLink.length > 0
                          ? response.buildLink
                          : 'N/A',
                    },
                    {
                      name: 'Build Description?',
                      value:
                        response.description && response.description.length > 0
                          ? `Yes (${response.description.length} chars)`
                          : 'No',
                    },
                    {
                      name: 'Build Link',
                      value: buildLink,
                    },
                  ],
                },
              ],
            },
          });

          // We don't need to send any other webhooks if the build went from private to public
          return {
            message: 'Build successfully updated!',
            buildId: mainBuildState.buildId,
          };
        }

        const isBuildNameChanged =
          existingBuild?.name !== response.name &&
          !isPermittedBuilder(session.user.id);

        if (isBuildNameChanged) {
          await sendWebhook({
            webhook: 'modQueue',
            params: {
              embeds: [
                {
                  title: `Build Name Changed`,
                  color: 0x00ff00,
                  fields: [
                    {
                      name: 'Changes',
                      value: `New Build Name: ${response.name}`,
                    },
                    {
                      name: 'Build Link',
                      value: buildLink,
                    },
                  ],
                },
              ],
            },
          });
        }

        const isBuildDescriptionChanged =
          existingBuild?.description !== response.description &&
          (response.description || '').trim().length > 0 &&
          response.isPublic &&
          !isPermittedBuilder(session.user.id);

        if (isBuildDescriptionChanged) {
          await sendWebhook({
            webhook: 'modQueue',
            params: getBuildDescriptionParams({
              buildLink,
              newDescription: response.description?.trim() as string,
              oldDescription: existingBuild?.description?.trim() as string,
            }),
          });
        }

        const isBuildLinkUpdated =
          response.buildLink &&
          existingBuild?.buildLink !== response.buildLink &&
          response.buildLink.trim().length > 0 &&
          response.isPublic === true &&
          !isPermittedBuilder(session.user.id);

        if (isBuildLinkUpdated) {
          await sendWebhook({
            webhook: 'modQueue',
            params: {
              embeds: [
                {
                  title: `Build Reference Link Changed`,
                  color: 0x00ff00,
                  fields: [
                    {
                      name: 'Changes',
                      value: `New Reference Link: ${response.buildLink}`,
                    },
                    {
                      name: 'Build Link',
                      value: buildLink,
                    },
                  ],
                },
              ],
            },
          });
        }

        index++;
      }
    }

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
