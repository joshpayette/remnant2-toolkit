import { Prisma } from '@prisma/client'

export function limitByFavorited(userId: string | undefined) {
  return userId === '' || userId === undefined
    ? Prisma.empty
    : Prisma.sql`AND BuildVoteCounts.userId = ${userId}`
}
