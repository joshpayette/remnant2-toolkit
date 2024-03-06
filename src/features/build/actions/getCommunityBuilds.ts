'use server'

import { Prisma } from '@prisma/client'

import { getServerSession } from '@/features/auth/lib'
import { prisma } from '@/features/db'
import {
  communityBuildsCountQuery,
  communityBuildsQuery,
} from '@/features/filters/queries/community-builds'
import { getOrderBySegment } from '@/features/filters/queries/segments/getOrderBySegment'
import {
  amuletFilterToId,
  limitByAmuletSegment,
} from '@/features/filters/queries/segments/limitByAmulet'
import {
  archetypeFiltersToIds,
  limitByArchetypesSegment,
} from '@/features/filters/queries/segments/limitByArchtypes'
import { limitByPatchAffected } from '@/features/filters/queries/segments/limitByPatchAffected'
import { limitByReleasesSegment } from '@/features/filters/queries/segments/limitByRelease'
import {
  limitByRingSegment,
  ringFilterToId,
} from '@/features/filters/queries/segments/limitByRing'
import { limitByTimeConditionSegment } from '@/features/filters/queries/segments/limitByTimeCondition'
import {
  limitByWeaponsSegment,
  weaponFiltersToIds,
} from '@/features/filters/queries/segments/limitByWeapons'
import {
  BuildListFilterFields,
  OrderBy,
  TimeRange,
} from '@/features/filters/types'
import { PaginationResponse } from '@/features/pagination/usePagination'
import { bigIntFix } from '@/lib/bigIntFix'

import { DBBuild } from '../types'

export const maxDuration = 30

export async function getCommunityBuilds({
  buildListFilters,
  itemsPerPage,
  orderBy,
  pageNumber,
  timeRange,
}: {
  buildListFilters: BuildListFilterFields
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
    includePatchAffectedBuilds,
  } = buildListFilters
  if (selectedReleases.length === 0) return { items: [], totalItemCount: 0 }

  const archetypeIds = archetypeFiltersToIds({ archetypes })
  const weaponIds = weaponFiltersToIds({
    longGun,
    handGun,
    melee,
  })
  const amuletId = amuletFilterToId({ amulet })
  const ringId = ringFilterToId({ ring })
  const trimmedSearchText = searchText.trim()

  const whereConditions = Prisma.sql`
  WHERE Build.isPublic = true
  ${limitByPatchAffected(includePatchAffectedBuilds)}
  ${limitByArchetypesSegment(archetypeIds)}
  ${limitByWeaponsSegment(weaponIds)}
  ${limitByReleasesSegment(selectedReleases)}
  ${limitByRingSegment(ringId)}
  ${limitByAmuletSegment(amuletId)}
  ${limitByTimeConditionSegment(timeRange)}
  `

  const orderBySegment = getOrderBySegment(orderBy)

  // First, get the Builds
  const [builds, totalBuildsCountResponse] = await Promise.all([
    communityBuildsQuery({
      userId,
      itemsPerPage,
      pageNumber,
      orderBySegment,
      whereConditions,
      searchText: trimmedSearchText,
    }),
    communityBuildsCountQuery({
      whereConditions,
      searchText: trimmedSearchText,
    }),
  ])

  // Then, for each Build, get the associated BuildItems
  for (const build of builds) {
    const buildItems = await prisma.buildItems.findMany({
      where: { buildId: build.id },
    })
    build.buildItems = buildItems
  }

  const totalBuildCount = totalBuildsCountResponse[0].totalBuildCount

  return bigIntFix({
    items: builds,
    totalItemCount: totalBuildCount,
  })
}
