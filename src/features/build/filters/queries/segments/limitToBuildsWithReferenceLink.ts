import { Prisma } from '@prisma/client'

export function limitToBuildsWithReferenceLink(
  limitToBuildsWithReferenceLink: boolean,
) {
  return limitToBuildsWithReferenceLink
    ? Prisma.sql`AND Build.buildLink IS NOT NULL AND Build.buildLink != ''`
    : Prisma.empty
}
