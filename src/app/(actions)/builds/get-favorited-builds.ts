'use server'

import { Prisma } from '@prisma/client'

import { OrderBy } from '@/app/(components)/filters/builds/secondary-filters/order-by-filter/use-order-by-filter'
import { TimeRange } from '@/app/(components)/filters/builds/secondary-filters/time-range-filter/use-time-range-filter'
import { BuildListFilters } from '@/app/(components)/filters/builds/types'
import {
  communityBuildsCountQuery,
  communityBuildsQuery,
} from '@/app/(queries)/build-filters/community-builds'
import { getOrderBySegment } from '@/app/(queries)/build-filters/segments/get-order-by'
import {
  amuletFilterToId,
  limitByAmuletSegment,
} from '@/app/(queries)/build-filters/segments/limit-by-amulet'
import {
  archetypeFiltersToIds,
  limitByArchetypesSegment,
} from '@/app/(queries)/build-filters/segments/limit-by-archetypes'
import {
  buildTagsFilterToValues,
  limitByBuildTagsSegment,
} from '@/app/(queries)/build-filters/segments/limit-by-build-tags'
import { limitByFavorited } from '@/app/(queries)/build-filters/segments/limit-by-favorited'
import { limitByPatchAffected } from '@/app/(queries)/build-filters/segments/limit-by-patch-affected'
import { limitByReferenceLink } from '@/app/(queries)/build-filters/segments/limit-by-reference-link'
import { limitByReleasesSegment } from '@/app/(queries)/build-filters/segments/limit-by-release'
import {
  limitByRingsSegment,
  ringsFilterToIds,
} from '@/app/(queries)/build-filters/segments/limit-by-rings'
import { limitByTimeConditionSegment } from '@/app/(queries)/build-filters/segments/limit-by-time-condition'
import { limitToBuildsWithVideo } from '@/app/(queries)/build-filters/segments/limit-by-video'
import {
  limitByWeaponsSegment,
  weaponFiltersToIds,
} from '@/app/(queries)/build-filters/segments/limit-by-weapons'
import { getServerSession } from '@/features/auth/lib'
import { DBBuild } from '@/features/build/types'
import { prisma } from '@/features/db'
import { PaginationResponse } from '@/features/pagination/usePagination'
import { bigIntFix } from '@/lib/bigIntFix'

export async function getFavoritedBuilds({
  buildListFilters,
  itemsPerPage,
  orderBy,
  pageNumber,
  timeRange,
}: {
  buildListFilters: BuildListFilters
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
    rings,
    searchText,
    releases,
    patchAffected,
    withVideo,
    withReference,
  } = buildListFilters

  if (releases.length === 0) return { items: [], totalItemCount: 0 }

  const archetypeIds = archetypeFiltersToIds({ archetypes })
  const weaponIds = weaponFiltersToIds({
    longGun,
    handGun,
    melee,
  })
  const tagValues = buildTagsFilterToValues(buildTags)
  const amuletId = amuletFilterToId({ amulet })
  const ringIds = ringsFilterToIds({ rings })

  const whereConditions = Prisma.sql`
WHERE Build.isPublic = true
AND Build.createdById != ${userId}
${limitByAmuletSegment(amuletId)}
${limitByArchetypesSegment(archetypeIds)}
${limitByBuildTagsSegment(tagValues)}
${limitByReleasesSegment(releases)}
${limitByRingsSegment(ringIds)}
${limitByTimeConditionSegment(timeRange)}
${limitByWeaponsSegment(weaponIds)}
${limitByReferenceLink(withReference)}
${limitToBuildsWithVideo(withVideo)}
${limitByPatchAffected(patchAffected)}
${limitByFavorited(userId)}
`

  const orderBySegment = getOrderBySegment(orderBy)

  const trimmedSearchText = searchText.trim()

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