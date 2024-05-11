import { Prisma } from '@prisma/client'

import {
  CommunityBuildQueryResponse,
  CommunityBuildTotalCount,
} from '@/app/(types)/builds'
import { prisma } from '@/app/(utils)/db'

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
  LEFT JOIN User on Build.createdById = User.id
  ${whereConditions}
AND (User.displayName LIKE ${'%' + searchText + '%'} 
OR User.name LIKE ${'%' + searchText + '%'} 
OR Build.name LIKE ${'%' + searchText + '%'} 
OR Build.description LIKE ${'%' + searchText + '%'}
)
  `

  return prisma.$queryRaw<CommunityBuildTotalCount>(query)
}
