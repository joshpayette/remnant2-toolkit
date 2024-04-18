import { DiscordWebhookParams } from './types'

export function getBuildPublicParams(): DiscordWebhookParams {
  return {
    embeds: [
      {
        title: `Build Changed to Public`,
        color: 0x00ff00,
        fields: [
          {
            name: 'Changes',
            value: `Build changed from private to public.`,
          },
        ],
      },
    ],
  }
}
