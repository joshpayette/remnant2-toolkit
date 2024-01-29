import {
  CommunityBuildQueryResponse,
  CommunityBuildTotalCount,
} from '@/features/build/types'
import { Prisma } from '@prisma/client'
import { prisma } from '@/features/db'

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
}

export function communityBuildsQuery({
  itemsPerPage,
  pageNumber,
  userId,
  orderBySegment,
  whereConditions,
}: Props): Prisma.PrismaPromise<CommunityBuildQueryResponse> {
  const query = Prisma.sql`
  SELECT Build.*, 
  User.name as createdByName, 
  User.displayName as createdByDisplayName, 
  COUNT(BuildVoteCounts.buildId) as totalUpvotes,
  COUNT(BuildReports.id) as totalReports,
  ${userReportedBuildSegment(userId)},
  ${userUpvotedBuildSegment(userId)},
  ${userPaidSegment()}
FROM Build
LEFT JOIN BuildVoteCounts ON Build.id = BuildVoteCounts.buildId
LEFT JOIN User on Build.createdById = User.id
LEFT JOIN BuildReports on Build.id = BuildReports.buildId AND BuildReports.userId = ${userId}
LEFT JOIN PaidUsers on User.id = PaidUsers.userId
${whereConditions}
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
}: {
  whereConditions: Props['whereConditions']
}): Prisma.PrismaPromise<CommunityBuildTotalCount> {
  const query = Prisma.sql`
  SELECT COUNT(DISTINCT Build.id) as totalBuildCount
  FROM Build
  LEFT JOIN BuildVoteCounts ON Build.id = BuildVoteCounts.buildId
  ${whereConditions}
  `

  return prisma.$queryRaw<CommunityBuildTotalCount>(query)
}
