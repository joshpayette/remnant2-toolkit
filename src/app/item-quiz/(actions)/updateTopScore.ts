'use server'

import { revalidatePath } from 'next/cache'

import { getServerSession } from '@/app/(utils)/auth'
import { prisma } from '@/app/(utils)/db'

export async function updateTopScore({
  userId,
  topScore,
}: {
  userId: string
  topScore: number
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

  try {
    await prisma.userProfile.update({
      where: { userId },
      data: { topItemQuizScore: topScore },
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
