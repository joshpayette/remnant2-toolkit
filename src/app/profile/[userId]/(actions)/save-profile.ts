'use server'

import { getServerSession } from '@/app/(utils)/auth'
import { cleanBadWords } from '@/app/(utils)/bad-word-filter'
import { prisma } from '@/app/(utils)/db'

export async function saveProfile({
  userId,
  newDisplayName,
  newBio,
  newAvatarId,
}: {
  userId: string
  newDisplayName: string
  newBio: string
  newAvatarId: string
}): Promise<{ message: string; success: boolean }> {
  const session = await getServerSession()
  if (!session || !session.user) {
    throw new Error('You must be logged in to save a profile.')
  }
  if (session.user.id !== userId) {
    throw new Error('You can only save your own profile.')
  }

  const cleanDisplayName = cleanBadWords(newDisplayName)
  const cleanBio = cleanBadWords(newBio)

  const response = await prisma.$transaction([
    prisma.userProfile.upsert({
      where: {
        userId,
      },
      create: {
        userId,
        bio: cleanBio,
        avatarId: newAvatarId,
      },
      update: {
        bio: cleanBio,
        avatarId: newAvatarId,
      },
    }),
    prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        displayName: cleanDisplayName,
      },
    }),
  ])

  if (!response) {
    return {
      message: 'Failed to save profile',
      success: false,
    }
  }

  return {
    message: 'Profile saved successfully',
    success: true,
  }
}
