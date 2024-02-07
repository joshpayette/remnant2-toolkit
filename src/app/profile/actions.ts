'use server'

import { z } from 'zod'
import { getServerSession } from '../../features/auth/lib'
import { prisma } from '../../features/db'
import {
  DEFAULT_DISPLAY_NAME,
  MAX_PROFILE_BIO_LENGTH,
} from '@/features/profile/constants'
import { ErrorResponse } from '@/features/error-handling/types'
import { cleanBadWords } from '@/features/bad-word-filter'

export async function updateUserDisplayName(
  data: string,
): Promise<ErrorResponse | { message: string; updatedDisplayName?: string }> {
  // session validation
  const session = await getServerSession()
  if (!session || !session.user) {
    return {
      message: 'You must be logged in.',
    }
  }

  // data validation
  const unvalidatedData = JSON.parse(data)
  const validatedData = z
    .object({
      displayName: z
        .string()
        .min(1, { message: 'Display name is required.' })
        .max(50, {
          message: 'Display name cannot be longer than 50 characters.',
        }),
    })
    .safeParse(unvalidatedData)
  if (!validatedData.success) {
    console.error('Error in data!', validatedData.error)
    return {
      errors: [validatedData.error.flatten().fieldErrors],
    }
  }

  const { displayName: dirtyDisplayName } = validatedData.data

  try {
    const displayName = cleanBadWords(dirtyDisplayName)

    const dbResponse = await prisma.user.update({
      where: { id: session.user.id },
      data: { displayName },
    })

    if (!dbResponse) {
      return {
        errors: ['Error updating user!'],
      }
    }

    return {
      message: 'Successfully updated user!',
      updatedDisplayName: dbResponse.displayName ?? '',
    }
  } catch (e) {
    console.error(e)
    return {
      errors: ['Error updating user!'],
    }
  }
}

export async function updateUserBio(
  data: string,
): Promise<ErrorResponse | { message: string; updatedBio?: string }> {
  // session validation
  const session = await getServerSession()
  if (!session || !session.user) {
    return {
      message: 'You must be logged in.',
    }
  }

  // data validation
  const unvalidatedData = JSON.parse(data)
  const validatedData = z
    .object({
      bio: z
        .string()
        .min(5, { message: 'Bio is required.' })
        .max(MAX_PROFILE_BIO_LENGTH, {
          message: `Bio cannot be longer than ${MAX_PROFILE_BIO_LENGTH} characters.`,
        }),
    })
    .safeParse(unvalidatedData)
  if (!validatedData.success) {
    console.error('Error in data!', validatedData.error)
    return {
      errors: [validatedData.error.flatten().fieldErrors],
    }
  }

  const { bio: dirtyBio } = validatedData.data

  try {
    const bio = cleanBadWords(dirtyBio)

    const dbResponse = await prisma.userProfile.update({
      where: { userId: session.user.id },
      data: { bio },
    })

    if (!dbResponse) {
      return {
        errors: ['Error updating user!'],
      }
    }

    return {
      message: 'Successfully updated user!',
      updatedBio: dbResponse.bio ?? '',
    }
  } catch (e) {
    console.error(e)
    return {
      errors: ['Error updating user!'],
    }
  }
}

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

    if (!profileResponse) {
      // create a profile for the user if one doesn't exist
      const newProfile = await prisma.userProfile.create({
        data: {
          bio: 'No bio is set yet',
          userId,
        },
      })
      return {
        bio: newProfile.bio !== '' ? newProfile.bio : 'No bio is set yet',
        displayName:
          userResponse?.displayName ??
          userResponse?.name ??
          DEFAULT_DISPLAY_NAME,
      }
    }

    return {
      bio:
        profileResponse.bio !== '' ? profileResponse.bio : 'No bio is set yet',
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
