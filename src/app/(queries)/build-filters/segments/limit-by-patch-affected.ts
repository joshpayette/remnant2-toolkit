import { Prisma } from '@prisma/client'

export function limitByPatchAffected(includePatchAffectedBuilds: boolean) {
  if (includePatchAffectedBuilds) return Prisma.empty
  return Prisma.sql`AND Build.isPatchAffected=false`
}
