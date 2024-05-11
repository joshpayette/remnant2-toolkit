'use server'

import { Prisma } from '@prisma/client'

import { BuildVisibility } from '@/app/(components)/filters/builds/secondary-filters/build-visibility-filter/use-build-visibility-filter'
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
import { limitByFeatured } from '@/app/(queries)/build-filters/segments/limit-by-featured'
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
import { bigIntFix } from '@/app/(utils)/big-int-fix'
import { prisma } from '@/app/(utils)/db'
import { PaginationResponse } from '@/app/(utils)/pagination/use-pagination'

export type CreatedBuildsFilter = 'date created' | 'upvotes'

export async function getCreatedBuilds({
  buildListFilters,
  buildVisibility = 'public',
  featuredBuildsOnly,
  isEditable,
  itemsPerPage,
  orderBy,
  pageNumber,
  timeRange,
  userId,
}: {
  buildListFilters: BuildListFilters
  buildVisibility?: BuildVisibility
  featuredBuildsOnly: boolean
  isEditable: boolean
  itemsPerPage: number
  orderBy: OrderBy
  pageNumber: number
  timeRange: TimeRange
  userId: string
}): Promise<PaginationResponse<DBBuild>> {
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
  const weaponIds = weaponFiltersToIds({
    longGun,
    handGun,
    melee,
  })
  const tagValues = buildTagsFilterToValues(buildTags)
  const amuletId = amuletFilterToId({ amulet })
  const ringIds = ringsFilterToIds({ rings })

  let isPublicSegment: Prisma.Sql = Prisma.empty

  // If the user is not the owner of the profile, only show public builds
  // If the user is the owner of the profile, show all builds based on buildVisibility filter
  if (!isEditable) {
    isPublicSegment = Prisma.sql`AND Build.isPublic = true`
  } else {
    if (buildVisibility === 'public') {
      isPublicSegment = Prisma.sql`AND Build.isPublic = true`
    } else if (buildVisibility === 'private') {
      isPublicSegment = Prisma.sql`AND Build.isPublic = false`
    } else {
      isPublicSegment = Prisma.empty
    }
  }

  const whereConditions = Prisma.sql`
  WHERE Build.createdById = ${userId}
  ${isPublicSegment}
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
  ${limitByFeatured(featuredBuildsOnly)}
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
