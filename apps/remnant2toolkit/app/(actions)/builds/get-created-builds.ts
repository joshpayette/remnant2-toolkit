'use server'

import { Prisma } from '@repo/db'
import { prisma } from '@repo/db'
import { bigIntFix } from '@repo/utils/big-int-fix'

import { OrderBy } from '@/app/(components)/filters/builds/secondary-filters/order-by-filter/use-order-by-filter'
import { TimeRange } from '@/app/(components)/filters/builds/secondary-filters/time-range-filter/use-time-range-filter'
import { getServerSession } from '@/app/(features)/auth'
import {
  communityBuildsCountQuery,
  communityBuildsQuery,
} from '@/app/(queries)/build-filters/community-builds'
import { getOrderBySegment } from '@/app/(queries)/build-filters/segments/get-order-by'
import { limitByTimeConditionSegment } from '@/app/(queries)/build-filters/segments/limit-by-time-condition'
import { DBBuild } from '@/app/(types)/builds'
import { PaginationResponse } from '@/app/(utils)/pagination/use-pagination'

export type CreatedBuildsFilter = 'date created' | 'upvotes'

export async function getCreatedBuilds({
  itemsPerPage,
  orderBy,
  pageNumber,
  timeRange,
  userId,
}: {
  itemsPerPage: number
  orderBy: OrderBy
  pageNumber: number
  timeRange: TimeRange
  userId: string
}): Promise<PaginationResponse<DBBuild>> {
  const session = await getServerSession()
  if (!session || !session.user) {
    return {
      items: [],
      totalItemCount: 0,
    }
  }

  const whereConditions = Prisma.sql`
  WHERE Build.createdById = ${userId}
  AND Build.isPublic = true
  ${limitByTimeConditionSegment(timeRange)}
  `

  const orderBySegment = getOrderBySegment(orderBy)

  // First, get the Builds
  const [builds, totalBuildsCountResponse] = await prisma.$transaction([
    communityBuildsQuery({
      userId,
      itemsPerPage,
      pageNumber,
      orderBySegment,
      whereConditions,
      searchText: '',
    }),
    communityBuildsCountQuery({
      whereConditions,
      searchText: '',
    }),
  ])

  // Then, for each Build, get the associated BuildItems
  for (const build of builds) {
    const buildItems = await prisma.buildItems.findMany({
      where: { buildId: build.id },
    })
    build.buildItems = buildItems
  }

  // Then, for each Build, get the associated BuildTags
  for (const build of builds) {
    const buildTags = await prisma.buildTags.findMany({
      where: { buildId: build.id },
    })
    build.buildTags = buildTags
  }

  const totalBuildCount = totalBuildsCountResponse[0]?.totalBuildCount ?? 0

  return bigIntFix({
    items: builds,
    totalItemCount: totalBuildCount,
  })
}
