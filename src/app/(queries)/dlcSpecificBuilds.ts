import { Prisma } from '@prisma/client'
import { DLCKey } from '../(types)'
import { SearchBuildResponse, SearchBuildTotalCount } from '../(types)/build'
import { prisma } from '@/app/(lib)/db'

export async function getDLCSpecificBuilds({
  itemsPerPage,
  pageNumber,
  specifiedDLCItems,
}: {
  itemsPerPage: number
  pageNumber: number
  specifiedDLCItems: DLCKey[]
}) {
  return (await prisma.$queryRaw`
SELECT 
    Build.*, 
    User.displayName as createdByDisplayName,
    User.name as createdByName,
    COUNT(BuildVoteCounts.id) as totalUpvotes,
    COUNT(BuildReports.id) as totalReports,
    FALSE as upvoted,
    FALSE as reported
  FROM Build
  LEFT JOIN User ON Build.createdById = User.id
  LEFT JOIN BuildVoteCounts ON Build.id = BuildVoteCounts.buildId
  LEFT JOIN BuildReports ON Build.id = BuildReports.buildId
  WHERE Build.isPublic = true
  AND NOT EXISTS (
    SELECT 1
    FROM BuildItems
    LEFT JOIN Item ON BuildItems.itemId = Item.itemId 
    WHERE BuildItems.buildId = Build.id
    AND (Item.dlc NOT IN (${Prisma.join(
      specifiedDLCItems,
    )}) AND BuildItems.itemId != '')
)
  GROUP BY Build.id, User.displayName, User.name
  ORDER BY totalUpvotes DESC
  LIMIT ${itemsPerPage}
  OFFSET ${(pageNumber - 1) * itemsPerPage}
`) as SearchBuildResponse
}

export async function getDLCSpecificBuildsCount({
  specifiedDLCItems,
}: {
  specifiedDLCItems: DLCKey[]
}) {
  return (await prisma.$queryRaw`
    SELECT 
      COUNT(DISTINCT Build.id) as totalBuildCount
    FROM Build
    LEFT JOIN BuildItems ON Build.id = BuildItems.buildId
    LEFT JOIN Item ON BuildItems.itemId = Item.itemId 
    WHERE Build.isPublic = true
    AND NOT EXISTS (
      SELECT 1
      FROM BuildItems
      LEFT JOIN Item ON BuildItems.itemId = Item.itemId 
      WHERE BuildItems.buildId = Build.id
      AND (Item.dlc NOT IN (${Prisma.join(
        specifiedDLCItems,
      )}) AND BuildItems.itemId != '')
    )
  `) as SearchBuildTotalCount
}
