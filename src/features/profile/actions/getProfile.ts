'use server'

import { User, UserProfile } from '@prisma/client'

import { prisma } from '@/features/db'
import { ErrorResponse } from '@/features/error-handling/types'

export async function getProfile(userId: string): Promise<
  | ErrorResponse
  | {
      message: string
      user: User
      profile: UserProfile | null
    }
> {
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  })

  if (!user) {
    return {
      errors: [`User with id ${userId} not found`],
    }
  }

  let profile = await prisma.userProfile.findFirst({
    where: {
      userId,
    },
  })

  return {
    message: 'User found',
    user,
    profile,
  }
}
