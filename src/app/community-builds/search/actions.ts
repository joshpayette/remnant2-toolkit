'use server'

import { PaginationResponse } from '@/app/(hooks)/usePagination'
import { getServerSession } from '@/app/(lib)/auth'
import { prisma } from '@/app/(lib)/db'
import { SearchFilters } from './page'
import { remnantItems } from '@/app/(data)'
import { DBBuild } from '@/app/(types)/build'
import { DEFAULT_DISPLAY_NAME } from '@/app/(data)/constants'

// Add linked mods to the itemIds
// Add linked skills to the itemIds
// Add core traits to the itemIds
function addLinkedItemIds(itemIds: string[]) {
  for (const itemId of itemIds) {
    const currentItem = remnantItems.find((item) => item.id === itemId)

    if (currentItem?.linkedItems?.mod) {
      const modItem = remnantItems.find(
        (item) => item.name === currentItem.linkedItems?.mod?.name,
      )
      if (!modItem) {
        console.error(`Could not find mod item for ${currentItem.name}`)
        continue
      }
      itemIds.push(modItem.id)
    }

    if (currentItem?.linkedItems?.skills) {
      for (const skill of currentItem.linkedItems.skills) {
        const skillItem = remnantItems.find((item) => item.name === skill.name)
        if (!skillItem) {
          console.error(`Could not find skill item for ${currentItem.name}`)
          continue
        }
        itemIds.push(skillItem.id)
      }
    }

    if (currentItem?.linkedItems?.traits) {
      for (const trait of currentItem.linkedItems.traits) {
        const traitItem = remnantItems.find((item) => item.name === trait.name)
        if (!traitItem) {
          console.error(`Could not find trait item for ${currentItem.name}`)
          continue
        }
        itemIds.push(traitItem.id)
      }
    }
  }

  return itemIds
}

export async function getBuilds({
  itemsPerPage,
  pageNumber,
  searchFilters,
  discoveredItemIds,
}: {
  itemsPerPage: number
  pageNumber: number
  searchFilters: SearchFilters
  discoveredItemIds: string[]
}): Promise<PaginationResponse<DBBuild>> {
  const session = await getServerSession()
  const userId = session?.user?.id

  if (discoveredItemIds.length === 0 && searchFilters.ownedItemsOnly) {
    return { items: [], totalItemCount: 0 }
  }

  // TOD REmove

  if (!searchFilters.ownedItemsOnly) {
    return { items: [], totalItemCount: 0 }
  }

  // Don't allow a user to search by owned items if they're not logged in
  if (searchFilters.ownedItemsOnly && !userId) {
    return { items: [], totalItemCount: 0 }
  }

  if (searchFilters.ownedItemsOnly && userId) {
    // delete all user's items first
    await prisma.userItems.deleteMany({
      where: { userId },
    })
    // insert all user's items
    await prisma.userItems.createMany({
      data: addLinkedItemIds(discoveredItemIds).map((itemId) => ({
        userId,
        itemId,
      })),
    })
  }

  const builds = (await prisma.$queryRaw`
  SELECT 
    Build.*, 
    User.displayName as createdByDisplayName,
    User.name as createdByName,
    COUNT(BuildVoteCounts.id) as totalUpvotes,
    COUNT(BuildReports.id) as totalReports,
    CASE WHEN EXISTS (
      SELECT 1
      FROM BuildReports
      WHERE BuildReports.buildId = Build.id
      AND BuildReports.userId = ${userId}
    ) THEN TRUE ELSE FALSE END as reported,
    CASE WHEN EXISTS (
      SELECT 1
      FROM BuildVoteCounts
      WHERE BuildVoteCounts.buildId = Build.id
      AND BuildVoteCounts.userId = ${userId}
    ) THEN TRUE ELSE FALSE END as upvoted
  FROM Build
  LEFT JOIN User ON Build.createdById = User.id
  LEFT JOIN BuildVoteCounts ON Build.id = BuildVoteCounts.buildId
  LEFT JOIN BuildReports ON Build.id = BuildReports.buildId
  WHERE Build.isPublic = true
  AND NOT EXISTS (
      SELECT 1
      FROM BuildItems
      LEFT JOIN UserItems
          ON  BuildItems.itemId = UserItems.itemId 
          AND UserItems.userId = ${userId}
      WHERE BuildItems.buildId = Build.id
      AND nullif(BuildItems.itemId,'') IS NOT NULL
      AND UserItems.itemId IS NULL
  )
  GROUP BY Build.id, User.displayName, User.name
  ORDER BY totalUpvotes DESC
  LIMIT ${itemsPerPage}
  OFFSET ${(pageNumber - 1) * itemsPerPage}
`) as Array<
    DBBuild & {
      createdByDisplayName: string
      createdByName: string
      reported: boolean
      totalUpvotes: number
      totalReports: number
      upvoted: boolean
      displayName: string
      name: string
    }
  >

  const buildItems = await prisma.buildItems.findMany({
    where: {
      buildId: {
        in: builds.map((build) => build.id),
      },
    },
  })

  console.info('------------------- Builds -------------------', builds)

  if (!builds) {
    console.info('No builds found')
    return { items: [], totalItemCount: 0 }
  }

  const totalBuilds = (await prisma.$queryRaw`
  SELECT 
    COUNT(DISTINCT Build.id) as totalBuildCount
  FROM Build
  LEFT JOIN User ON Build.createdById = User.id
  LEFT JOIN BuildVoteCounts ON Build.id = BuildVoteCounts.buildId
  LEFT JOIN BuildReports ON Build.id = BuildReports.buildId
  WHERE Build.isPublic = true
  AND NOT EXISTS (
      SELECT 1
      FROM BuildItems
      LEFT JOIN UserItems
          ON  BuildItems.itemId = UserItems.itemId 
          AND UserItems.userId = ${userId}
      WHERE BuildItems.buildId = Build.id
      AND nullif(BuildItems.itemId,'') IS NOT NULL
      AND UserItems.itemId IS NULL
  )
`) as { totalBuildCount: number }

  const returnedBuilds: DBBuild[] = builds.map((build) => ({
    id: build.id,
    name: build.name,
    description: build.description,
    isPublic: build.isPublic,
    isFeaturedBuild: build.isFeaturedBuild,
    thumbnailUrl: build.thumbnailUrl,
    createdById: build.createdById,
    createdAt: build.createdAt,
    totalUpvotes: build.totalUpvotes,
    reported: build.reported,
    isMember: false,
    createdByDisplayName:
      build.createdByDisplayName || build.createdByName || DEFAULT_DISPLAY_NAME,
    upvoted: build.upvoted,
    buildItems,
  }))

  return { items: returnedBuilds, totalItemCount: totalBuilds.totalBuildCount }
}
