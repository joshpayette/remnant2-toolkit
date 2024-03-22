'use server'

import { prisma } from '@/features/db'
import { ErrorResponse } from '@/features/error-handling/types'
import { DEFAULT_DISPLAY_NAME } from '@/features/profile/constants'

export async function getUserBio(
  userId: string,
): Promise<ErrorResponse | { bio?: string; displayName: string }> {
  try {
    const userResponse = await prisma.user.findUnique({
      where: { id: userId },
    })

    if (!userResponse?.displayName || userResponse.displayName === '') {
      await prisma.user.update({
        where: { id: userId },
        data: { displayName: userResponse?.name || DEFAULT_DISPLAY_NAME },
      })
    }

    const profileResponse = await prisma.userProfile.findUnique({
      where: { userId },
    })

    return {
      bio:
        profileResponse?.bio !== ''
          ? profileResponse?.bio
          : 'No bio is set yet',
      displayName:
        userResponse?.displayName ?? userResponse?.name ?? DEFAULT_DISPLAY_NAME,
    }
  } catch (e) {
    console.error(e)
    return {
      errors: ['Error fetching user!'],
    }
  }
}
