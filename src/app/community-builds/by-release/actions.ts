'use server'

import { PaginationResponse } from '@/app/(hooks)/usePagination'
import { getServerSession } from '@/app/(lib)/auth'
import {
  DBBuild,
  SearchBuildResponse,
  SearchBuildTotalCount,
} from '@/app/(types)/build'
import { prisma } from '@/app/(lib)/db'
import { DEFAULT_DISPLAY_NAME } from '@/app/(data)/constants'
import { bigIntFix } from '@/app/(lib)/utils'
import { DLCKey } from '@/app/(types)'
import { Prisma } from '@prisma/client'

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
      ${
        userId
          ? `(EXISTS (SELECT 1 FROM BuildVoteCounts WHERE BuildVoteCounts.buildId = Build.id AND BuildVoteCounts.userId = ${userId}))`
          : 'FALSE'
      } as upvoted,
      ${
        userId
          ? `(EXISTS (SELECT 1 FROM BuildReports WHERE BuildReports.buildId = Build.id AND BuildReports.userId = ${userId}))`
          : 'FALSE'
      } as reported
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
    totalUpvotes: build.totalUpvotes,
    reported: build.reported,
    isMember: false,
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
