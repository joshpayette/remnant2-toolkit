'use server'

import { prisma } from '@/features/db'
import { Prisma } from '@prisma/client'
import { remnantItems } from '@/features/items/data'
import { bigIntFix } from '@/lib/bigIntFix'
import { Archtype } from '@/features/items/types'
import { CommunityBuildFilterProps } from '@/features/build/components/CommunityBuildFilters'
import { DBBuild } from '../types'
import { PaginationResponse } from '@/features/pagination/hooks/usePagination'
import { getServerSession } from '@/features/auth/lib'
import {
  archtypeFiltersToIds,
  limitByArchtypesSegment,
} from '@/features/filters/queries/segments/limitByArchtypes'
import {
  communityBuildsCountQuery,
  communityBuildsQuery,
} from '@/features/filters/queries/community-builds'
import {
  limitByWeaponsSegment,
  weaponFiltersToIds,
} from '@/features/filters/queries/segments/limitByWeapons'

export type TimeRange = 'day' | 'week' | 'month' | 'all-time'

function formatDateToMySQL(date: Date): string {
  return date.toISOString().slice(0, 19).replace('T', ' ')
}

export async function getMostPopularBuilds({
  itemsPerPage,
  pageNumber,
  timeRange,
  communityBuildFilters,
}: {
  timeRange: TimeRange
  itemsPerPage: number
  pageNumber: number
  communityBuildFilters: CommunityBuildFilterProps
}): Promise<PaginationResponse<DBBuild>> {
  const session = await getServerSession()
  const userId = session?.user?.id

  let timeCondition = ''
  const now = new Date()
  const allTime = new Date(2023, 0, 1)

  switch (timeRange) {
    case 'day':
      const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000)
      timeCondition = `${formatDateToMySQL(oneDayAgo)}`
      break
    case 'week':
      const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
      timeCondition = `${formatDateToMySQL(oneWeekAgo)}`
      break
    case 'month':
      const oneMonthAgo = new Date(
        now.getFullYear(),
        now.getMonth() - 1,
        now.getDate(),
      )
      timeCondition = `${formatDateToMySQL(oneMonthAgo)}`
      break
    case 'all-time':
      timeCondition = `${formatDateToMySQL(allTime)}`
    default:
      timeCondition = `${formatDateToMySQL(allTime)}`
      break
  }

  const { archtypes, longGun, handGun, melee } = communityBuildFilters
  const archtypeIds = archtypeFiltersToIds({ archtypes })

  const weaponIds = weaponFiltersToIds({
    longGun,
    handGun,
    melee,
  })

  const whereConditions = Prisma.sql`
  WHERE Build.isPublic = true
  ${limitByArchtypesSegment(archtypeIds)}
  ${limitByWeaponsSegment(weaponIds)}
  AND Build.createdAt > ${timeCondition}
  `

  const orderBySegment = Prisma.sql`
  ORDER BY totalUpvotes DESC
  `

  // First, get the Builds
  const topBuilds = await communityBuildsQuery({
    userId,
    itemsPerPage,
    pageNumber,
    orderBySegment,
    whereConditions,
  })

  // Then, for each Build, get the associated BuildItems
  for (const build of topBuilds) {
    const buildItems = await prisma.buildItems.findMany({
      where: { buildId: build.id },
    })
    build.buildItems = buildItems
  }

  const totalTopBuilds = await communityBuildsCountQuery({
    whereConditions,
  })
  const totalBuildCount = totalTopBuilds[0].totalBuildCount

  const returnedBuilds: DBBuild[] = topBuilds.map((build) => ({
    id: build.id,
    name: build.name,
    description: build.description,
    isPublic: build.isPublic,
    isFeaturedBuild: build.isFeaturedBuild,
    thumbnailUrl: build.thumbnailUrl,
    videoUrl: build.videoUrl,
    createdById: build.createdById,
    createdAt: build.createdAt,
    updatedAt: build.updatedAt,
    createdByDisplayName: build.createdByDisplayName || build.createdByName,
    upvoted: false,
    totalUpvotes: build.totalUpvotes,
    reported: build.reported,
    isMember: build.isPaidUser,
    buildItems: build.buildItems,
  }))

  return bigIntFix({
    items: returnedBuilds,
    totalItemCount: totalBuildCount,
  })
}
