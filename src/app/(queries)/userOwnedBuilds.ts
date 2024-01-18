import { SearchBuildResponse, SearchBuildTotalCount } from '../(types)/build'
import { prisma } from '@/app/(lib)/db'

export async function getUserOwnedBuilds({
  userId,
  itemsPerPage,
  pageNumber,
}: {
  userId: string
  itemsPerPage: number
  pageNumber: number
}) {
  return (await prisma.$queryRaw`
  SELECT 
    Build.*, 
    User.displayName as createdByDisplayName,
    User.name as createdByName,
    COUNT(BuildVoteCounts.id) as totalUpvotes,
    COUNT(BuildReports.id) as totalReports,
    CASE WHEN EXISTS (
      SELECT 1
      FROM BuildReports
      WHERE BuildReports.buildId = Build.id
      AND BuildReports.userId = ${userId}
    ) THEN TRUE ELSE FALSE END as reported,
    CASE WHEN EXISTS (
      SELECT 1
      FROM BuildVoteCounts
      WHERE BuildVoteCounts.buildId = Build.id
      AND BuildVoteCounts.userId = ${userId}
    ) THEN TRUE ELSE FALSE END as upvoted
  FROM Build
  LEFT JOIN User ON Build.createdById = User.id
  LEFT JOIN BuildVoteCounts ON Build.id = BuildVoteCounts.buildId
  LEFT JOIN BuildReports ON Build.id = BuildReports.buildId
  WHERE Build.isPublic = true
  AND NOT EXISTS (
      SELECT 1
      FROM BuildItems
      LEFT JOIN UserItems
          ON  BuildItems.itemId = UserItems.itemId 
          AND UserItems.userId = ${userId}
      WHERE BuildItems.buildId = Build.id
      AND nullif(BuildItems.itemId,'') IS NOT NULL
      AND UserItems.itemId IS NULL
  )
  GROUP BY Build.id, User.displayName, User.name
  ORDER BY totalUpvotes DESC
  LIMIT ${itemsPerPage}
  OFFSET ${(pageNumber - 1) * itemsPerPage}
`) as SearchBuildResponse
}

export async function getUserOwnedBuildsCount({ userId }: { userId: string }) {
  return (await prisma.$queryRaw`
  SELECT 
    COUNT(DISTINCT Build.id) as totalBuildCount
  FROM Build
  LEFT JOIN User ON Build.createdById = User.id
  LEFT JOIN BuildVoteCounts ON Build.id = BuildVoteCounts.buildId
  LEFT JOIN BuildReports ON Build.id = BuildReports.buildId
  WHERE Build.isPublic = true
  AND NOT EXISTS (
      SELECT 1
      FROM BuildItems
      LEFT JOIN UserItems
          ON  BuildItems.itemId = UserItems.itemId 
          AND UserItems.userId = ${userId}
      WHERE BuildItems.buildId = Build.id
      AND nullif(BuildItems.itemId,'') IS NOT NULL
      AND UserItems.itemId IS NULL
  )
`) as SearchBuildTotalCount
}
