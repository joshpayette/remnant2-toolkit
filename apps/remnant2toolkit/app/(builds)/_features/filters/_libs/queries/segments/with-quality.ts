import { Prisma } from '@repo/db';

export function limitByWithQualityBuildsSegment(
  limitToQualityBuilds: boolean,
  includeBuildVariants: boolean,
) {
  if (!limitToQualityBuilds) {
    return Prisma.empty;
  }
  if (includeBuildVariants) {
    return Prisma.sql`AND Build.isQualityBuild = true`;
  }

  return Prisma.sql`
  AND (
    Build.isQualityBuild = true
    OR EXISTS (
      SELECT 1
      FROM BuildVariant
      JOIN Build AS SecondaryBuild ON BuildVariant.secondaryBuildId = SecondaryBuild.id
      WHERE SecondaryBuild.isQualityBuild = true
      AND BuildVariant.primaryBuildId = Build.id
    )
  )
`;
}
