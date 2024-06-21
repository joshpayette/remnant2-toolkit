import { Prisma } from '@repo/db'

export function limitToBuildsWithVideo(limitToBuildsWithVideo: boolean) {
  if (!limitToBuildsWithVideo) return Prisma.empty
  return Prisma.sql`AND Build.videoUrl IS NOT NULL AND Build.videoUrl != ''`
}
