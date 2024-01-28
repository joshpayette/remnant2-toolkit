'use server'

import { PaginationResponse } from '@/features/pagination/hooks/usePagination'
import { getServerSession } from '@/features/auth/lib'
import { DBBuild } from '@/features/build/types'
import { prisma } from '@/features/db'
import { Prisma } from '@prisma/client'
import { DEFAULT_DISPLAY_NAME } from '@/features/profile/constants'
import { bigIntFix } from '@/lib/bigIntFix'
import {
  ByReleaseFilters,
  SortFilter,
} from '@/app/community-builds/by-release/page'
import {
  archtypeFiltersToIds,
  limitByArchtypesSegment,
} from '@/features/filters/queries/segments/limitByArchtypes'
import {
  limitByWeaponsSegment,
  weaponFiltersToIds,
} from '@/features/filters/queries/segments/limitByWeapons'
import {
  communityBuildsCountQuery,
  communityBuildsQuery,
} from '@/features/filters/queries/community-builds'
import { limitByReleasesSegment } from '@/features/filters/queries/segments/limitByRelease'

export async function getBuildsByRelease({
  sortFilter,
  itemsPerPage,
  pageNumber,
  byReleaseFilters,
}: {
  sortFilter: SortFilter
  itemsPerPage: number
  pageNumber: number
  byReleaseFilters: ByReleaseFilters
}): Promise<PaginationResponse<DBBuild>> {
  const session = await getServerSession()
  const userId = session?.user?.id

  const { archtypes, longGun, handGun, melee, selectedReleases } =
    byReleaseFilters

  if (selectedReleases.length === 0) return { items: [], totalItemCount: 0 }

  const archtypeIds = archtypeFiltersToIds({ archtypes })
  const weaponIds = weaponFiltersToIds({ longGun, handGun, melee })

  const whereConditions = Prisma.sql`
  WHERE Build.isPublic = true
  ${limitByArchtypesSegment(archtypeIds)}
  ${limitByWeaponsSegment(weaponIds)}
  ${limitByReleasesSegment(selectedReleases)}
  `

  const orderBySegment =
    sortFilter === 'date created'
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
  const totalBuildCount = totalBuildCountResponse[0].totalBuildCount

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
    totalUpvotes: build.totalUpvotes,
    reported: build.reported,
    isMember: build.isPaidUser,
    createdByDisplayName:
      build.createdByDisplayName || build.createdByName || DEFAULT_DISPLAY_NAME,
    upvoted: build.upvoted,
    buildItems: [],
  }))

  return bigIntFix({
    items: returnedBuilds,
    totalItemCount: totalBuildCount,
  })
}
