import type { WithReferenceFilterValue } from '@/app/(builds)/_features/filters/_libs/filters/with-reference-filter';
import { Prisma } from '@/prisma';

export function limitByWithReferenceSegment(
  withReference: WithReferenceFilterValue
): Prisma.Sql {
  if (!withReference) return Prisma.empty;
  return Prisma.sql`AND Build.buildLink IS NOT NULL AND Build.buildLink != ''`;
}
