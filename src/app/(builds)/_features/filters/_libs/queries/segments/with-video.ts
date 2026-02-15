import type { WithVideoFilterValue } from '@/app/(builds)/_features/filters/_libs/filters/with-video-filter';
import { Prisma } from '@/prisma';

export function limitByWithVideoSegment(
  withVideo: WithVideoFilterValue
): Prisma.Sql {
  if (!withVideo || withVideo !== true) return Prisma.empty;
  return Prisma.sql`AND Build.videoUrl IS NOT NULL AND Build.videoUrl != ''`;
}
