import { remnantItems } from '@/features/items/data/remnantItems'
import { Prisma } from '@prisma/client'

export function limitByRingSegment(ringId: string) {
  return ringId === ''
    ? Prisma.empty
    : Prisma.sql`AND (
SELECT COUNT(*)
FROM BuildItems
WHERE BuildItems.buildId = Build.id
AND BuildItems.itemId = ${ringId}
) = 1`
}

export function ringFilterToId({ ring }: { ring: string }): string {
  return remnantItems.find((item) => item.name === ring)?.id || ''
}
