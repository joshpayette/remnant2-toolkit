import { Prisma } from '@repo/db';

import { DEFAULT_FILTER } from '@/app/_types/default-filter';
import { ringItems } from '@/app/(items)/_constants/ring-items';

export function limitByRingsSegment(ringIds: string[]) {
  if (ringIds.length === 0) return Prisma.empty;

  return Prisma.sql`AND (
SELECT COUNT(*)
FROM BuildItems
WHERE BuildItems.buildId = Build.id
AND BuildItems.itemId IN (${Prisma.join(ringIds)})
) = ${ringIds.length}`;
}

export function ringsFilterToIds({ rings }: { rings: string[] }): string[] {
  const nonDefaultValues = rings.filter((ring) => ring !== DEFAULT_FILTER);

  const ringIds: string[] = [];
  nonDefaultValues.forEach((ring) => {
    const item = ringItems.find(
      (item) => item.name.toLowerCase() === ring.toLowerCase(),
    )?.id;
    if (item) ringIds.push(item);
  });

  return ringIds;
}
