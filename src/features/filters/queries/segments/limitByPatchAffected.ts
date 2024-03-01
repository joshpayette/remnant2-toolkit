import { Prisma } from '@prisma/client'

export function limitByPatchAffected(includePatchAffectedBuilds: boolean) {
  return includePatchAffectedBuilds
    ? Prisma.empty
    : Prisma.sql`AND Build.isPatchAffected=false`
}
