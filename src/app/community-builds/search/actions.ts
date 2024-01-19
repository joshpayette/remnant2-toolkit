'use server'

import { PaginationResponse } from '@/app/(hooks)/usePagination'
import { getServerSession } from '@/app/(lib)/auth'
import { prisma } from '@/app/(lib)/db'
import { SearchFilters } from './page'
import { remnantItems } from '@/app/(data)'
import { DBBuild } from '@/app/(types)/build'
import { DEFAULT_DISPLAY_NAME } from '@/app/(data)/constants'
import {
  getUserOwnedBuilds,
  getUserOwnedBuildsCount,
} from '@/app/(queries)/userOwnedBuilds'
import {
  getDLCSpecificBuilds,
  getDLCSpecificBuildsCount,
} from '@/app/(queries)/dlcSpecificBuilds'
import { bigIntFix } from '@/app/(lib)/utils'

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

  // If the user has not selected any items, return an empty array
  if (discoveredItemIds.length === 0 && searchFilters.ownedItemsOnly) {
    return { items: [], totalItemCount: 0 }
  }

  // Don't allow a user to search by owned items if they're not logged in
  if (searchFilters.ownedItemsOnly && !userId) {
    return { items: [], totalItemCount: 0 }
  }

  // If no dlc items are selected, and  ownedItemsOnly is not checked, return nothing
  if (
    searchFilters.specificDLCItemsOnly.length === 0 &&
    !searchFilters.ownedItemsOnly
  ) {
    return { items: [], totalItemCount: 0 }
  }

  // --------------------------------------------
  // Return all builds that the user owns
  // --------------------------------------------

  if (searchFilters.ownedItemsOnly && userId) {
    const builds = await getUserOwnedBuilds({
      userId,
      itemsPerPage,
      pageNumber,
    })
    const totalBuilds = await getUserOwnedBuildsCount({ userId })
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

    return {
      items: bigIntFix(returnedBuilds),
      totalItemCount: totalBuildCount,
    }
  }

  // --------------------------------------------
  // Return all builds that contain the selected DLC items
  // --------------------------------------------

  if (searchFilters.specificDLCItemsOnly.length > 0) {
    const builds = await getDLCSpecificBuilds({
      itemsPerPage,
      pageNumber,
      specifiedDLCItems: searchFilters.specificDLCItemsOnly,
    })
    const totalBuilds = await getDLCSpecificBuildsCount({
      specifiedDLCItems: searchFilters.specificDLCItemsOnly,
    })
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

    return {
      items: bigIntFix(returnedBuilds),
      totalItemCount: totalBuildCount,
    }
  }

  // --------------------------------------------
  // Return all public builds
  // --------------------------------------------

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
    totalUpvotes: build.BuildVotes.length, // Count the votes
    upvoted: build.BuildVotes.some((vote) => vote.userId === userId), // Check if the user upvoted the build
    reported: build.BuildReports.some((report) => report.userId === userId), // Check if the user reported the build
    buildItems: build.BuildItems,
  }))

  return { items: bigIntFix(returnedBuilds), totalItemCount: totalBuildCount }
}
