import { Prisma } from '@repo/db';

export function limitByWithVideoSegment(withVideo: string) {
  if (!withVideo || withVideo !== 'true') return Prisma.empty;
  return Prisma.sql`AND Build.videoUrl IS NOT NULL AND Build.videoUrl != ''`;
}
