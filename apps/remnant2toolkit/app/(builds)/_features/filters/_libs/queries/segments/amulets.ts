import { Prisma } from '@repo/db';
import isEqual from 'lodash.isequal';

import { DEFAULT_BUILD_FIELDS } from '@/app/(builds)/_features/filters/_constants/default-build-fields';
import type { AmuletFilterValue } from '@/app/(builds)/_features/filters/_libs/filters/amulet-filter';

export function limitByAmuletSegment(
  amuletFilters: AmuletFilterValue,
): Prisma.Sql {
  // if the amulets are the default filters, do nothing
  if (isEqual(amuletFilters, DEFAULT_BUILD_FIELDS.amulets)) {
    return Prisma.empty;
  }
  // If there are no filters, do nothing
  if (amuletFilters.length === 0) {
    return Prisma.empty;
  }

  const allExcludedAmuletIds = amuletFilters
    .filter((option) => option.state === 'excluded')
    .map((option) => option.value);

  const allIncludedAmuletIds = amuletFilters
    .filter((option) => option.state === 'included')
    .map((option) => option.value);

  const allDefaultAmuletIds = amuletFilters
    .filter((option) => option.state === 'default')
    .map((option) => option.value);

  if (allIncludedAmuletIds.length === 0 && allExcludedAmuletIds.length === 0) {
    return Prisma.empty;
  }

  const excludeAmuletIdsQuery =
    allExcludedAmuletIds.length === 0
      ? Prisma.empty
      : Prisma.sql`AND BuildItems.buildId NOT IN (
          SELECT BuildItems.buildId
          FROM BuildItems
          WHERE BuildItems.buildId = Build.id 
          AND BuildItems.itemId IN (${Prisma.join(allExcludedAmuletIds)})
        )`;

  // If there are no included amulets, we want to include all default amulets
  // and exclude any excluded amulets
  if (allIncludedAmuletIds.length === 0) {
    return Prisma.sql`AND (
      SELECT COUNT(*)
      FROM BuildItems
      WHERE BuildItems.buildId = Build.id
      AND BuildItems.itemId IN (${Prisma.join(allDefaultAmuletIds)})
      ${excludeAmuletIdsQuery}
    )`;
  }

  // If there is one or more included amulets, we want to ensure that all builds
  // returned have the included amulets. We also want to exclude any excluded amulets
  return Prisma.sql`AND (
    SELECT COUNT(*)
    FROM BuildItems
    WHERE BuildItems.buildId = Build.id
    AND BuildItems.itemId IN (${Prisma.join(allIncludedAmuletIds)})
    ${excludeAmuletIdsQuery}
  )`;
}
