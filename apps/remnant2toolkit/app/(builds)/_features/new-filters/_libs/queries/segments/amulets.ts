import { Prisma } from '@repo/db';
import type { FilterOption } from '@repo/ui';
import isEqual from 'lodash.isequal';

import { DEFAULT_BUILD_FIELDS } from '@/app/(builds)/_features/new-filters/_constants/default-build-fields';

export function limitByAmuletSegment(amuletFilters: FilterOption[]) {
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

  if (allIncludedAmuletIds.length === 0) {
    return Prisma.sql`AND (
      SELECT COUNT(*)
      FROM BuildItems
      WHERE BuildItems.buildId = Build.id
      AND BuildItems.itemId IN (${Prisma.join(allDefaultAmuletIds)})
      ${excludeAmuletIdsQuery}
    )`;
  }

  return Prisma.sql`AND (
    SELECT COUNT(*)
    FROM BuildItems
    WHERE BuildItems.buildId = Build.id
    AND BuildItems.itemId IN (${Prisma.join(allIncludedAmuletIds)})
    ${excludeAmuletIdsQuery}
  )`;
}
