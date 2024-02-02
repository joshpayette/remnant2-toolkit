'use server'

import { prisma } from '@/features/db'
import { Prisma } from '@prisma/client'
import { bigIntFix } from '@/lib/bigIntFix'
import { DBBuild } from '../types'
import { PaginationResponse } from '@/features/pagination/usePagination'
import { getServerSession } from '@/features/auth/lib'
import {
  archetypeFiltersToIds,
  limitByArchetypesSegment,
} from '@/features/filters/queries/segments/limitByArchtypes'
import {
  communityBuildsCountQuery,
  communityBuildsQuery,
} from '@/features/filters/queries/community-builds'
import {
  limitByWeaponsSegment,
  weaponFiltersToIds,
} from '@/features/filters/queries/segments/limitByWeapons'
import {
  CommunityBuildFilterProps,
  OrderBy,
  TimeRange,
} from '@/features/filters/types'
import { limitByReleasesSegment } from '@/features/filters/queries/segments/limitByRelease'
import limitByTimeCondition from '@/features/filters/queries/segments/limitByTimeCondition'
import orderBySegment from '@/features/filters/queries/segments/getOrderBySegment'
import getOrderBySegment from '@/features/filters/queries/segments/getOrderBySegment'

export async function getCommunityBuilds({
  communityBuildFilters,
  itemsPerPage,
  orderBy,
  pageNumber,
  timeRange,
}: {
  communityBuildFilters: CommunityBuildFilterProps
  itemsPerPage: number
  orderBy: OrderBy
  pageNumber: number
  timeRange: TimeRange
}): Promise<PaginationResponse<DBBuild>> {
  const session = await getServerSession()
  const userId = session?.user?.id

  const { archetypes, longGun, handGun, melee, selectedReleases } =
    communityBuildFilters
  const archetypeIds = archetypeFiltersToIds({ archetypes })

  if (selectedReleases.length === 0) return { items: [], totalItemCount: 0 }

  const weaponIds = weaponFiltersToIds({
    longGun,
    handGun,
    melee,
  })

  const whereConditions = Prisma.sql`
  WHERE Build.isPublic = true
  ${limitByArchetypesSegment(archetypeIds)}
  ${limitByWeaponsSegment(weaponIds)}
  ${limitByReleasesSegment(selectedReleases)}
  ${limitByTimeCondition(timeRange)}
  `

  const orderBySegment = getOrderBySegment(orderBy)

  // First, get the Builds
  const builds = await communityBuildsQuery({
    userId,
    itemsPerPage,
    pageNumber,
    orderBySegment,
    whereConditions,
  })

  // Then, for each Build, get the associated BuildItems
  for (const build of builds) {
    const buildItems = await prisma.buildItems.findMany({
      where: { buildId: build.id },
    })
    build.buildItems = buildItems
  }

  const totalBuildsCountResponse = await communityBuildsCountQuery({
    whereConditions,
  })
  const totalBuildCount = totalBuildsCountResponse[0].totalBuildCount

  return bigIntFix({
    items: builds,
    totalItemCount: totalBuildCount,
  })
}
