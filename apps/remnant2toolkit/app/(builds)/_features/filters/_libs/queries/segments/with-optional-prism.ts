import { Prisma } from '@repo/db';

export function limitByWithOptionalPrismFragment(
  withOptionalPrism: boolean,
): Prisma.Sql {
  if (!withOptionalPrism) {
    return Prisma.empty;
  }
  return Prisma.sql`
    AND (
      EXISTS (
        SELECT 1
        FROM BuildItems
        WHERE BuildItems.buildId = Build.id
        AND BuildItems.category = 'relicfragment'
        AND BuildItems.index = 8
        AND (BuildItems.optional = TRUE OR BuildItems.optional IS NULL OR BuildItems.itemId = '')
      )
      OR EXISTS (
        SELECT 1
        FROM BuildVariant
        JOIN BuildItems ON BuildVariant.secondaryBuildId = BuildItems.buildId
        WHERE BuildVariant.primaryBuildId = Build.id
        AND BuildItems.category = 'relicfragment'
        AND BuildItems.index = 8
        AND (BuildItems.optional = TRUE OR BuildItems.optional IS NULL OR BuildItems.itemId = '')
      )
    )
  `;
}
