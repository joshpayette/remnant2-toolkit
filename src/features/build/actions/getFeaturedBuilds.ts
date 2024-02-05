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
import getOrderBySegment from '@/features/filters/queries/segments/getOrderBySegment'
import {
  limitByRingSegment,
  ringFilterToId,
} from '@/features/filters/queries/segments/limitByRing'
import {
  amuletFilterToId,
  limitByAmuletSegment,
} from '@/features/filters/queries/segments/limitByAmulet'
import { limitByBuildNameOrDescription } from '@/features/filters/queries/segments/limitByBuildNameOrDescription'

export async function getFeaturedBuilds({
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

  const {
    amulet,
    archetypes,
    handGun,
    longGun,
    melee,
    ring,
    searchText,
    selectedReleases,
  } = communityBuildFilters

  if (selectedReleases.length === 0) return { items: [], totalItemCount: 0 }

  const archetypeIds = archetypeFiltersToIds({ archetypes })
  const weaponIds = weaponFiltersToIds({ longGun, handGun, melee })
  const amuletId = amuletFilterToId({ amulet })
  const ringId = ringFilterToId({ ring })

  const whereConditions = Prisma.sql`
  WHERE Build.isPublic = true
  AND Build.isFeaturedBuild = true
  ${limitByArchetypesSegment(archetypeIds)}
  ${limitByWeaponsSegment(weaponIds)}
  ${limitByReleasesSegment(selectedReleases)}
  ${limitByTimeCondition(timeRange)}
  ${limitByAmuletSegment(amuletId)}
  ${limitByRingSegment(ringId)}
  ${limitByBuildNameOrDescription(searchText)}
  `

  const orderBySegment = getOrderBySegment(orderBy)

  const builds = await communityBuildsQuery({
    userId,
    itemsPerPage,
    pageNumber,
    orderBySegment,
    whereConditions,
  })

  if (!builds) return { items: [], totalItemCount: 0 }

  const totalBuildCountResponse = await communityBuildsCountQuery({
    whereConditions,
  })
  const totalBuilds = totalBuildCountResponse[0].totalBuildCount

  // Find all build items for each build
  for (const build of builds) {
    const buildItems = await prisma.buildItems.findMany({
      where: { buildId: build.id },
    })
    build.buildItems = buildItems
  }

  return bigIntFix({ items: builds, totalItemCount: totalBuilds })
}
