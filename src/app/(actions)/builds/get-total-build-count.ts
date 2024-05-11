'use server'

import { prisma } from '@/app/(utils)/db'

export async function getTotalBuildCount() {
  const count = await prisma.build.count({
    where: {
      isPublic: true,
    },
  })
  return count
}
