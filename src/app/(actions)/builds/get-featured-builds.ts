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
import { limitToBuildsWithMinDescription } from '@/app/(queries)/build-filters/segments/limit-by-min-description'
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
import { DBBuild } from '@/app/(types)/builds'
import { getServerSession } from '@/app/(utils)/auth'
import { bigIntFix } from '@/app/(utils)/big-int-fix'
import { prisma } from '@/app/(utils)/db'
import { PaginationResponse } from '@/app/(utils)/pagination/use-pagination'

export async function getFeaturedBuilds({
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
    withMinDescription,
  } = buildListFilters

  if (releases.length === 0) return { items: [], totalItemCount: 0 }

  const archetypeIds = archetypeFiltersToIds({ archetypes })
  const weaponIds = weaponFiltersToIds({ longGun, handGun, melee })
  const amuletId = amuletFilterToId({ amulet })
  const ringIds = ringsFilterToIds({ rings })
  const tagValues = buildTagsFilterToValues(buildTags)

  const whereConditions = Prisma.sql`
  WHERE Build.isPublic = true
  AND Build.isFeaturedBuild = true
  AND Build.isBeginnerBuild = false
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
  ${limitToBuildsWithMinDescription(withMinDescription)}
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
