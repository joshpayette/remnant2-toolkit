'use server'

import { prisma } from '@/features/db'

export async function getIsLoadoutPublic(userId?: string) {
  if (!userId) {
    return false
  }

  const dbResponse = await prisma.userProfile.findFirst({
    where: {
      userId,
    },
    select: {
      isLoadoutPublic: true,
    },
  })

  return dbResponse?.isLoadoutPublic || false
}
