'use server'

import { PaginationResponse } from '@/features/pagination/usePagination'
import { getServerSession } from '@/features/auth/lib'
import { DBBuild } from '@/features/build/types'
import { prisma } from '@/features/db'
import { bigIntFix } from '@/lib/bigIntFix'
import { SortFilter } from '@/app/community-builds/by-collection/page'
import { CommunityBuildFilterProps } from '@/features/filters/types'
import {
  archtypeFiltersToIds,
  limitByArchtypesSegment,
} from '@/features/filters/queries/segments/limitByArchtypes'
import {
  limitByWeaponsSegment,
  weaponFiltersToIds,
} from '@/features/filters/queries/segments/limitByWeapons'
import {
  collectionToIds,
  limitByCollectionSegment,
} from '@/features/filters/queries/segments/limitByCollection'
import { Prisma } from '@prisma/client'
import {
  communityBuildsCountQuery,
  communityBuildsQuery,
} from '@/features/filters/queries/community-builds'
import { limitByReleasesSegment } from '@/features/filters/queries/segments/limitByRelease'

export async function getBuildsByCollection({
  itemsPerPage,
  pageNumber,
  sortFilter,
  discoveredItemIds,
  communityBuildFilters,
}: {
  itemsPerPage: number
  pageNumber: number
  sortFilter: SortFilter
  discoveredItemIds: string[]
  communityBuildFilters: CommunityBuildFilterProps
}): Promise<PaginationResponse<DBBuild>> {
  const session = await getServerSession()
  const userId = session?.user?.id

  if (!userId) return { items: [], totalItemCount: 0 }

  // if the user has no discoveredItemIds, return an empty array
  if (discoveredItemIds.length === 0) {
    return { items: [], totalItemCount: 0 }
  }

  // -----------------------------------
  // Update user's items
  //
  // We need to store the itemIds in a separate table
  // so we can query them efficiently
  // -----------------------------------

  // delete all user's items first
  await prisma.userItems.deleteMany({
    where: { userId },
  })

  const allOwnedItemIds = collectionToIds({ discoveredItemIds })

  // insert all user's items, including linked items
  await prisma.userItems.createMany({
    data: allOwnedItemIds.map((itemId) => ({
      userId,
      itemId,
    })),
  })

  const { archtypes, longGun, handGun, melee, selectedReleases } =
    communityBuildFilters
  const archtypeIds = archtypeFiltersToIds({ archtypes })
  const weaponIds = weaponFiltersToIds({ longGun, handGun, melee })

  if (selectedReleases.length === 0) return { items: [], totalItemCount: 0 }

  const whereConditions = Prisma.sql`
  WHERE Build.isPublic = true
  ${limitByArchtypesSegment(archtypeIds)}
  ${limitByWeaponsSegment(weaponIds)}
  ${limitByReleasesSegment(selectedReleases)}
  ${limitByCollectionSegment({ userId, allOwnedItemIds })}
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
