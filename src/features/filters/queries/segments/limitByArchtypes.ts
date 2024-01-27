import { remnantItems } from '@/features/items/data'
import { Prisma } from '@prisma/client'

export function limitByArchtypesSegment(archtypeIds: string[]) {
  return archtypeIds.length === 0
    ? Prisma.empty
    : Prisma.sql`AND (
SELECT COUNT(*)
FROM BuildItems
WHERE BuildItems.buildId = Build.id
AND BuildItems.itemId IN (${Prisma.join(archtypeIds)})
) = ${archtypeIds.length}`
}

export function archtypeFiltersToIds({
  archtypes,
}: {
  archtypes: string[]
}): string[] {
  const archtypeIds: string[] = []

  for (const archtype of archtypes) {
    const item = remnantItems.find(
      (item) => item.name.toLowerCase() === archtype,
    )?.id
    if (item) archtypeIds.push(item)
  }

  return archtypeIds
}
