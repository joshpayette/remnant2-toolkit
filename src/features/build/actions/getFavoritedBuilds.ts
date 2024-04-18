'use server'

import { Prisma } from '@prisma/client'

import { getServerSession } from '@/features/auth/lib'
import {
  communityBuildsCountQuery,
  communityBuildsQuery,
} from '@/features/build/filters/queries/community-builds'
import { getOrderBySegment } from '@/features/build/filters/queries/segments/getOrderBySegment'
import {
  amuletFilterToId,
  limitByAmuletSegment,
} from '@/features/build/filters/queries/segments/limitByAmulet'
import {
  archetypeFiltersToIds,
  limitByArchetypesSegment,
} from '@/features/build/filters/queries/segments/limitByArchtypes'
import {
  buildTagsFilterToValues,
  limitByBuildTagsSegment,
} from '@/features/build/filters/queries/segments/limitByBuildTags'
import { limitByFavorited } from '@/features/build/filters/queries/segments/limitByFavorited'
import { limitByPatchAffected } from '@/features/build/filters/queries/segments/limitByPatchAffected'
import { limitByReleasesSegment } from '@/features/build/filters/queries/segments/limitByRelease'
import {
  limitByRingsSegment,
  ringsFilterToIds,
} from '@/features/build/filters/queries/segments/limitByRings'
import { limitByTimeConditionSegment } from '@/features/build/filters/queries/segments/limitByTimeCondition'
import {
  limitByWeaponsSegment,
  weaponFiltersToIds,
} from '@/features/build/filters/queries/segments/limitByWeapons'
import { limitToBuildsWithReferenceLink } from '@/features/build/filters/queries/segments/limitToBuildsWithReferenceLink'
import { limitToBuildsWithVideo } from '@/features/build/filters/queries/segments/limitToBuildsWithVideo'
import {
  BuildListFilterFields,
  OrderBy,
  TimeRange,
} from '@/features/build/filters/types'
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
    limitToBuildsWithReferenceLink: onlyBuildsWithReferenceLink,
    limitToBuildsWithVideo: onlyBuildsWithVideo,
  } = buildListFilters

  if (selectedReleases.length === 0) return { items: [], totalItemCount: 0 }

  const archetypeIds = archetypeFiltersToIds({ archetypes })
  const weaponIds = weaponFiltersToIds({
    longGun,
    handGun,
    melee,
  })
  const tagValues = buildTagsFilterToValues(buildTags)
  const amuletId = amuletFilterToId({ amulet })
  const ringIds = ringsFilterToIds({ rings: [ring1, ring2, ring3, ring4] })

  const whereConditions = Prisma.sql`
WHERE Build.isPublic = true
AND Build.createdById != ${userId}
${limitByPatchAffected(includePatchAffectedBuilds)}
${limitToBuildsWithReferenceLink(onlyBuildsWithReferenceLink)}
${limitToBuildsWithVideo(onlyBuildsWithVideo)}
${limitByFavorited(userId)}
${limitByArchetypesSegment(archetypeIds)}
${limitByWeaponsSegment(weaponIds)}
${limitByAmuletSegment(amuletId)}
${limitByRingsSegment(ringIds)}
${limitByReleasesSegment(selectedReleases)}
${limitByBuildTagsSegment(tagValues)}
${limitByTimeConditionSegment(timeRange)}
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
