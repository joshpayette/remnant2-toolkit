import { Prisma } from '@prisma/client'

import { remnantItems } from '@/features/items/data/remnantItems'

export function limitByAmuletSegment(amuletId: string) {
  return amuletId === ''
    ? Prisma.empty
    : Prisma.sql`AND (
SELECT COUNT(*)
FROM BuildItems
WHERE BuildItems.buildId = Build.id
AND BuildItems.itemId = ${amuletId}
) = 1`
}

export function amuletFilterToId({ amulet }: { amulet: string }): string {
  return remnantItems.find((item) => item.name === amulet)?.id || ''
}
