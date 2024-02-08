'use server'

import { DBBuild } from '@/features/build/types'
import { PaginationResponse } from '@/features/pagination/usePagination'
import { bigIntFix } from '@/lib/bigIntFix'
import { getServerSession } from '@/features/auth/lib'
import { Prisma } from '@prisma/client'
import { prisma } from '@/features/db'
import {
  BuildListFilterFields,
  OrderBy,
  TimeRange,
} from '@/features/filters/types'
import {
  communityBuildsCountQuery,
  communityBuildsQuery,
} from '@/features/filters/queries/community-builds'
import getOrderBySegment from '@/features/filters/queries/segments/getOrderBySegment'
import { limitByTimeConditionSegment } from '@/features/filters/queries/segments/limitByTimeCondition'
import { limitByReleasesSegment } from '@/features/filters/queries/segments/limitByRelease'
import {
  limitByWeaponsSegment,
  weaponFiltersToIds,
} from '@/features/filters/queries/segments/limitByWeapons'
import {
  archetypeFiltersToIds,
  limitByArchetypesSegment,
} from '@/features/filters/queries/segments/limitByArchtypes'
import {
  amuletFilterToId,
  limitByAmuletSegment,
} from '@/features/filters/queries/segments/limitByAmulet'
import {
  limitByRingSegment,
  ringFilterToId,
} from '@/features/filters/queries/segments/limitByRing'
import { limitByBuildNameOrDescriptionSegment } from '@/features/filters/queries/segments/limitByBuildNameOrDescription'
import { limitByFavorited } from '@/features/filters/queries/segments/limitByFavorited'

export async function getFavoritedBuilds({
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

  const whereConditions = Prisma.sql`
WHERE Build.isPublic = true
AND Build.createdById != ${userId}
${limitByFavorited(userId)}
${limitByArchetypesSegment(archetypeIds)}
${limitByWeaponsSegment(weaponIds)}
${limitByAmuletSegment(amuletId)}
${limitByRingSegment(ringId)}
${limitByReleasesSegment(selectedReleases)}
${limitByTimeConditionSegment(timeRange)}
${limitByBuildNameOrDescriptionSegment(searchText)}
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
    }),
    communityBuildsCountQuery({
      whereConditions,
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
