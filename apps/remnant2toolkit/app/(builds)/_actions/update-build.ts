'use server';

import { type BuildTags, prisma } from '@repo/db';
import { isValidYoutubeUrl, urlNoCache } from '@repo/utils';
import { revalidatePath } from 'next/cache';

import { BUILD_REVALIDATE_PATHS } from '@/app/(builds)/_constants/build-revalidate-paths';
import { DEFAULT_BUILD_NAME } from '@/app/(builds)/_constants/default-build-name';
import { MAX_BUILD_DESCRIPTION_LENGTH } from '@/app/(builds)/_constants/max-build-description-length';
import { type BuildActionResponse } from '@/app/(builds)/_types/build-action-response';
import { buildStateToBuildItems } from '@/app/(builds)/_utils/build-state-to-build-items';
import { isPermittedBuilder } from '@/app/(builds)/_utils/is-permitted-builder';
import { validateBuildState } from '@/app/(builds)/_utils/validate-build-state';
import { getSession } from '@/app/(features)/auth/services/sessionService';
import { badWordFilter } from '@/app/(features)/bad-word-filter';
import { getBuildDescriptionParams } from '@/app/(utils)/moderation/get-build-description-params';
import { sendWebhook } from '@/app/(utils)/moderation/send-webhook';

export async function updateBuild(data: string): Promise<BuildActionResponse> {
  // session validation
  const session = await getSession();
  if (!session || !session.user) {
    return {
      message: 'You must be logged in.',
    };
  }

  // build validation
  let unvalidatedData = JSON.parse(data);
  // convert date strings to dates for validation
  unvalidatedData = {
    ...unvalidatedData,
    createdAt: new Date(unvalidatedData.createdAt),
    updatedAt: new Date(unvalidatedData.updatedAt),
    dateFeatured: unvalidatedData.dateFeatured
      ? new Date(unvalidatedData.dateFeatured)
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
    viewCount: unvalidatedData.viewCount ?? 0,
    validatedViewCount: unvalidatedData.validatedViewCount ?? 0,
    duplicateCount: unvalidatedData.duplicateCount ?? 0,
  };

  const validatedData = validateBuildState(unvalidatedData);
  if (!validatedData.success) {
    console.error('Error in data!', validatedData.error.flatten().fieldErrors);
    return {
      errors: [validatedData.error.flatten().fieldErrors],
    };
  }
  const buildState = validatedData.data;

  if (!buildState.buildId) {
    return {
      errors: ['No buildId provided!'],
    };
  }

  if (buildState.createdById !== session.user.id) {
    return {
      errors: ['You must be logged in as the build creator to edit a build.'],
    };
  }

  // If no archetypes are selected, throw an error
  if (!buildState.items.archetype || buildState.items.archetype.length === 0) {
    return {
      errors: ['You must select at least one archetype.'],
    };
  }

  // If build is moderator locked, do not allow editing
  if (buildState.isModeratorLocked) {
    return {
      errors: ['This build is locked by a moderator.'],
    };
  }

  const updatedBuildItems = buildStateToBuildItems(buildState);

  const nameBadWordCheck = badWordFilter.isProfane(buildState.name);
  const descriptionBadWordCheck = badWordFilter.isProfane(
    buildState.description ?? '',
  );
  const referenceLinkBadWordCheck = badWordFilter.isProfane(
    buildState.buildLink ?? '',
  );

  if (nameBadWordCheck.isProfane) {
    buildState.isPublic = false;

    // Send webhook to #action-log
    // Send webhook to #action-log
    await sendWebhook({
      webhook: 'auditLog',
      params: {
        embeds: [
          {
            title: `Bad Word Filter Tripped`,
            color: 0xff0000,
            fields: [
              {
                name: 'Action',
                value: 'Update Build, Build Name',
              },
              {
                name: 'User',
                value: session.user.displayName,
              },
              {
                name: 'Bad Words',
                value: nameBadWordCheck.badWords.join(', '),
              },
            ],
          },
        ],
      },
    });

    return {
      errors: [
        `Build name contains profanity: ${nameBadWordCheck.badWords.join(
          ', ',
        )}`,
      ],
    };
  }
  if (descriptionBadWordCheck.isProfane) {
    buildState.isPublic = false;

    // Send webhook to #action-log
    await sendWebhook({
      webhook: 'auditLog',
      params: {
        embeds: [
          {
            title: `Bad Word Filter Tripped`,
            color: 0xff0000,
            fields: [
              {
                name: 'Action',
                value: 'Update Build, Build Description',
              },
              {
                name: 'User',
                value: session.user.displayName,
              },
              {
                name: 'Bad Words',
                value: descriptionBadWordCheck.badWords.join(', '),
              },
            ],
          },
        ],
      },
    });

    return {
      errors: [
        `Build description contains profanity: ${descriptionBadWordCheck.badWords.join(
          ', ',
        )}`,
      ],
    };
  }

  if (referenceLinkBadWordCheck.isProfane) {
    buildState.isPublic = false;

    // Send webhook to #action-log
    await sendWebhook({
      webhook: 'auditLog',
      params: {
        embeds: [
          {
            title: `Bad Word Filter Tripped`,
            color: 0xff0000,
            fields: [
              {
                name: 'Action',
                value: 'Update Build, Build Reference Link',
              },
              {
                name: 'User',
                value: session.user.displayName,
              },
              {
                name: 'Bad Words',
                value: referenceLinkBadWordCheck.badWords.join(', '),
              },
            ],
          },
        ],
      },
    });

    return {
      errors: [
        `Build reference link contains profanity: ${referenceLinkBadWordCheck.badWords.join(
          ', ',
        )}`,
      ],
    };
  }

  // if the description is longer than allowed, truncate it
  if (
    buildState.description &&
    buildState.description.length > MAX_BUILD_DESCRIPTION_LENGTH
  ) {
    buildState.description =
      buildState.description.slice(0, MAX_BUILD_DESCRIPTION_LENGTH - 3) + '...';
  }

  // Get the existing build
  const existingBuild = await prisma.build.findUnique({
    where: {
      id: buildState.buildId,
    },
  });

  // Ensure the build link is less than 190 characters
  if (buildState.buildLink && buildState.buildLink.length > 190) {
    buildState.buildLink = buildState.buildLink?.slice(0, 190);
  }

  // If the new buildLink doesn't match the existing buildLink, update the buildLinkUpdatedAt
  // If the user is a permitted builder, immediately validate the link by setting buildLinkUpdatedAt to yesterday
  if (
    buildState.buildLink &&
    existingBuild?.buildLink !== buildState.buildLink &&
    buildState.buildLink?.trim().length > 0
  ) {
    buildState.buildLinkUpdatedAt = isPermittedBuilder(session.user.id)
      ? new Date(Date.now() - 60 * 60 * 24 * 1000)
      : new Date();
  }

  // If the buildLink is a valid youtube url, also save it to the videoUrl field
  if (buildState.buildLink && isValidYoutubeUrl(buildState.buildLink)) {
    buildState.videoUrl = buildState.buildLink;
  }

  try {
    // get the build creator user record
    const buildCreator = await prisma.user.findUnique({
      where: {
        id: session.user.id,
      },
      include: {
        UserProfile: true,
      },
    });

    if (!buildCreator) {
      return {
        errors: ['Error finding build creator.'],
      };
    }

    // Ensure the build creator's name is not against code of conduct
    const displayNameBadWordCheck = badWordFilter.isProfane(
      buildCreator.displayName ?? '',
    );
    if (
      buildCreator.displayName &&
      buildCreator.displayName !== '' &&
      displayNameBadWordCheck.isProfane
    ) {
      await prisma.user.update({
        where: {
          id: session.user.id,
        },
        data: {
          displayName: badWordFilter.clean(buildCreator.displayName),
        },
      });
    }
    // Ensure the user's bio is not against the code of conduct
    const bioBadWordCheck = badWordFilter.isProfane(
      buildCreator.UserProfile?.bio ?? '',
    );
    if (
      buildCreator.UserProfile?.bio &&
      buildCreator.UserProfile.bio !== '' &&
      bioBadWordCheck.isProfane
    ) {
      await prisma.userProfile.update({
        where: {
          userId: session.user.id,
        },
        data: {
          bio: badWordFilter.clean(buildCreator.UserProfile.bio),
        },
      });
    }

    // Save changes to the build
    const updatedBuild = await prisma.build.update({
      where: {
        id: buildState.buildId,
        createdBy: {
          id: session.user.id,
        },
      },
      data: {
        name:
          buildState.name && buildState.name !== ''
            ? badWordFilter.clean(buildState.name)
            : DEFAULT_BUILD_NAME,
        description:
          buildState.description && buildState.description !== ''
            ? badWordFilter.clean(buildState.description)
            : '',
        isPublic: Boolean(buildState.isPublic),
        isPatchAffected: Boolean(buildState.isPatchAffected),
        videoUrl: buildState.videoUrl,
        buildLink: buildState.buildLink,
        buildLinkUpdatedAt: buildState.buildLinkUpdatedAt,
        isModeratorApproved: false,
        BuildItems: {
          deleteMany: {}, // removes all items before creating them again
          create: updatedBuildItems,
        },
        BuildTags: buildState.buildTags
          ? {
              deleteMany: {}, // removes all tags before creating them again
              create: buildState.buildTags.map((tag) => {
                return {
                  tag: tag.tag,
                };
              }),
            }
          : undefined,
      },
    });

    if (!updatedBuild) {
      return {
        errors: ['Error updating build.'],
      };
    }

    const buildLink = urlNoCache(
      `https://remnant2toolkit.com/builder/${buildState.buildId}`,
    );

    // If the build name has updated, send the build info to Discord
    if (
      existingBuild?.name !== buildState.name &&
      buildState.isPublic === true &&
      !isPermittedBuilder(session.user.id)
    ) {
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
                  value: `New Build Name: ${buildState.name}`,
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

    // If the build was private but is now public, send the build info to Discord
    if (
      existingBuild?.isPublic === false &&
      buildState.isPublic === true &&
      !isPermittedBuilder(session.user.id)
    ) {
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
                  value: buildState.name,
                },
                {
                  name: 'Build Reference Link?',
                  value:
                    buildState.buildLink && buildState.buildLink.length > 0
                      ? buildState.buildLink
                      : 'N/A',
                },
                {
                  name: 'Build Description?',
                  value:
                    buildState.description && buildState.description.length > 0
                      ? `Yes (${buildState.description.length} chars)`
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
    }

    // If the build description has updated, send the build info to Discord
    if (
      existingBuild?.description &&
      buildState.description &&
      existingBuild.description !== buildState.description &&
      buildState.description.trim().length > 0 &&
      existingBuild.description.trim().length > 0 &&
      buildState.isPublic &&
      !isPermittedBuilder(session.user.id)
    ) {
      await sendWebhook({
        webhook: 'modQueue',
        params: getBuildDescriptionParams({
          buildId: buildState.buildId,
          newDescription: buildState.description.trim(),
          oldDescription: existingBuild.description.trim(),
        }),
      });
    }

    // If the build link has updated, send the build info to Discord
    if (
      buildState.buildLink &&
      existingBuild?.buildLink !== buildState.buildLink &&
      buildState.buildLink.trim().length > 0 &&
      buildState.isPublic === true &&
      !isPermittedBuilder(session.user.id)
    ) {
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
                  value: `New Reference Link: ${buildState.buildLink}`,
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

    // Refresh the cache for the route
    for (const path of BUILD_REVALIDATE_PATHS) {
      revalidatePath(path, 'page');
    }
    revalidatePath(`/builder/[buildId]`, 'page');

    return {
      message: 'Build successfully updated!',
      buildId: updatedBuild.id,
    };
  } catch (e) {
    console.error(e);
    return {
      errors: ['Unknown error updating build.'],
    };
  }
}
