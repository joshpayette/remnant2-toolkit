'use server'

import { PaginationResponse } from '@/features/pagination/usePagination'
import { prisma } from '@/features/db'
import { DBBuild } from '@/features/build/types'
import { Prisma, User, UserProfile } from '@prisma/client'
import { bigIntFix } from '@/lib/bigIntFix'
import { ErrorResponse } from '@/features/error-handling/types'
import {
  BuildListFilterFields,
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
import { limitByReleasesSegment } from '@/features/filters/queries/segments/limitByRelease'
import { limitByTimeConditionSegment } from '@/features/filters/queries/segments/limitByTimeCondition'
import {
  communityBuildsCountQuery,
  communityBuildsQuery,
} from '@/features/filters/queries/community-builds'
import getOrderBySegment from '@/features/filters/queries/segments/getOrderBySegment'

export async function getProfile(userId: string): Promise<
  | ErrorResponse
  | {
      message: string
      user: User
      profile: UserProfile
    }
> {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  })

  if (!user) {
    return {
      errors: [`User with id ${userId} not found`],
    }
  }

  let profile = await prisma.userProfile.findUnique({
    where: {
      userId,
    },
  })

  if (!profile) {
    // create a new profile
    profile = await prisma.userProfile.create({
      data: {
        userId,
        bio: '',
      },
    })
  }

  return {
    message: 'User found',
    user,
    profile,
  }
}

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

  const { archetypes, longGun, handGun, melee, selectedReleases } =
    buildListFilters
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

  const whereConditions = Prisma.sql`
  WHERE Build.isPublic = true
  AND Build.createdById = ${userId}
  ${limitByArchetypesSegment(archetypeIds)}
  ${limitByWeaponsSegment(weaponIds)}
  ${limitByReleasesSegment(selectedReleases)}
  ${limitByTimeConditionSegment(timeRange)}
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
    user,
  })
}
