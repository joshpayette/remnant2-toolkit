'use server'

import { PaginationResponse } from '@/app/(hooks)/usePagination'
import { getServerSession } from '@/app/(lib)/auth'
import { prisma } from '@/app/(lib)/db'
import { SearchFilters } from './page'
import { remnantItems } from '@/app/(data)'
import {
  DBBuild,
  SearchBuildResponse,
  SearchBuildTotalCount,
} from '@/app/(types)/build'
import { DEFAULT_DISPLAY_NAME } from '@/app/(data)/constants'
import {
  getUserOwnedBuilds,
  getUserOwnedBuildsCount,
} from '@/app/(queries)/userOwnedBuilds'
import { BuildItems } from '@prisma/client'

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

  // If the user has not selected any items, return an empty array
  if (discoveredItemIds.length === 0 && searchFilters.ownedItemsOnly) {
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

  // Return all builds the user owns
  // Not allowed if the user is not signed in
  if (searchFilters.ownedItemsOnly && userId) {
    const builds = await getUserOwnedBuilds({
      userId,
      itemsPerPage,
      pageNumber,
    })
    const totalBuilds = await getUserOwnedBuildsCount({ userId })
    const buildItems = await prisma.buildItems.findMany({
      where: {
        buildId: {
          in: builds.map((build) => build.id),
        },
      },
    })
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
      createdById: build.createdById,
      createdAt: build.createdAt,
      totalUpvotes: build.totalUpvotes,
      reported: build.reported,
      isMember: false,
      createdByDisplayName:
        build.createdByDisplayName ||
        build.createdByName ||
        DEFAULT_DISPLAY_NAME,
      upvoted: build.upvoted,
      buildItems,
    }))

    return {
      items: returnedBuilds,
      totalItemCount: totalBuilds.totalBuildCount,
    }
  }

  if (searchFilters.specificDLCItemsOnly) {
    const builds = await prisma.item.findMany({})
  }

  // Return all public builds

  const builds = await prisma.build.findMany({
    where: {
      isPublic: true,
    },
    include: {
      createdBy: true,
      BuildItems: true,
      BuildReports: true,
      BuildVotes: true,
    },
    skip: itemsPerPage * (pageNumber - 1),
    take: itemsPerPage,
  })

  const totalBuildCount = await prisma.build.count({
    where: {
      isPublic: true,
    },
  })

  const returnedBuilds: DBBuild[] = builds.map((build) => ({
    id: build.id,
    name: build.name,
    description: build.description,
    isPublic: build.isPublic,
    isFeaturedBuild: build.isFeaturedBuild,
    isMember: false,
    createdById: build.createdById,
    createdAt: build.createdAt,
    thumbnailUrl: build.thumbnailUrl,
    createdByDisplayName:
      build.createdBy?.displayName ||
      build.createdBy?.name ||
      DEFAULT_DISPLAY_NAME,
    totalUpvotes: build.BuildVotes.length.toString(), // Count the votes
    upvoted: build.BuildVotes.some((vote) => vote.userId === userId), // Check if the user upvoted the build
    reported: build.BuildReports.some((report) => report.userId === userId), // Check if the user reported the build
    buildItems: build.BuildItems,
  }))

  return { items: returnedBuilds, totalItemCount: totalBuildCount }
}
