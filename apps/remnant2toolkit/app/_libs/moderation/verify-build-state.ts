import { isValidYoutubeUrl } from '@repo/utils';

import { badWordFilter } from '@/app/_libs/bad-word-filter';
import { type SendWebhookParams } from '@/app/_libs/moderation/send-webhook';
import { MAX_BUILD_DESCRIPTION_LENGTH } from '@/app/(builds)/_constants/max-build-description-length';
import { isPermittedBuilder } from '@/app/(builds)/_libs/is-permitted-builder';
import { type BuildState } from '@/app/(builds)/_types/build-state';

export function verifyBuildState({
  buildState,
  userDisplayName,
  userId,
}: {
  buildState: BuildState;
  userDisplayName: string;
  userId: string;
}): {
  buildState: BuildState;
  webhook?: SendWebhookParams;
  errorMessage?: string;
} {
  const archetypeCheckResult = archetypeCheckPassed({ buildState });
  if (!archetypeCheckResult) {
    return {
      buildState,
      errorMessage: 'Please select at least one archetype.',
    };
  }

  const badLanguageCheckResult = badLanguageCheck({
    buildState,
    userDisplayName,
  });
  if (badLanguageCheckResult) {
    buildState.isPublic = false;
    return {
      buildState,
      webhook: badLanguageCheckResult,
    };
  }

  buildState.description = truncateDescription({ buildState });

  const buildLinkResults = checkBuildLink({ buildState, userId });
  buildState.buildLink = buildLinkResults.buildLink;
  buildState.buildLinkUpdatedAt = buildLinkResults.buildLinkUpdatedAt;
  buildState.videoUrl = buildLinkResults.videoUrl;

  return { buildState };
}

function badLanguageCheck({
  buildState,
  userDisplayName,
}: {
  buildState: BuildState;
  userDisplayName: string;
}): SendWebhookParams | null {
  const nameBadWordCheck = badWordFilter.isProfane(buildState.name);
  const descriptionBadWordCheck = badWordFilter.isProfane(
    buildState.description ?? '',
  );
  const referenceLinkBadWordCheck = badWordFilter.isProfane(
    buildState.buildLink ?? '',
  );

  if (nameBadWordCheck.isProfane) {
    return {
      webhook: 'auditLog',
      params: {
        embeds: [
          {
            title: `Bad Word Filter Tripped`,
            color: 0xff0000,
            fields: [
              {
                name: 'Action',
                value: 'Create Build, Build Name',
              },
              {
                name: 'User',
                value: userDisplayName,
              },
              {
                name: 'Bad Words',
                value: nameBadWordCheck.badWords.join(', '),
              },
            ],
          },
        ],
      },
    };
  }

  if (descriptionBadWordCheck.isProfane) {
    return {
      webhook: 'auditLog',
      params: {
        embeds: [
          {
            title: `Bad Word Filter Tripped`,
            color: 0xff0000,
            fields: [
              {
                name: 'Action',
                value: 'Create Build, Build Description',
              },
              {
                name: 'User',
                value: userDisplayName,
              },
              {
                name: 'Bad Words',
                value: descriptionBadWordCheck.badWords.join(', '),
              },
            ],
          },
        ],
      },
    };
  }

  if (referenceLinkBadWordCheck.isProfane) {
    return {
      webhook: 'auditLog',
      params: {
        embeds: [
          {
            title: `Bad Word Filter Tripped`,
            color: 0xff0000,
            fields: [
              {
                name: 'Action',
                value: 'Create Build, Reference Link',
              },
              {
                name: 'User',
                value: userDisplayName,
              },
              {
                name: 'Bad Words',
                value: referenceLinkBadWordCheck.badWords.join(', '),
              },
            ],
          },
        ],
      },
    };
  }

  return null;
}

function truncateDescription({
  buildState,
}: {
  buildState: BuildState;
}): BuildState['description'] {
  if (
    buildState.description &&
    buildState.description.length > MAX_BUILD_DESCRIPTION_LENGTH
  ) {
    return (
      buildState.description.slice(0, MAX_BUILD_DESCRIPTION_LENGTH - 3) + '...'
    );
  }

  return buildState.description;
}

function archetypeCheckPassed({
  buildState,
}: {
  buildState: BuildState;
}): boolean {
  // If no archetypes are selected, throw an error
  if (!buildState.items.archetype || buildState.items.archetype.length === 0) {
    return false;
  }
  return true;
}

function checkBuildLink({
  buildState,
  userId,
}: {
  buildState: BuildState;
  userId: string;
}): {
  buildLink: BuildState['buildLink'];
  buildLinkUpdatedAt: BuildState['buildLinkUpdatedAt'];
  videoUrl: BuildState['videoUrl'];
} {
  // If there is a buildLink, set the buildLinkUpdatedAt to now
  // If the user is a permitted builder, immediately validate the link by setting buildLinkUpdatedAt to yesterday
  if (buildState.buildLink) {
    buildState.buildLinkUpdatedAt = isPermittedBuilder(userId)
      ? new Date(Date.now() - 60 * 60 * 24 * 1000)
      : new Date();
  }

  // Ensure the build link is less than 190 characters
  if (buildState.buildLink && buildState.buildLink.length > 190) {
    buildState.buildLink = buildState.buildLink?.slice(0, 190);
  }

  // If the buildLink is a valid youtube url, also save it to the videoUrl field
  if (buildState.buildLink && isValidYoutubeUrl(buildState.buildLink)) {
    buildState.videoUrl = buildState.buildLink;
  }

  return {
    buildLink: buildState.buildLink,
    buildLinkUpdatedAt: buildState.buildLinkUpdatedAt,
    videoUrl: buildState.videoUrl,
  };
}