'use server'

import { PaginationResponse } from '@/features/pagination/hooks/usePagination'
import { getServerSession } from '@/features/auth/lib/auth'
import {
  DBBuild,
  SearchBuildResponse,
  SearchBuildTotalCount,
} from '@/features/build/types'
import { prisma } from '@/features/db/lib/db'
import { bigIntFix } from '@/lib/utils'
import { Prisma } from '@prisma/client'
import { DLCKey } from '@/features/items/dlc/types'
import { DEFAULT_DISPLAY_NAME } from '@/features/profile/constants'

export async function getBuilds({
  itemsPerPage,
  pageNumber,
  specifiedDLCItems,
}: {
  itemsPerPage: number
  pageNumber: number
  specifiedDLCItems: DLCKey[]
}): Promise<PaginationResponse<DBBuild>> {
  const session = await getServerSession()
  const userId = session?.user?.id

  // --------------------------------------------
  // Return all builds that contain the selected DLC items
  // --------------------------------------------

  const builds = (await prisma.$queryRaw`
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
        ) THEN TRUE ELSE FALSE END as upvoted,
        CASE WHEN PaidUsers.userId IS NOT NULL THEN true ELSE false END as isPaidUser
    FROM Build
    LEFT JOIN User ON Build.createdById = User.id
    LEFT JOIN BuildVoteCounts ON Build.id = BuildVoteCounts.buildId
    LEFT JOIN BuildReports on Build.id = BuildReports.buildId AND BuildReports.userId = ${userId}
    LEFT JOIN PaidUsers on User.id = PaidUsers.userId
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

  const totalBuilds = (await prisma.$queryRaw`
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
  const totalBuildCount = totalBuilds[0].totalBuildCount

  if (!builds) {
    console.info('No builds found')
    return { items: [], totalItemCount: 0 }
  }

  const returnedBuilds: DBBuild[] = builds.map((build) => ({
    id: build.id,
    name: build.name,
    description: build.description,
    isPublic: build.isPublic,
    isFeaturedBuild: build.isFeaturedBuild,
    thumbnailUrl: build.thumbnailUrl,
    createdById: build.createdById,
    createdAt: build.createdAt,
    updatedAt: build.updatedAt,
    totalUpvotes: build.totalUpvotes,
    reported: build.reported,
    isMember: build.isPaidUser,
    createdByDisplayName:
      build.createdByDisplayName || build.createdByName || DEFAULT_DISPLAY_NAME,
    upvoted: build.upvoted,
    buildItems: [],
  }))

  // Add the buildItems to each build
  for (const build of returnedBuilds) {
    const buildItems = await prisma.buildItems.findMany({
      where: {
        buildId: build.id,
      },
    })
    build.buildItems = buildItems
  }

  return bigIntFix({
    items: returnedBuilds,
    totalItemCount: totalBuildCount,
  })
}
