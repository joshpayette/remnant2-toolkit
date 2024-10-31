import { Prisma } from '@repo/db';

import type { WithPatchAffectedFilterValue } from '@/app/(builds)/_features/filters/_libs/with-patch-affected-filter';

export function limitByWithPatchAffectedSegment(
  withPatchAffected: WithPatchAffectedFilterValue,
): Prisma.Sql {
  if (withPatchAffected) return Prisma.empty;
  return Prisma.sql`AND Build.isPatchAffected=false`;
}
