import { Prisma } from '@repo/db'

export function limitByFavorited(userId: string | undefined) {
  if (userId === '' || userId === undefined) return Prisma.empty
  return Prisma.sql`AND BuildVoteCounts.userId = ${userId}`
}
