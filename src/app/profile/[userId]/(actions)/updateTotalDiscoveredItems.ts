'use server'

import { revalidatePath } from 'next/cache'

import { getServerSession } from '@/app/(utils)/auth'
import { prisma } from '@/app/(utils)/db'
import { TOTAL_TRACKABLE_ITEM_COUNT } from '@/app/tracker/constants'

export async function updateTotalDiscoveredItems({
  userId,
  totalDiscoveredItems,
}: {
  userId: string
  totalDiscoveredItems: number
}): Promise<{ success: boolean; message: string }> {
  const session = await getServerSession()
  if (!session || !session.user) {
    return {
      success: false,
      message: 'You must be logged in to update your profile.',
    }
  }
  if (session.user.id !== userId) {
    return {
      success: false,
      message: 'You are not authorized to update this profile.',
    }
  }

  const validDiscoveredItems =
    totalDiscoveredItems > TOTAL_TRACKABLE_ITEM_COUNT
      ? TOTAL_TRACKABLE_ITEM_COUNT
      : totalDiscoveredItems

  try {
    await prisma.userProfile.update({
      where: { userId },
      data: { totalDiscoveredItems: validDiscoveredItems },
    })

    revalidatePath(`/profile/${userId}`)
    return { success: true, message: 'Profile updated successfully.' }
  } catch (error) {
    return {
      success: false,
      message: 'An error occurred while updating your profile.',
    }
  }
}
