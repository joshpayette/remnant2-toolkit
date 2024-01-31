import { remnantItems } from '@/features/items/data'
import { Prisma } from '@prisma/client'

export function limitByArchetypesSegment(archetypeIds: string[]) {
  return archetypeIds.length === 0
    ? Prisma.empty
    : Prisma.sql`AND (
SELECT COUNT(*)
FROM BuildItems
WHERE BuildItems.buildId = Build.id
AND BuildItems.itemId IN (${Prisma.join(archetypeIds)})
) = ${archetypeIds.length}`
}

export function archetypeFiltersToIds({
  archetypes,
}: {
  archetypes: string[]
}): string[] {
  const archtypeIds: string[] = []

  for (const archetype of archetypes) {
    const item = remnantItems.find(
      (item) => item.name.toLowerCase() === archetype,
    )?.id
    if (item) archtypeIds.push(item)
  }

  return archtypeIds
}
