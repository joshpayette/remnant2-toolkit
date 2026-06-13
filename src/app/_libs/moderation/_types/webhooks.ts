import { validateEnv } from '@/app/_libs/validate-env';

const {
  WEBHOOK_AUDIT_LOG,
  WEBHOOK_BUG_REPORT,
  WEBHOOK_CRON_LOGS,
  WEBHOOK_MOD_QUEUE,
  WEBHOOK_NEW_BUILD_FEED,
} = validateEnv();

export const WEBHOOKS = {
  auditLog: WEBHOOK_AUDIT_LOG,
  bugReport: WEBHOOK_BUG_REPORT,
  cronLogs: WEBHOOK_CRON_LOGS,
  modQueue: WEBHOOK_MOD_QUEUE,
  newBuildFeed: WEBHOOK_NEW_BUILD_FEED,
} as const;
