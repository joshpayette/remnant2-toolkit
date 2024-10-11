import { Prisma } from '@repo/db';

export function limitToNonVariantBuilds(limitToNonVariantBuilds: boolean) {
  if (!limitToNonVariantBuilds) return Prisma.empty;
  return Prisma.sql`AND NOT EXISTS (
  SELECT 1
  FROM BuildVariant
  WHERE BuildVariant.secondaryBuildId = Build.id
)`;
}
