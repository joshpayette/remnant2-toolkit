import { Prisma } from '@prisma/client'

import { ringItems } from '@/features/items/data/ringItems'

import { DEFAULT_JEWELRY_FILTERS } from '../../parts/JewelryFilters'

export function limitByRingsSegment(ringIds: string[]) {
  return ringIds.length === 0
    ? Prisma.empty
    : Prisma.sql`AND (
SELECT COUNT(*)
FROM BuildItems
WHERE BuildItems.buildId = Build.id
AND BuildItems.itemId IN (${Prisma.join(ringIds)})
) = ${ringIds.length}`
}

export function ringsFilterToIds({ rings }: { rings: string[] }): string[] {
  const nonDefaultValues = rings.filter(
    (ring) => ring !== DEFAULT_JEWELRY_FILTERS['ring'],
  )
  const ringIds: string[] = []
  nonDefaultValues.forEach((ring) => {
    const item = ringItems.find(
      (item) => item.name.toLowerCase() === ring.toLowerCase(),
    )?.id
    if (item) ringIds.push(item)
  })

  return ringIds
}
