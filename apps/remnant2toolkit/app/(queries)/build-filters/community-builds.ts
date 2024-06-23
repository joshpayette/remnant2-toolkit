import { Prisma } from '@repo/db'
import { prisma } from '@repo/db'

import {
  CommunityBuildQueryResponse,
  CommunityBuildTotalCount,
} from '@/app/(types)/builds'

function userReportedBuildSegment(userId: string | undefined) {
  return Prisma.sql`
  CASE WHEN EXISTS (
    SELECT 1
    FROM BuildReports
    WHERE BuildReports.buildId = Build.id
    AND BuildReports.userId = ${userId}
  ) THEN TRUE ELSE FALSE END as reported
  `
}

function userUpvotedBuildSegment(userId: string | undefined) {
  return Prisma.sql`
  CASE WHEN EXISTS (
    SELECT 1
    FROM BuildVoteCounts
    WHERE BuildVoteCounts.buildId = Build.id
    AND BuildVoteCounts.userId = ${userId}
  ) THEN TRUE ELSE FALSE END as upvoted
  `
}

function userPaidSegment() {
  return Prisma.sql`
  CASE WHEN PaidUsers.userId IS NOT NULL THEN true ELSE false END as isMember
  `
}

type Props = {
  itemsPerPage: number
  pageNumber: number
  userId: string | undefined
  whereConditions: Prisma.Sql
  orderBySegment: Prisma.Sql
  searchText: string
}

export function communityBuildsQuery({
  itemsPerPage,
  pageNumber,
  userId,
  orderBySegment,
  whereConditions,
  searchText,
}: Props): Prisma.PrismaPromise<CommunityBuildQueryResponse> {
  const query = Prisma.sql`
  SELECT Build.*, 
  User.name as createdByName, 
  User.displayName as createdByDisplayName,
  (SELECT COUNT(*) FROM BuildVoteCounts WHERE BuildVoteCounts.buildId = Build.id) as totalUpvotes,
  COUNT(BuildReports.id) as totalReports,
  ${userReportedBuildSegment(userId)},
  ${userUpvotedBuildSegment(userId)},
  ${userPaidSegment()}
FROM Build
LEFT JOIN BuildVoteCounts ON Build.id = BuildVoteCounts.buildId
LEFT JOIN User on Build.createdById = User.id
LEFT JOIN BuildReports on Build.id = BuildReports.buildId AND BuildReports.userId = ${userId}
LEFT JOIN PaidUsers on User.id = PaidUsers.userId
LEFT JOIN BuildTags on Build.id = BuildTags.buildId
  LEFT JOIN (
    SELECT 
        BuildItems.buildId,
        SUM(CASE WHEN BuildItems.category = 'archtype' THEN 1 ELSE 0 END) as archtypeCount,
        SUM(CASE WHEN BuildItems.category = 'skill' THEN 1 ELSE 0 END) as skillCount,
        SUM(CASE WHEN BuildItems.category = 'helm' THEN 1 ELSE 0 END) as helmCount,
        SUM(CASE WHEN BuildItems.category = 'torso' THEN 1 ELSE 0 END) as torsoCount,
        SUM(CASE WHEN BuildItems.category = 'gloves' THEN 1 ELSE 0 END) as glovesCount,
        SUM(CASE WHEN BuildItems.category = 'legs' THEN 1 ELSE 0 END) as legsCount,
        SUM(CASE WHEN BuildItems.category = 'relic' THEN 1 ELSE 0 END) as relicCount,
        SUM(CASE WHEN BuildItems.category = 'relicfragment' THEN 1 ELSE 0 END) as relicfragmentCount,
        SUM(CASE WHEN BuildItems.category = 'weapon' THEN 1 ELSE 0 END) as weaponCount,
        SUM(CASE WHEN BuildItems.category = 'mod' THEN 1 ELSE 0 END) as modCount,
        SUM(CASE WHEN BuildItems.category = 'mutator' THEN 1 ELSE 0 END) as mutatorCount,
        SUM(CASE WHEN BuildItems.category = 'amulet' THEN 1 ELSE 0 END) as amuletCount,
        SUM(CASE WHEN BuildItems.category = 'ring' THEN 1 ELSE 0 END) as ringCount,
        SUM(CASE WHEN BuildItems.category = 'trait' THEN BuildItems.amount ELSE 0 END) as traitSum
    FROM BuildItems
    GROUP BY BuildItems.buildId
  ) as ItemCounts ON Build.id = ItemCounts.buildId
${whereConditions}
AND (User.displayName LIKE ${'%' + searchText + '%'} 
OR User.name LIKE ${'%' + searchText + '%'} 
OR Build.name LIKE ${'%' + searchText + '%'} 
OR Build.description LIKE ${'%' + searchText + '%'}
)
GROUP BY Build.id, User.id
${orderBySegment}
LIMIT ${itemsPerPage} 
OFFSET ${(pageNumber - 1) * itemsPerPage}
  `

  return prisma.$queryRaw<CommunityBuildQueryResponse>(query)
}

