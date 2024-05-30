import type { DiscordWebhookParams } from '@/app/(utils)/moderation/build-feed/types'
import { validateEnv } from '@/app/(validators)/validate-env'

export async function sendBadWordNotification({
  params,
}: {
  params: DiscordWebhookParams
}) {
  const { WEBHOOK_AUDIT_LOG } = validateEnv()

  // if (process.env.NODE_ENV !== 'production') {
  //   return
  // }

  const res = await fetch(`${WEBHOOK_AUDIT_LOG}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  })

  if (!res.ok) {
    console.error('Error in sending build link webhook to Discord!')
  }
}
