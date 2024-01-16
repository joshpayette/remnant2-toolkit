'use server'

import { DEFAULT_DISPLAY_NAME } from '@/app/(data)/constants'
import { PaginationResponse } from '@/app/(hooks)/usePagination'
import { getServerSession } from '@/app/(lib)/auth'
import { prisma } from '@/app/(lib)/db'
import { SearchFilters } from './page'
import { remnantItems } from '@/app/(data)'
import { DBBuild } from '@/app/(types)/build'

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

  let dlcItemIds: string[] = []
  if (searchFilters.specificDLCItemsOnly.length > 0) {
    for (const dlcItem of searchFilters.specificDLCItemsOnly) {
      const dlcItems = remnantItems.filter((item) => {
        // no dlc means basegame
        if (item.dlc === undefined && dlcItem === 'basegame') return true
        return item.dlc === dlcItem
      })
      dlcItemIds = [...dlcItemIds, ...dlcItems.map((item) => item.id)]
    }
  }

  // Determine which item ids to use
  let itemIds: string[] = []
  if (searchFilters.ownedItemsOnly) {
    itemIds = discoveredItemIds
  } else if (searchFilters.specificDLCItemsOnly.length > 0) {
    itemIds = dlcItemIds
  }

  if (itemIds.length === 0) {
    return { items: [], totalItemCount: 0 }
  }

  // Link items
  itemIds = addLinkedItemIds(itemIds)

  const whereClause = {
    isPublic: true,
    AND: [
      {
        BuildItems: {
          some: {
            AND: [
              {
                OR: [
                  { itemId: { equals: '' } },
                  ...itemIds.map((itemId) => ({ itemId: { equals: itemId } })),
                ],
              },
              { category: { equals: 'helm' } },
            ],
          },
        },
      },
      {
        BuildItems: {
          some: {
            AND: [
              {
                OR: [
                  { itemId: { equals: '' } },
                  ...itemIds.map((itemId) => ({ itemId: { equals: itemId } })),
                ],
              },
              { category: { equals: 'gloves' } },
            ],
          },
        },
      },
      {
        BuildItems: {
          some: {
            AND: [
              {
                OR: [
                  { itemId: { equals: '' } },
                  ...itemIds.map((itemId) => ({ itemId: { equals: itemId } })),
                ],
              },
              { category: { equals: 'torso' } },
            ],
          },
        },
      },
      {
        BuildItems: {
          some: {
            AND: [
              {
                OR: [
                  { itemId: { equals: '' } },
                  ...itemIds.map((itemId) => ({ itemId: { equals: itemId } })),
                ],
              },
              { category: { equals: 'legs' } },
            ],
          },
        },
      },
      {
        BuildItems: {
          some: {
            AND: [
              {
                OR: [
                  { itemId: { equals: '' } },
                  ...itemIds.map((itemId) => ({ itemId: { equals: itemId } })),
                ],
              },
              { category: { equals: 'relic' } },
            ],
          },
        },
      },
      {
        BuildItems: {
          some: {
            AND: [
              {
                OR: [
                  { itemId: { equals: '' } },
                  ...itemIds.map((itemId) => ({ itemId: { equals: itemId } })),
                ],
              },
              { category: { equals: 'amulet' } },
            ],
          },
        },
      },
      {
        BuildItems: {
          some: {
            AND: [
              {
                OR: [
                  { itemId: { equals: '' } },
                  ...itemIds.map((itemId) => ({ itemId: { equals: itemId } })),
                ],
              },
              { category: { equals: 'weapon' } },
            ],
          },
        },
      },
    ],
  }

  const builds = await prisma.build.findMany({
    where: whereClause,
    include: {
      createdBy: true,
      BuildVotes: true,
      BuildReports: true,
      BuildItems: true,
    },
    orderBy: {
      BuildVotes: {
        _count: 'desc',
      },
    },
    // skip: (pageNumber - 1) * itemsPerPage,
    // take: itemsPerPage,
  })

  if (!builds) {
    console.info('No builds found')
    return { items: [], totalItemCount: 0 }
  }

  // Due to limitations in Prisma and incredibly slow workarounds,
  // the base query will return all builds where just one of the items in the
  // build matches the search criteria. We need to filter out the builds
  // where not all of the items match the search criteria.
  const filteredBuilds = builds.filter((build) => {
    const weaponItemIds = build.BuildItems.filter(
      (item) => item.category === 'weapon' && item.itemId !== '',
    ).map((item) => item.itemId)
    const weaponIdsFound = weaponItemIds.every((weaponId) =>
      itemIds.includes(weaponId),
    )

    const modItemIds = build.BuildItems.filter(
      (item) => item.category === 'mod' && item.itemId !== '',
    ).map((item) => item.itemId)
    const modIdsFound = modItemIds.every((modId) => itemIds.includes(modId))

    const mutatorItemIds = build.BuildItems.filter(
      (item) => item.category === 'mutator' && item.itemId !== '',
    ).map((item) => item.itemId)
    const mutatorIdsFound = mutatorItemIds.every((mutatorId) =>
      itemIds.includes(mutatorId),
    )

    const traitItemIds = build.BuildItems.filter(
      (item) => item.category === 'trait' && item.itemId !== '',
    ).map((item) => item.itemId)
    const traitIdsFound = traitItemIds.every((traitId) =>
      itemIds.includes(traitId),
    )

    const archtypeItemIds = build.BuildItems.filter(
      (item) => item.category === 'archtype' && item.itemId,
    ).map((item) => item.itemId)
    const archtypeIdsFound = archtypeItemIds.every((archtypeId) =>
      itemIds.includes(archtypeId),
    )

    const skillItemIds = build.BuildItems.filter(
      (item) => item.category === 'skill' && item.itemId,
    ).map((item) => item.itemId)
    const skillIdsFound = skillItemIds.every((skillId) =>
      itemIds.includes(skillId),
    )

    const ringItemIds = build.BuildItems.filter(
      (item) => item.category === 'ring' && item.itemId !== '',
    ).map((item) => item.itemId)
    const ringIdsFound = ringItemIds.every((ringId) => itemIds.includes(ringId))

    const concoctionItemIds = build.BuildItems.filter(
      (item) => item.category === 'concoction' && item.itemId !== '',
    ).map((item) => item.itemId)
    const concoctionIdsFound = concoctionItemIds.every((concoctionId) =>
      itemIds.includes(concoctionId),
    )

    return (
      weaponIdsFound &&
      modIdsFound &&
      mutatorIdsFound &&
      traitIdsFound &&
      archtypeIdsFound &&
      skillIdsFound &&
      ringIdsFound &&
      concoctionIdsFound
    )
  })

  // Apply pagination to the filtered builds
  const paginatedBuilds = filteredBuilds.slice(
    (pageNumber - 1) * itemsPerPage,
    pageNumber * itemsPerPage,
  )

  const totalBuildCount = filteredBuilds.length

  const returnedBuilds: DBBuild[] = paginatedBuilds.map((build) => ({
    ...build,
    createdByDisplayName:
      build.createdBy?.displayName ||
      build.createdBy?.name ||
      DEFAULT_DISPLAY_NAME,
    totalUpvotes: build.BuildVotes.length, // Count the votes
    upvoted: build.BuildVotes.some((vote) => vote.userId === userId), // Check if the user upvoted the build
    reported: build.BuildReports.some((report) => report.userId === userId), // Check if the user reported the build
    isMember: false,
    buildItems: build.BuildItems,
  }))

  return { items: returnedBuilds, totalItemCount: totalBuildCount }
}
