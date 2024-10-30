import { Prisma } from '@repo/db';

import type { WithReferenceFilterValue } from '@/app/(builds)/_features/filters/_libs/with-reference-filter';

export function limitByReferenceSegment(
  withReference: WithReferenceFilterValue,
): Prisma.Sql {
  if (!withReference) return Prisma.empty;
  return Prisma.sql`AND Build.buildLink IS NOT NULL AND Build.buildLink != ''`;
}
