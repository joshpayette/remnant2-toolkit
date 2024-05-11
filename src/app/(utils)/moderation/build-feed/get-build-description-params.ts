import { diffTrimmedLines } from 'diff'

import { DiscordWebhookParams } from './types'

export function getBuildDescriptionParams({
  buildId,
  newDescription,
  oldDescription,
}: {
  buildId: string
  newDescription: string
  oldDescription: string
}): DiscordWebhookParams {
  const diff = diffTrimmedLines(oldDescription, newDescription, {
    ignoreCase: true,
  })

  let content = diff
    ?.map((part) => {
      if (part.added) {
        return `${part.value.replace(/\n/g, '')}`.trim()
      }
      // if (part.removed) {
      //   return `(-) ${part.value.replace(/\n/g, '')}`.trim()
      // }
    })
    .join('\n')

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
        ],
      },
    ],
  }
}
