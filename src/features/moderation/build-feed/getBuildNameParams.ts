import { DiscordWebhookParams } from './types'

export function getBuildNameParams({
  newBuildName,
}: {
  newBuildName: string
}): DiscordWebhookParams {
  return {
    embeds: [
      {
        title: `Build Name Changed`,
        color: 0x00ff00,
        fields: [
          {
            name: 'Changes',
            value: `New Build Name: ${newBuildName}`,
          },
        ],
      },
    ],
  }
}
