import { Prisma } from '@repo/db';

export function limitByPatchAffectedSegment(withPatchAffected: string) {
  if (withPatchAffected === 'true') return Prisma.empty;
  return Prisma.sql`AND Build.isPatchAffected=false`;
}
