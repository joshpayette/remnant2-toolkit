import { Prisma } from '@prisma/client'

export function limitByFeatured(limit?: boolean) {
  if (!limit) return Prisma.empty
  return Prisma.sql`AND Build.isFeaturedBuild = true`
}
