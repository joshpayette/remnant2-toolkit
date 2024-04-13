'use server'

import { Prisma } from '@prisma/client'

import { getServerSession } from '@/features/auth/lib'
import { limitToBuildsWithReferenceLink } from '@/features/build/filters/queries/segments/limitToBuildsWithReferenceLink'
import { limitToBuildsWithVideo } from '@/features/build/filters/queries/segments/limitToBuildsWithVideo'
import { prisma } from '@/features/db'
import { PaginationResponse } from '@/features/pagination/usePagination'
import { bigIntFix } from '@/lib/bigIntFix'

import {
  communityBuildsCountQuery,
  communityBuildsQuery,
} from '../filters/queries/community-builds'
import { getOrderBySegment } from '../filters/queries/segments/getOrderBySegment'
import {
  amuletFilterToId,
  limitByAmuletSegment,
} from '../filters/queries/segments/limitByAmulet'
import {
  archetypeFiltersToIds,
  limitByArchetypesSegment,
} from '../filters/queries/segments/limitByArchtypes'
import {
  buildTagsFilterToValues,
  limitByBuildTagsSegment,
} from '../filters/queries/segments/limitByBuildTags'
import { limitByPatchAffected } from '../filters/queries/segments/limitByPatchAffected'
import { limitByReleasesSegment } from '../filters/queries/segments/limitByRelease'
import {
  limitByRingsSegment,
  ringsFilterToIds,
} from '../filters/queries/segments/limitByRings'
import { limitByTimeConditionSegment } from '../filters/queries/segments/limitByTimeCondition'
import {
  limitByWeaponsSegment,
  weaponFiltersToIds,
} from '../filters/queries/segments/limitByWeapons'
import { BuildListFilterFields, OrderBy, TimeRange } from '../filters/types'
import { DBBuild } from '../types'

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
    limitToBuildsWithVideo: onlyBuildsWithVideo,
    limitToBuildsWithReferenceLink: onlyBuildsWithReferenceLink,
  } = buildListFilters
  if (selectedReleases.length === 0) return { items: [], totalItemCount: 0 }

  const archetypeIds = archetypeFiltersToIds({ archetypes })
  const weaponIds = weaponFiltersToIds({
    longGun,
    handGun,
    melee,
  })
  const amuletId = amuletFilterToId({ amulet })
  const ringIds = ringsFilterToIds({ rings: [ring1, ring2, ring3, ring4] })
  const tagValues = buildTagsFilterToValues(buildTags)
  const trimmedSearchText = searchText.trim()

  const whereConditions = Prisma.sql`
  WHERE Build.isPublic = true
  ${limitByPatchAffected(includePatchAffectedBuilds)}
  ${limitToBuildsWithVideo(onlyBuildsWithVideo)}
  ${limitToBuildsWithReferenceLink(onlyBuildsWithReferenceLink)}
  ${limitByArchetypesSegment(archetypeIds)}
  ${limitByWeaponsSegment(weaponIds)}
  ${limitByReleasesSegment(selectedReleases)}
  ${limitByRingsSegment(ringIds)}
  ${limitByAmuletSegment(amuletId)}
  ${limitByBuildTagsSegment(tagValues)}
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

  // Then, for each Build, get the associated BuildTags
  for (const build of builds) {
    const buildTags = await prisma.buildTags.findMany({
      where: { buildId: build.id },
    })
    build.buildTags = buildTags
  }

  const totalBuildCount = totalBuildsCountResponse[0].totalBuildCount

  return bigIntFix({
    items: builds,
    totalItemCount: totalBuildCount,
  })
}
