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
import {
  buildTagsFilterToValues,
  limitByBuildTagsSegment,
} from '@/features/filters/queries/segments/limitByBuildTags'
import { limitByPatchAffected } from '@/features/filters/queries/segments/limitByPatchAffected'
import { limitByReleasesSegment } from '@/features/filters/queries/segments/limitByRelease'
import {
  limitByRingsSegment,
  ringsFilterToIds,
} from '@/features/filters/queries/segments/limitByRings'
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

export async function getFeaturedBuilds({
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
    buildTags,
    handGun,
    longGun,
    melee,
    ring1,
    ring2,
    ring3,
    ring4,
    searchText,
    selectedReleases,
    includePatchAffectedBuilds,
  } = buildListFilters

  if (selectedReleases.length === 0) return { items: [], totalItemCount: 0 }

  const archetypeIds = archetypeFiltersToIds({ archetypes })
  const weaponIds = weaponFiltersToIds({ longGun, handGun, melee })
  const amuletId = amuletFilterToId({ amulet })
  const tagValues = buildTagsFilterToValues(buildTags)
  const ringIds = ringsFilterToIds({ rings: [ring1, ring2, ring3, ring4] })

  const whereConditions = Prisma.sql`
  WHERE Build.isPublic = true
  AND Build.isFeaturedBuild = true
  ${limitByPatchAffected(includePatchAffectedBuilds)}
  ${limitByArchetypesSegment(archetypeIds)}
  ${limitByWeaponsSegment(weaponIds)}
  ${limitByReleasesSegment(selectedReleases)}
  ${limitByTimeConditionSegment(timeRange)}
  ${limitByAmuletSegment(amuletId)}
  ${limitByRingsSegment(ringIds)}
  ${limitByBuildTagsSegment(tagValues)}
  `

  const orderBySegment = getOrderBySegment(orderBy, true)

  const trimmedSearchText = searchText.trim()

  const [builds, totalBuildCountResponse] = await prisma.$transaction([
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

  if (!builds) return { items: [], totalItemCount: 0 }

  const totalBuilds = totalBuildCountResponse[0].totalBuildCount

  // Find all build items for each build
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

  return bigIntFix({ items: builds, totalItemCount: totalBuilds })
}
