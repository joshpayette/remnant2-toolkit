import { Prisma } from '@repo/db'

export function limitByCollectionSegment(
  withCollection: boolean,
  userId: string | undefined,
) {
  if (!userId) return Prisma.empty
  if (!withCollection) return Prisma.empty

  return Prisma.sql`AND NOT EXISTS (
    SELECT 1
    FROM BuildItems
    WHERE BuildItems.buildId = Build.id
    AND BuildItems.itemId != ''
    AND BuildItems.category NOT IN ('skill', 'perk')
    AND BuildItems.itemId NOT IN (
        SELECT UserItems.itemId
        FROM UserItems
        WHERE UserItems.userId = ${userId}
    )
)`
}
