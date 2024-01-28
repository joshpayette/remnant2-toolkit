import { Prisma } from '@prisma/client'

export function limitByReleasesSegment(releases: string[]) {
  return releases.length === 0
    ? Prisma.empty
    : Prisma.sql`AND NOT EXISTS (
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
