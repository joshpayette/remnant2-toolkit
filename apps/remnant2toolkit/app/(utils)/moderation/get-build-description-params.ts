import { diffTrimmedLines } from 'diff'

import { urlNoCache } from '@/app/(utils)/url-no-cache'

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
    })
    .join('\n')

  const buildLink = urlNoCache(`https://remnant2toolkit.com/builder/${buildId}`)

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
  }
}
