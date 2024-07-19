'use server'

import { Prisma } from '@repo/db'
import { prisma } from '@repo/db'
import { bigIntFix } from '@repo/utils/big-int-fix'

import { OrderBy } from '@/app/(components)/filters/builds/secondary-filters/order-by-filter/use-order-by-filter'
import { TimeRange } from '@/app/(components)/filters/builds/secondary-filters/time-range-filter/use-time-range-filter'
import { BuildListFilters } from '@/app/(components)/filters/builds/types'
import { getServerSession } from '@/app/(features)/auth'
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
import { limitByPatchAffected } from '@/app/(queries)/build-filters/segments/limit-by-patch-affected'
import { limitToQualityBuilds } from '@/app/(queries)/build-filters/segments/limit-by-quality'
import { limitByReferenceLink } from '@/app/(queries)/build-filters/segments/limit-by-reference-link'
import { limitByReleasesSegment } from '@/app/(queries)/build-filters/segments/limit-by-release'
import {
  limitByRelicSegment,
  relicFilterToId,
} from '@/app/(queries)/build-filters/segments/limit-by-relic'
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
    relic,
    rings,
    searchText,
    releases,
    patchAffected,
    withVideo,
    withReference,
    // withQuality,
  } = buildListFilters

  // TODO Quality Builds
  const withQuality = false

  if (releases.length === 0) return { items: [], totalItemCount: 0 }

  const archetypeIds = archetypeFiltersToIds({ archetypes })
  const weaponIds = weaponFiltersToIds({ longGun, handGun, melee })
  const amuletId = amuletFilterToId({ amulet })
  const relicId = relicFilterToId({ relic })
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
  ${limitByRelicSegment(relicId)}
  ${limitByRingsSegment(ringIds)}
  ${limitByTimeConditionSegment(timeRange)}
  ${limitByWeaponsSegment(weaponIds)}
  ${limitByReferenceLink(withReference)}
  ${limitToBuildsWithVideo(withVideo)}
  ${limitByPatchAffected(patchAffected)}
  ${limitToQualityBuilds(withQuality)}
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

  const totalBuilds = totalBuildCountResponse[0]?.totalBuildCount ?? 0

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
