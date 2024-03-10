import { z } from 'zod'

export const parseEnv = () => {
  const envSchema = z.object({
    PORT: z.string().default('3000'),
    NODE_ENV: z.string().default('development'),
    CRON_SECRET: z.string(),
    DATABASE_URL: z.string(),
    DISCORD_CLIENT_ID: z.string(),
    DISCORD_CLIENT_SECRET: z.string(),
    IMAGEKIT_CLIENT_ID: z.string(),
    IMAGEKIT_CLIENT_SECRET: z.string(),
    NEXTAUTH_SECRET: z.string(),
    NEXTAUTH_URL: z.string(),
    NEXT_PUBLIC_IMAGE_URL: z.string(),
    PATREON_CLIENT_ID: z.string(),
    PATREON_CLIENT_SECRET: z.string(),
    PATREON_CREATOR_ACCESS_TOKEN: z.string(),
    PATREON_CREATOR_REFRESH_TOKEN: z.string(),
    REDDIT_CLIENT_ID: z.string(),
    REDDIT_CLIENT_SECRET: z.string(),
    WEBHOOK_BUG_REPORT: z.string(),
    WEBHOOK_COMMUNITY_BUILDS: z.string(),
    WEBHOOK_CRON_LOGS: z.string(),
    WEBHOOK_REPORTED_CONTENT: z.string(),
  })

  return envSchema.parse(process.env)
}
