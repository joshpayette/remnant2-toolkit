'use server'

import { PaginationResponse } from '@/features/pagination/usePagination'
import { getServerSession } from '@/features/auth/lib'
import { DBBuild } from '@/features/build/types'
import { prisma } from '@/features/db'
import { bigIntFix } from '@/lib/bigIntFix'
import {
  CommunityBuildFilterProps,
  OrderBy,
  TimeRange,
} from '@/features/filters/types'
import {
  archetypeFiltersToIds,
  limitByArchetypesSegment,
} from '@/features/filters/queries/segments/limitByArchtypes'
import {
  limitByWeaponsSegment,
  weaponFiltersToIds,
} from '@/features/filters/queries/segments/limitByWeapons'
import {
  collectionToIds,
  limitByCollectionSegment,
} from '@/features/filters/queries/segments/limitByCollection'
import { Prisma } from '@prisma/client'
import {
  communityBuildsCountQuery,
  communityBuildsQuery,
} from '@/features/filters/queries/community-builds'
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

export async function getBuildsByCollection({
  communityBuildFilters,
  discoveredItemIds,
  itemsPerPage,
  orderBy,
  pageNumber,
  timeRange,
}: {
  communityBuildFilters: CommunityBuildFilterProps
  discoveredItemIds: string[]
  itemsPerPage: number
  orderBy: OrderBy
  pageNumber: number
  timeRange: TimeRange
}): Promise<PaginationResponse<DBBuild>> {
  const session = await getServerSession()
  const userId = session?.user?.id

  if (!userId) return { items: [], totalItemCount: 0 }

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
  const ringId = ringFilterToId({ ring })
  const amuletId = amuletFilterToId({ amulet })

  // if the user has no discoveredItemIds, return an empty array
  if (discoveredItemIds.length === 0) {
    return { items: [], totalItemCount: 0 }
  }

  // add linked items or item categories omitted from the tracker
  // that are still "owned" by the user
  const allOwnedItemIds = collectionToIds({ discoveredItemIds })

  const whereConditions = Prisma.sql`
  WHERE Build.isPublic = true
  ${limitByArchetypesSegment(archetypeIds)}
  ${limitByWeaponsSegment(weaponIds)}
  ${limitByAmuletSegment(amuletId)}
  ${limitByRingSegment(ringId)}
  ${limitByReleasesSegment(selectedReleases)}
  ${limitByCollectionSegment({ userId, allOwnedItemIds })}
  ${limitByTimeCondition(timeRange)}
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
