'use server'

import { Prisma, User } from '@prisma/client'

import {
  communityBuildsCountQuery,
  communityBuildsQuery,
} from '@/features/build/filters/queries/community-builds'
import { getOrderBySegment } from '@/features/build/filters/queries/segments/getOrderBySegment'
import {
  archetypeFiltersToIds,
  limitByArchetypesSegment,
} from '@/features/build/filters/queries/segments/limitByArchtypes'
import {
  buildTagsFilterToValues,
  limitByBuildTagsSegment,
} from '@/features/build/filters/queries/segments/limitByBuildTags'
import { limitByPatchAffected } from '@/features/build/filters/queries/segments/limitByPatchAffected'
import { limitByReleasesSegment } from '@/features/build/filters/queries/segments/limitByRelease'
import { limitByTimeConditionSegment } from '@/features/build/filters/queries/segments/limitByTimeCondition'
import {
  limitByWeaponsSegment,
  weaponFiltersToIds,
} from '@/features/build/filters/queries/segments/limitByWeapons'
import {
  BuildListFilterFields,
  OrderBy,
  TimeRange,
} from '@/features/build/filters/types'
import { DBBuild } from '@/features/build/types'
import { prisma } from '@/features/db'
import { PaginationResponse } from '@/features/pagination/usePagination'
import { bigIntFix } from '@/lib/bigIntFix'

export type BuildsFilter = 'date created' | 'upvotes'

export async function getUserProfilePage({
  buildListFilters,
  itemsPerPage,
  orderBy,
  pageNumber,
  timeRange,
  userId,
}: {
  buildListFilters: BuildListFilterFields
  itemsPerPage: number
  orderBy: OrderBy
  pageNumber: number
  timeRange: TimeRange
  userId: string
}): Promise<PaginationResponse<DBBuild> & { user: User | null }> {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      PaidUsers: true, // Include the related PaidUsers record
      UserProfile: true,
    },
  })

  if (!user) {
    return {
      items: [],
      totalItemCount: 0,
      user: null,
    }
  }

  const {
    archetypes,
    buildTags,
    longGun,
    handGun,
    melee,
    selectedReleases,
    searchText,
    includePatchAffectedBuilds,
  } = buildListFilters
  const archetypeIds = archetypeFiltersToIds({ archetypes })

  if (selectedReleases.length === 0)
    return {
      items: [],
      totalItemCount: 0,
      user: null,
    }

  const weaponIds = weaponFiltersToIds({
    longGun,
    handGun,
    melee,
  })

  const tagValues = buildTagsFilterToValues(buildTags)

  const whereConditions = Prisma.sql`
  WHERE Build.isPublic = true
  AND Build.createdById = ${userId}
  ${limitByPatchAffected(includePatchAffectedBuilds)}
  ${limitByArchetypesSegment(archetypeIds)}
  ${limitByWeaponsSegment(weaponIds)}
  ${limitByReleasesSegment(selectedReleases)}
  ${limitByTimeConditionSegment(timeRange)}
  ${limitByBuildTagsSegment(tagValues)}
  `

  const orderBySegment = getOrderBySegment(orderBy)

  const trimmedSearchText = searchText

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
    user,
  })
}
