import { validateEnv } from '@/app/(validators)/validate-env'

import { DiscordWebhookParams } from './types'

export async function sendBuildUpdateNotification({
  params,
  buildId,
}: {
  params: DiscordWebhookParams
  buildId: string
}) {
  const { WEBHOOK_COMMUNITY_BUILDS } = validateEnv()

  if (process.env.NODE_ENV !== 'production') {
    return
  }

  const buildLink = `https://www.remnant2toolkit.com/builder/${buildId}?t=${Date.now()}`

  if (params.embeds[0].fields[0].value.length + buildLink.length > 1200) {
    params.embeds[0].fields[0].value = `Description changes exceed character limit. Please view the build on the website.`
  }

  params.embeds[0].fields.push({
    name: 'Build Link',
    value: buildLink,
  })

  const res = await fetch(WEBHOOK_COMMUNITY_BUILDS, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  })

  if (!res.ok) {
    console.error(`Error in sending build webhook to Discord!`)
    console.error(res.statusText)
  }
}
