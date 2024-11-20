import { z } from 'zod';

export function validateEnv() {
  const envSchema = z.object({
    PORT: z.string().default('3000'),
    NODE_ENV: z.string().default('development'),
    CRON_SECRET: z.string(),
    DATABASE_URL: z.string(),
    DISCORD_CLIENT_ID: z.string(),
    DISCORD_CLIENT_SECRET: z.string(),
    IMAGEKIT_CLIENT_ID: z.string(),
    IMAGEKIT_CLIENT_SECRET: z.string(),
    LOADOUT_PARSER_URL: z.string(),
    LOADOUT_AUTH_TOKEN: z.string(),
    NEXTAUTH_SECRET: z.string(),
    NEXTAUTH_URL: z.string(),
    NEXT_PUBLIC_IMAGE_URL: z.string(),
    PATREON_CREATOR_ACCESS_TOKEN: z.string(),
    PATREON_CREATOR_REFRESH_TOKEN: z.string(),
    REDDIT_CLIENT_ID: z.string(),
    REDDIT_CLIENT_SECRET: z.string(),
    WEBHOOK_BUG_REPORT: z.string(),
    WEBHOOK_MOD_QUEUE: z.string(),
    WEBHOOK_AUDIT_LOG: z.string(),
    WEBHOOK_CRON_LOGS: z.string(),
    WEBHOOK_DISABLED: z.string(),
    WEBHOOK_NEW_BUILD_FEED: z.string(),
    WEBHOOK_REPORT_DATA: z.string(),
    WEBHOOK_WIKI_SCRAPER_FEED: z.string(),
  });

  return envSchema.parse(process.env);
}
