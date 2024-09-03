import { Prisma } from '@repo/db'

export function limitByPatchAffected(includePatchAffectedBuilds: boolean) {
  if (includePatchAffectedBuilds) return Prisma.empty
  return Prisma.sql`AND Build.isPatchAffected=false`
}
