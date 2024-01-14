'use server'

import { DEFAULT_DISPLAY_NAME } from '@/app/(data)/constants'
import { PaginationResponse } from '@/app/(hooks)/usePagination'
import { getServerSession } from '@/app/(lib)/auth'
import { prisma } from '@/app/(lib)/db'
import { ExtendedBuild } from '@/app/(types)/build'
import { SearchFilters } from './page'
import { remnantItems } from '@/app/(data)'
import fs from 'fs'

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
}): Promise<PaginationResponse<ExtendedBuild>> {
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

  // write itemIds to text file
  fs.writeFile(
    './src/app/(data)/itemIds.txt',
    JSON.stringify(itemIds),
    function (err) {
      if (err) return console.log(err)
      console.log('itemIds.txt was saved!')
    },
  )

  // Set the query clause

  const whereClause = {
    isPublic: true,
    AND: [
      {
        OR: [
          { helm: { equals: null } },
          { helm: { equals: '' } },
          ...itemIds.map((itemId) => ({
            helm: { contains: itemId },
          })),
        ],
      },
      {
        OR: [
          { gloves: { equals: null } },
          { gloves: { equals: '' } },
          ...itemIds.map((itemId) => ({
            gloves: { contains: itemId },
          })),
        ],
      },
      {
        OR: [
          { torso: { equals: null } },
          { torso: { equals: '' } },
          ...itemIds.map((itemId) => ({
            torso: { contains: itemId },
          })),
        ],
      },
      {
        OR: [
          { legs: { equals: null } },
          { legs: { equals: '' } },
          ...itemIds.map((itemId) => ({
            legs: { contains: itemId },
          })),
        ],
      },
      {
        OR: [
          { relic: { equals: null } },
          { relic: { equals: '' } },
          ...itemIds.map((itemId) => ({
            relic: { contains: itemId },
          })),
        ],
      },
      {
        OR: [
          { amulet: { equals: null } },
          { amulet: { equals: '' } },
          ...itemIds.map((itemId) => ({
            amulet: { contains: itemId },
          })),
        ],
      },
      {
        OR: [
          { weapon: { equals: null } },
          { weapon: { equals: '' } },
          ...itemIds.map((itemId) => ({
            weapon: { contains: itemId },
          })),
        ],
      },
      {
        OR: [
          { ring: { equals: null } },
          { ring: { equals: '' } },
          ...itemIds.map((itemId) => ({
            ring: { contains: itemId },
          })),
        ],
      },
      {
        OR: [
          { archtype: { equals: null } },
          { archtype: { equals: '' } },
          ...itemIds.map((itemId) => ({
            archtype: { contains: itemId },
          })),
        ],
      },
      {
        OR: [
          { relicfragment: { equals: null } },
          { relicfragment: { equals: '' } },
          ...itemIds.map((itemId) => ({
            relicfragment: { contains: itemId },
          })),
        ],
      },
      {
        OR: [
          { mutator: { equals: null } },
          { mutator: { equals: '' } },
          ...itemIds.map((itemId) => ({
            mutator: { contains: itemId },
          })),
        ],
      },
      {
        OR: [
          { mod: { equals: null } },
          ...itemIds.map((itemId) => ({
            mod: { contains: itemId },
          })),
        ],
      },
      {
        OR: [
          { trait: { equals: null } },
          { trait: { equals: '' } },
          ...itemIds.map((itemId) => ({
            trait: { contains: itemId },
          })),
        ],
      },
    ],
  }

  const builds = await prisma.build.findMany({
    where: whereClause,
    include: {
      createdBy: true,
      BuildVotes: true,
      BuildReports: true,
    },
    orderBy: {
      BuildVotes: {
        _count: 'desc',
      },
    },
    skip: (pageNumber - 1) * itemsPerPage,
    take: itemsPerPage,
  })

  if (!builds) return { items: [], totalItemCount: 0 }

  const totalBuildCount = await prisma.build.count({ where: whereClause })

  const returnedBuilds: ExtendedBuild[] = builds.map((build) => ({
    ...build,
    createdByDisplayName:
      build.createdBy?.displayName ||
      build.createdBy?.name ||
      DEFAULT_DISPLAY_NAME,
    totalUpvotes: build.BuildVotes.length, // Count the votes
    upvoted: build.BuildVotes.some((vote) => vote.userId === userId), // Check if the user upvoted the build
    reported: build.BuildReports.some((report) => report.userId === userId), // Check if the user reported the build
    isMember: false,
  }))

  return { items: returnedBuilds, totalItemCount: totalBuildCount }
}
