'use server'

import { revalidatePath } from 'next/cache'

import { getServerSession } from '@/app/(utils)/auth'
import { prisma } from '@/app/(utils)/db'

export async function setDiscoveredItems(
  discoveredItemIds: string[],
): Promise<{ success: boolean; message: string }> {
  const session = await getServerSession()
  if (!session || !session.user) {
    return {
      success: false,
      message: 'You must be logged in to track items to the database.',
    }
  }

  const userId = session.user.id

  try {
    await prisma.$transaction([
      prisma.userItems.deleteMany({
        where: {
          userId,
        },
      }),
      prisma.userItems.createMany({
        data: discoveredItemIds.map((itemId) => ({
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
