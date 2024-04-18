import { Prisma } from '@prisma/client'

export function limitByFeatured(limit?: boolean) {
  return !limit ? Prisma.empty : Prisma.sql`AND Build.isFeaturedBuild = true`
}
