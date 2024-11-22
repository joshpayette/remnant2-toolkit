import { Prisma } from '@repo/db';

export function limitByWithQualityBuildsSegment(limitToQualityBuilds: boolean) {
  if (!limitToQualityBuilds) return Prisma.empty;
  return Prisma.sql`AND Build.isQualityBuild=true`;
}
