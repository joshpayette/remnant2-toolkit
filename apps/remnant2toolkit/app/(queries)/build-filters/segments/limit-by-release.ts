import { Prisma } from '@repo/db'

import { DEFAULT_FILTER } from '@/app/(components)/filters/types'

export function limitByReleasesSegment(releases: string[]) {
  if (releases[0] === DEFAULT_FILTER) return Prisma.empty
  if (releases.length === 0) return Prisma.empty


  return Prisma.sql`AND NOT EXISTS (
      SELECT 1
      FROM BuildItems
      LEFT JOIN Item ON BuildItems.itemId = Item.itemId 
      WHERE BuildItems.buildId = Build.id
      AND (Item.dlc NOT IN (${Prisma.join(
        releases,
      )}) AND BuildItems.itemId != '')
    )
`
}
