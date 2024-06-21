import { Prisma } from '@repo/db'

export function limitByFeatured(limit?: boolean) {
  if (!limit) return Prisma.empty
  return Prisma.sql`AND Build.isFeaturedBuild = true`
}
