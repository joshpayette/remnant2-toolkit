'use server'

import { DEFAULT_DISPLAY_NAME } from '@/app/(data)/constants'
import { PaginationResponse } from '@/app/(hooks)/usePagination'
import { getServerSession } from '@/app/(lib)/auth'
import { prisma } from '@/app/(lib)/db'
import { SearchFilters } from './page'
import { remnantItems } from '@/app/(data)'
import { DBBuild } from '@/app/(types)/build'
import getBuildsByOwnedItems from '@/app/(queries)/getBuildsByOwnedItems'

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

  const query = getBuildsByOwnedItems(userId as string)

  const builds = (await query) as any[]

  console.info('------------------- Builds -------------------', builds)

  if (!builds) {
    console.info('No builds found')
    return { items: [], totalItemCount: 0 }
  }
  // const totalBuildCount = builds.length

  // const returnedBuilds: DBBuild[] = builds.map((build) => ({
  //   ...build,
  //   createdByDisplayName:
  //     build.createdBy?.displayName ||
  //     build.createdBy?.name ||
  //     DEFAULT_DISPLAY_NAME,
  //   totalUpvotes: build.BuildVotes.length, // Count the votes
  //   upvoted: build.BuildVotes.some((vote) => vote.userId === userId), // Check if the user upvoted the build
  //   reported: build.BuildReports.some((report) => report.userId === userId), // Check if the user reported the build
  //   isMember: false,
  //   buildItems: build.BuildItems,
  // }))

  // return { items: returnedBuilds, totalItemCount: totalBuildCount }
  return { items: [], totalItemCount: 0 }
}
