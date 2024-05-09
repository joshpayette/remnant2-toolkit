import { DiscordWebhookParams } from './types'

export function getBuildReferenceLinkParams({
  referenceLink,
}: {
  referenceLink: string
}): DiscordWebhookParams {
  return {
    embeds: [
      {
        title: `Build Reference Link Changed`,
        color: 0x00ff00,
        fields: [
          {
            name: 'Changes',
            value: `New Reference Link: ${referenceLink}`,
          },
        ],
      },
    ],
  }
}
