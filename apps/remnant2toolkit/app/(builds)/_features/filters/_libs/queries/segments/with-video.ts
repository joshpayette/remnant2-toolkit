import { Prisma } from '@repo/db';

import type { WithVideoFilterValue } from '@/app/(builds)/_features/filters/_libs/with-video-filter';

export function limitByWithVideoSegment(
  withVideo: WithVideoFilterValue,
): Prisma.Sql {
  if (!withVideo || withVideo !== true) return Prisma.empty;
  return Prisma.sql`AND Build.videoUrl IS NOT NULL AND Build.videoUrl != ''`;
}
