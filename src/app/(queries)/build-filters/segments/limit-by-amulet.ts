import { Prisma } from '@prisma/client'

import { amuletItems } from '@/app/(data)/items/amulet-items'

export function limitByAmuletSegment(amuletId: string) {
  if (amuletId === '') return Prisma.empty

  return Prisma.sql`AND (
SELECT COUNT(*)
FROM BuildItems
WHERE BuildItems.buildId = Build.id
AND BuildItems.itemId = ${amuletId}
) = 1`
}

export function amuletFilterToId({ amulet }: { amulet: string }): string {
  return amuletItems.find((item) => item.name === amulet)?.id || ''
}
