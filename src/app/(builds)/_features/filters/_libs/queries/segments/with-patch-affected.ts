import type { WithPatchAffectedFilterValue } from '@/app/(builds)/_features/filters/_libs/filters/with-patch-affected-filter';
import { Prisma } from '@/prisma';

export function limitByWithPatchAffectedSegment(
  withPatchAffected: WithPatchAffectedFilterValue
): Prisma.Sql {
  if (withPatchAffected) return Prisma.empty;
  return Prisma.sql`AND Build.isPatchAffected=false`;
}
