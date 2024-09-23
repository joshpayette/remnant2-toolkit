import { urlNoCache } from '@repo/utils';
import { diffTrimmedLines } from 'diff';

import { type DiscordWebhookParams } from '@/app/_libs/moderation/_types/discord-webhook-params';

export function getBuildDescriptionParams({
  buildId,
  newDescription,
  oldDescription,
}: {
  buildId: string;
  newDescription: string;
  oldDescription: string;
}): DiscordWebhookParams {
  const diff = diffTrimmedLines(oldDescription, newDescription, {
    ignoreCase: true,
  });

  const content = diff
    ?.map((part) => {
      if (part.added) {
        return `${part.value.replace(/\n/g, '')}`.trim();
      }
    })
    .join('\n');

  const buildLink = urlNoCache(
    `https://remnant2toolkit.com/builder/${buildId}`,
  );

  return {
    embeds: [
      {
        title: `Build Description Changed`,
        color: 0x00ff00,
        fields: [
          {
            name: 'Description Changes',
            value: content,
          },
          {
            name: 'Build Link',
            value: buildLink,
          },
        ],
      },
    ],
  };
}
