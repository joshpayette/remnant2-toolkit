import { Prisma } from '@repo/db';

import type { withPatchAffectedFilter } from '@/app/(builds)/_features/filters/_libs/with-patch-affected-filter';

export function limitByPatchAffectedSegment(
  withPatchAffected: WithPatchAffectedFilterValue,
): Prisma.Sql {
  if (withPatchAffected) return Prisma.empty;
  return Prisma.sql`AND Build.isPatchAffected=false`;
}
