import type { DiscordWebhookParams } from '@/app/(utils)/moderation/types'
import { validateEnv } from '@/app/(validators)/validate-env'

const {
  WEBHOOK_AUDIT_LOG,
  WEBHOOK_BUG_REPORT,
  WEBHOOK_CRON_LOGS,
  WEBHOOK_MOD_QUEUE,
  WEBHOOK_NEW_BUILD_FEED,
} = validateEnv()

const WEBHOOKS = {
  auditLog: WEBHOOK_AUDIT_LOG,
  bugReport: WEBHOOK_BUG_REPORT,
  cronLogs: WEBHOOK_CRON_LOGS,
  modQueue: WEBHOOK_MOD_QUEUE,
  newBuildFeed: WEBHOOK_NEW_BUILD_FEED,
} as const

export async function sendWebhook({
  params,
  webhook,
}: {
  params: DiscordWebhookParams
  webhook: keyof typeof WEBHOOKS
}) {
  const res = await fetch(`${WEBHOOKS[webhook]}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(params),
  })

  if (!res.ok) {
    console.error(`Error in sending ${webhook} webhook to Discord!`)
    console.error(res.statusText)
  }
}
