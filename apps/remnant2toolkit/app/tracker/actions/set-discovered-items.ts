'use server'

import { prisma } from '@repo/db'
import { revalidatePath } from 'next/cache'

import { getSession } from '@/app/(features)/auth/services/sessionService'
import { ALL_TRACKABLE_ITEMS } from '@/app/tracker/constants'

export async function setDiscoveredItems(
  discoveredItemIds: string[],
): Promise<{ success: boolean; message: string }> {
  const session = await getSession()
  if (!session || !session.user) {
    return {
      success: false,
      message: 'You must be logged in to track items to the database.',
    }
  }

  const userId = session.user.id

  // remove duplicate and invalid ids
  const cleanDiscoveredItemIds = Array.from(new Set(discoveredItemIds)).filter(
    (item) => ALL_TRACKABLE_ITEMS.some((i) => i.id === item),
  )

  try {
    await prisma.$transaction([
      prisma.userItems.deleteMany({
        where: {
          userId,
        },
      }),
      prisma.userItems.createMany({
        data: cleanDiscoveredItemIds.map((itemId) => ({
          itemId,
          userId,
        })),
      }),
    ])

    revalidatePath(`/profile/${userId}`)

    return {
      success: true,
      message: 'Discovered items set successfully.',
    }
  } catch (error) {
    console.error('Error setting discovered items', error)
    return {
      success: false,
      message: 'Failed to set discovered items.',
    }
  }
}
