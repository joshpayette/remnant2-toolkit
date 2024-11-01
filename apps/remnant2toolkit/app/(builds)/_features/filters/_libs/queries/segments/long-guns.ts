import { Prisma } from '@repo/db';
import isEqual from 'lodash.isequal';

import { DEFAULT_BUILD_FIELDS } from '@/app/(builds)/_features/filters/_constants/default-build-fields';
import type { LongGunFilterValue } from '@/app/(builds)/_features/filters/_libs/long-gun-filter';

export function limitByLongGunSegment(
  longFunFilters: LongGunFilterValue,
): Prisma.Sql {
  // if the longGuns are the default filters, do nothing
  if (isEqual(longFunFilters, DEFAULT_BUILD_FIELDS.longGuns)) {
    return Prisma.empty;
  }
  // If there are no filters, do nothing
  if (longFunFilters.length === 0) {
    return Prisma.empty;
  }

  const allExcludedLongGunIds = longFunFilters
    .filter((option) => option.state === 'excluded')
    .map((option) => option.value);

  const allIncludedLongGunIds = longFunFilters
    .filter((option) => option.state === 'included')
    .map((option) => option.value);

  const allDefaultLongGunIds = longFunFilters
    .filter((option) => option.state === 'default')
    .map((option) => option.value);

  if (
    allIncludedLongGunIds.length === 0 &&
    allExcludedLongGunIds.length === 0
  ) {
    return Prisma.empty;
  }

  const excludeLongGunIdsQuery =
    allExcludedLongGunIds.length === 0
      ? Prisma.empty
      : Prisma.sql`AND BuildItems.buildId NOT IN (
          SELECT BuildItems.buildId
          FROM BuildItems
          WHERE BuildItems.buildId = Build.id 
          AND BuildItems.itemId IN (${Prisma.join(allExcludedLongGunIds)})
        )`;

  // If there are no included longGuns, we want to include all default longGuns
  // and exclude any excluded longGuns
  if (allIncludedLongGunIds.length === 0) {
    return Prisma.sql`AND (
      SELECT COUNT(*)
      FROM BuildItems
      WHERE BuildItems.buildId = Build.id
      AND BuildItems.itemId IN (${Prisma.join(allDefaultLongGunIds)})
      ${excludeLongGunIdsQuery}
    )`;
  }

  // If there is one or more included longGuns, we want to ensure that all builds
  // returned have the included longGuns. We also want to exclude any excluded longGuns
  return Prisma.sql`AND (
    SELECT COUNT(*)
    FROM BuildItems
    WHERE BuildItems.buildId = Build.id
    AND BuildItems.itemId IN (${Prisma.join(allIncludedLongGunIds)})
    ${excludeLongGunIdsQuery}
  )`;
}