'use server'

import { prisma } from '@repo/db'
import { revalidatePath } from 'next/cache'

import { getSession } from '@/app/(features)/auth/services/sessionService'

export async function setIsLoadoutPublic(isPublic: boolean): Promise<{
  success: boolean
  message: string
}> {
  const session = await getSession()
  if (!session || !session.user) {
    return { success: false, message: 'User not found.' }
  }

  try {
    await prisma.userProfile.upsert({
      where: { userId: session.user.id },
      create: {
        userId: session.user.id,
        isLoadoutPublic: isPublic,
        bio: 'No bio is set yet.',
      },
      update: {
        isLoadoutPublic: isPublic,
      },
    })
  } catch (e) {
    return {
      success: false,
      message:
        'Failed to update loadout visibility. If this is a new user, reload the page.',
    }
  }

  // Clear the cache for the user's profile
  revalidatePath(`/profile/${session.user.id}/loadouts`)

  return { success: true, message: 'Loadout visibility updated.' }
}
