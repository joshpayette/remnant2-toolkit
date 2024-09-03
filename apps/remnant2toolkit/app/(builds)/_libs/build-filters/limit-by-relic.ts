import { Prisma } from '@repo/db';

import { relicItems } from '@/app/(items)/_constants/relic-items';

export function limitByRelicSegment(relicId: string) {
  if (relicId === '') return Prisma.empty;

  return Prisma.sql`AND (
SELECT COUNT(*)
FROM BuildItems
WHERE BuildItems.buildId = Build.id
AND BuildItems.itemId = ${relicId}
) = 1`;
}

export function relicFilterToId({ relic }: { relic: string }): string {
  return relicItems.find((item) => item.name === relic)?.id || '';
}
