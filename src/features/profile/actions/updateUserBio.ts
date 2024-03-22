'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'

import { getServerSession } from '@/features/auth/lib'
import { cleanBadWords } from '@/features/bad-word-filter'
import { prisma } from '@/features/db'
import { ErrorResponse } from '@/features/error-handling/types'
import { MAX_PROFILE_BIO_LENGTH } from '@/features/profile/constants'

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

    const dbResponse = await prisma.userProfile.upsert({
      where: { userId: session.user.id },
      create: {
        userId: session.user.id,
        bio,
      },
      update: {
        bio,
      },
    })

    if (!dbResponse) {
      return {
        errors: ['Error updating user!'],
      }
    }

    revalidatePath('/profile/created-builds', 'page')
    revalidatePath('/profile/favorited-builds', 'page')
    revalidatePath(`/profile/${session.user.id}`, 'page')

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
