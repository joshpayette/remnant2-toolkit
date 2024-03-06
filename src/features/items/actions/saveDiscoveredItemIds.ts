'use server'

import { getServerSession } from '@/features/auth/lib'
import { prisma } from '@/features/db'
import { collectionToIds } from '@/features/filters/queries/segments/limitByCollection'

export const maxDuration = 30

export async function saveDiscoveredItemIds({
  discoveredItemIds,
}: {
  discoveredItemIds: string[]
}): Promise<{ success: boolean; message: string }> {
  const session = await getServerSession()
  const userId = session?.user?.id

  if (!userId) {
    return { success: false, message: 'You must be signed in.' }
  }

  // if the user has no discoveredItemIds, return
  if (discoveredItemIds.length === 0) {
    return { success: true, message: 'No items to save.' }
  }

  // -----------------------------------
  // Update user's items
  //
  // We need to store the itemIds in a separate table
  // so we can query them efficiently
  // -----------------------------------

  // add linked items or item categories omitted from the tracker
  // that are still "owned" by the user
  const allOwnedItemIds = collectionToIds({ discoveredItemIds })

  await prisma.$transaction([
    prisma.userItems.deleteMany({
      where: { userId },
    }),
    prisma.userItems.createMany({
      data: allOwnedItemIds.map((itemId) => ({
        userId,
        itemId,
      })),
    }),
  ])

  return { success: true, message: 'Items saved.' }
}
