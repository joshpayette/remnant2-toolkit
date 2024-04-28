import { Prisma } from '@prisma/client'

export function limitByReferenceLink(limitByReferenceLink: boolean) {
  if (!limitByReferenceLink) return Prisma.empty
  return Prisma.sql`AND Build.buildLink IS NOT NULL AND Build.buildLink != ''`
}
