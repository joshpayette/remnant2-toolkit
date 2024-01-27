'use server'

import { PaginationResponse } from '@/features/pagination/hooks/usePagination'
import { getServerSession } from '@/features/auth/lib'
import {
  DBBuild,
  CommunityBuildQueryResponse,
  CommunityBuildTotalCount,
} from '@/features/build/types'
import { prisma } from '@/features/db'
import { DEFAULT_DISPLAY_NAME } from '@/features/profile/constants'
import { remnantItems } from '@/features/items/data'
import { bigIntFix } from '@/lib/bigIntFix'

/**
 * Takes a list of itemIds and adds any linked items to the list
 */
function addLinkedItemIds(itemIds: string[]): string[] {
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
  discoveredItemIds,
}: {
  itemsPerPage: number
  pageNumber: number
  discoveredItemIds: string[]
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

  const linkedItemIds = addLinkedItemIds(discoveredItemIds)

  // Add all concoctions and consumables to the user's items
  // so we can query them efficiently
  // This is necessary because these categories are omitted from
  // the item tracker
  const consumableItemIds = remnantItems
    .filter((item) => item.category === 'consumable')
    .map((item) => item.id)
  const concoctionItemIds = remnantItems
    .filter((item) => item.category === 'concoction')
    .map((item) => item.id)
  const perkItemIds = remnantItems
    .filter((item) => item.category === 'perk')
    .map((item) => item.id)

  const allOwnedItemIds = [
    ...linkedItemIds,
    ...consumableItemIds,
    ...concoctionItemIds,
    ...perkItemIds,
  ]

  // insert all user's items, including linked items
  await prisma.userItems.createMany({
    data: allOwnedItemIds.map((itemId) => ({
      userId,
      itemId,
    })),
  })

  // --------------------------------------------
  // Return all builds that the user owns
  // --------------------------------------------

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
    ) THEN TRUE ELSE FALSE END as upvoted,
    CASE WHEN PaidUsers.userId IS NOT NULL THEN true ELSE false END as isPaidUser
  FROM Build
  LEFT JOIN User ON Build.createdById = User.id
  LEFT JOIN BuildVoteCounts ON Build.id = BuildVoteCounts.buildId
  LEFT JOIN BuildReports on Build.id = BuildReports.buildId AND BuildReports.userId = ${userId}
  LEFT JOIN PaidUsers on User.id = PaidUsers.userId
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
`) as CommunityBuildQueryResponse

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
`) as CommunityBuildTotalCount
  const totalBuildCount = totalBuilds[0].totalBuildCount

  if (!builds) {
    console.info('No builds found')
    return { items: [], totalItemCount: 0 }
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

  // Add the buildItems to each build
  for (const build of returnedBuilds) {
    const buildItems = await prisma.buildItems.findMany({
      where: {
        buildId: build.id,
      },
    })
    build.buildItems = buildItems
  }

  return bigIntFix({
    items: returnedBuilds,
    totalItemCount: totalBuildCount,
  })
}