/**
 * with the response, you can get the total via:
 * response[0].totalBuildCount
 */
export function communityBuildsCountQuery({
  whereConditions,
  searchText,
}: {
  whereConditions: Props['whereConditions']
  searchText: Props['searchText']
}): Prisma.PrismaPromise<CommunityBuildTotalCount> {
  const query = Prisma.sql`
  SELECT COUNT(DISTINCT Build.id) as totalBuildCount
  FROM Build
  LEFT JOIN BuildVoteCounts ON Build.id = BuildVoteCounts.buildId
  LEFT JOIN BuildTags on Build.id = BuildTags.buildId
  LEFT JOIN User on Build.createdById = User.id
  LEFT JOIN (
  SELECT 
      BuildItems.buildId,
      SUM(CASE WHEN BuildItems.category = 'archtype' THEN 1 ELSE 0 END) as archtypeCount,
      SUM(CASE WHEN BuildItems.category = 'skill' THEN 1 ELSE 0 END) as skillCount,
      SUM(CASE WHEN BuildItems.category = 'helm' THEN 1 ELSE 0 END) as helmCount,
      SUM(CASE WHEN BuildItems.category = 'torso' THEN 1 ELSE 0 END) as torsoCount,
      SUM(CASE WHEN BuildItems.category = 'gloves' THEN 1 ELSE 0 END) as glovesCount,
      SUM(CASE WHEN BuildItems.category = 'legs' THEN 1 ELSE 0 END) as legsCount,
      SUM(CASE WHEN BuildItems.category = 'relic' THEN 1 ELSE 0 END) as relicCount,
      SUM(CASE WHEN BuildItems.category = 'relicfragment' THEN 1 ELSE 0 END) as relicfragmentCount,
      SUM(CASE WHEN BuildItems.category = 'weapon' THEN 1 ELSE 0 END) as weaponCount,
      SUM(CASE WHEN BuildItems.category = 'mod' THEN 1 ELSE 0 END) as modCount,
      SUM(CASE WHEN BuildItems.category = 'mutator' THEN 1 ELSE 0 END) as mutatorCount,
      SUM(CASE WHEN BuildItems.category = 'amulet' THEN 1 ELSE 0 END) as amuletCount,
      SUM(CASE WHEN BuildItems.category = 'ring' THEN 1 ELSE 0 END) as ringCount,
      SUM(CASE WHEN BuildItems.category = 'trait' THEN BuildItems.amount ELSE 0 END) as traitSum
  FROM BuildItems
  GROUP BY BuildItems.buildId
) as ItemCounts ON Build.id = ItemCounts.buildId
${whereConditions}
AND (User.displayName LIKE ${'%' + searchText + '%'} 
OR User.name LIKE ${'%' + searchText + '%'} 
OR Build.name LIKE ${'%' + searchText + '%'} 
OR Build.description LIKE ${'%' + searchText + '%'}
)
  `

  return prisma.$queryRaw<CommunityBuildTotalCount>(query)
}
