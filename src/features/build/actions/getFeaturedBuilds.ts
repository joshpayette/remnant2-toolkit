'use server'

import { prisma } from '@/features/db'
import { Build, BuildItems, Prisma } from '@prisma/client'
import { DEFAULT_DISPLAY_NAME } from '@/features/profile/constants'
import { remnantItems } from '@/features/items/data'
import { bigIntFix } from '@/lib/bigIntFix'
import { Archtype } from '@/features/items/types'
import { CommunityBuildFilterProps } from '@/features/build/components/CommunityBuildFilters'
import { DBBuild } from '../types'
import { PaginationResponse } from '@/features/pagination/hooks/usePagination'
import { getServerSession } from '@/features/auth/lib'
import {
  archtypeFiltersToIds,
  limitByArchtypesSegment,
} from '@/features/filters/queries/segments/limitByArchtypes'
import {
  communityBuildsCountQuery,
  communityBuildsQuery,
} from '@/features/filters/queries/community-builds'
import {
  limitByWeaponsSegment,
  weaponFiltersToIds,
} from '@/features/filters/queries/segments/limitByWeapons'

export type FeaturedBuildsFilter = 'date created' | 'upvotes'

export async function getFeaturedBuilds({
  itemsPerPage,
  pageNumber,
  filter,
  communityBuildFilters,
}: {
  itemsPerPage: number
  pageNumber: number
  filter: FeaturedBuildsFilter
  communityBuildFilters: CommunityBuildFilterProps
}): Promise<PaginationResponse<DBBuild>> {
  const session = await getServerSession()
  const userId = session?.user?.id

  const { archtypes, longGun, handGun, melee } = communityBuildFilters
  const archtypeIds = archtypeFiltersToIds({ archtypes })

  const weaponIds = weaponFiltersToIds({ longGun, handGun, melee })

  const whereConditions = Prisma.sql`
  WHERE Build.isPublic = true
  ${limitByArchtypesSegment(archtypeIds)}
  ${limitByWeaponsSegment(weaponIds)}
  AND Build.isFeaturedBuild = true
  `

  const orderBySegment =
    filter === 'date created'
      ? Prisma.sql`
  ORDER BY Build.createdAt DESC
  `
      : Prisma.sql`
  ORDER BY totalUpvotes DESC
  `

  const builds = await communityBuildsQuery({
    userId,
    itemsPerPage,
    pageNumber,
    orderBySegment,
    whereConditions,
  })

  if (!builds) return { items: [], totalItemCount: 0 }

  const totalBuildCountResponse = await communityBuildsCountQuery({
    whereConditions,
  })
  const totalBuilds = totalBuildCountResponse[0].totalBuildCount

  // Find all build items for each build
  for (const build of builds) {
    const buildItems = await prisma.buildItems.findMany({
      where: { buildId: build.id },
    })
    build.buildItems = buildItems
  }

  const returnedBuilds: DBBuild[] = builds.map((build) => ({
    id: build.id,
    name: build.name,
    description: build.description,
    isPublic: build.isPublic,
    isFeaturedBuild: build.isFeaturedBuild,
    thumbnailUrl: build.thumbnailUrl,
    videoUrl: build.videoUrl,
    createdById: build.createdById,
    createdAt: build.createdAt,
    updatedAt: build.updatedAt,
    createdByDisplayName:
      build.createdByDisplayName || build.createdByName || DEFAULT_DISPLAY_NAME,
    totalUpvotes: build.totalUpvotes,
    upvoted: build.upvoted,
    reported: build.reported,
    isMember: build.isPaidUser,
    buildItems: build.buildItems,
  }))

  return bigIntFix({ items: returnedBuilds, totalItemCount: totalBuilds })
}
