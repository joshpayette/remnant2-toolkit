'use server'

import { CommunityBuildTotalCount, DBBuild } from '@/features/build/types'
import { PaginationResponse } from '@/features/pagination/usePagination'
import { bigIntFix } from '@/lib/bigIntFix'
import { getServerSession } from '@/features/auth/lib'
import { Prisma } from '@prisma/client'
import { communityBuildsCountQuery } from '@/features/filters/queries/community-builds'
import { prisma } from '@/features/db'

export type SortFilter = 'date favorited' | 'upvotes'

export async function getFavoritedBuilds({
  itemsPerPage,
  pageNumber,
  sortFilter,
}: {
  itemsPerPage: number
  pageNumber: number
  sortFilter: SortFilter
}): Promise<PaginationResponse<DBBuild>> {
  const session = await getServerSession()
  const userId = session?.user?.id

  const whereConditions = Prisma.sql`
  WHERE Build.isPublic = true
  AND BuildVoteCounts.userId = ${userId}
  AND Build.createdById != ${userId}
  `

  const orderBySegment =
    sortFilter === 'date favorited'
      ? Prisma.sql`
ORDER BY latestVoteUpdatedAt DESC
`
      : Prisma.sql`
ORDER BY totalUpvotes DESC
`

  const buildQuery = Prisma.sql`
SELECT Build.*, 
  User.name as createdByName, 
  User.displayName as createdByDisplayName, 
  COUNT(BuildVoteCounts.buildId) as totalUpvotes,
  COUNT(BuildReports.id) as totalReports,
  (SELECT MAX(updatedAt) FROM BuildVoteCounts WHERE BuildVoteCounts.buildId = Build.id AND userId = ${userId}) as latestVoteUpdatedAt,
  CASE WHEN PaidUsers.userId IS NOT NULL THEN true ELSE false END as isPaidUser
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

  const builds = await prisma.$queryRaw<DBBuild[]>(buildQuery)

  const buildCountQuery = Prisma.sql`
  SELECT COUNT(DISTINCT Build.id) as totalBuildCount
  FROM Build
  LEFT JOIN BuildVoteCounts ON Build.id = BuildVoteCounts.buildId
  ${whereConditions}
  `
  const totalBuildCountResponse =
    await prisma.$queryRaw<CommunityBuildTotalCount>(buildCountQuery)
  const totalBuildCount = totalBuildCountResponse[0].totalBuildCount

  return bigIntFix({ items: builds, totalItemCount: totalBuildCount })
}
