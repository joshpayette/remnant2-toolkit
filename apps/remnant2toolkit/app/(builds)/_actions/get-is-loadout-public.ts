'use server'

import { prisma } from '@repo/db'

export async function getIsLoadoutPublic(userId: string) {
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
