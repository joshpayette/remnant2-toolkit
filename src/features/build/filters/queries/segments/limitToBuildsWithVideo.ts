import { Prisma } from '@prisma/client'

export function limitToBuildsWithVideo(limitToBuildsWithVideo: boolean) {
  return limitToBuildsWithVideo
    ? Prisma.sql`AND Build.videoUrl IS NOT NULL AND Build.videoUrl != ''`
    : Prisma.empty
}
