'use server'

import { prisma } from '@/features/db'
import { Prisma } from '@prisma/client'
import { bigIntFix } from '@/lib/bigIntFix'
import { DBBuild } from '../types'
import { PaginationResponse } from '@/features/pagination/usePagination'
import { getServerSession } from '@/features/auth/lib'
import {
  archetypeFiltersToIds,
  limitByArchetypesSegment,
} from '@/features/filters/queries/segments/limitByArchtypes'
import {
  communityBuildsCountQuery,
  communityBuildsQuery,
} from '@/features/filters/queries/community-builds'
import {
  limitByWeaponsSegment,
  weaponFiltersToIds,
} from '@/features/filters/queries/segments/limitByWeapons'
import { CommunityBuildFilterProps } from '@/features/filters/types'
import { SortFilter } from '../../../app/creator-builds/FeaturedBuilds'
import { limitByReleasesSegment } from '@/features/filters/queries/segments/limitByRelease'

export async function getFeaturedBuilds({
  itemsPerPage,
  pageNumber,
  sortFilter,
  communityBuildFilters,
}: {
  itemsPerPage: number
  pageNumber: number
  sortFilter: SortFilter
  communityBuildFilters: CommunityBuildFilterProps
}): Promise<PaginationResponse<DBBuild>> {
  const session = await getServerSession()
  const userId = session?.user?.id

  const { archetypes, longGun, handGun, melee, selectedReleases } =
    communityBuildFilters
  const archetypeIds = archetypeFiltersToIds({ archetypes })
  const weaponIds = weaponFiltersToIds({ longGun, handGun, melee })

  if (selectedReleases.length === 0) return { items: [], totalItemCount: 0 }

  const whereConditions = Prisma.sql`
  WHERE Build.isPublic = true
  ${limitByArchetypesSegment(archetypeIds)}
  ${limitByWeaponsSegment(weaponIds)}
  ${limitByReleasesSegment(selectedReleases)}
  AND Build.isFeaturedBuild = true
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
  const totalBuilds = totalBuildCountResponse[0].totalBuildCount

  // Find all build items for each build
  for (const build of builds) {
    const buildItems = await prisma.buildItems.findMany({
      where: { buildId: build.id },
    })
    build.buildItems = buildItems
  }

  return bigIntFix({ items: builds, totalItemCount: totalBuilds })
}
