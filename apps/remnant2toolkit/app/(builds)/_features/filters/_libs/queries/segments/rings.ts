import { Prisma } from '@repo/db';
import isEqual from 'lodash.isequal';

import { MAX_ALLOWED_RINGS } from '@/app/(builds)/_constants/max-allowed-rings';
import { DEFAULT_BUILD_FIELDS } from '@/app/(builds)/_features/filters/_constants/default-build-fields';
import type { RingFilterValue } from '@/app/(builds)/_features/filters/_libs/filters/ring-filter';
import { ringItems } from '@/app/(items)/_constants/ring-items';

export function limitByRingsSegment(ringFilters: RingFilterValue): Prisma.Sql {
  // if the rings are the default filters, do nothing
  if (isEqual(ringFilters, DEFAULT_BUILD_FIELDS.rings)) {
    return Prisma.empty;
  }
  // If there are no filters, do nothing
  if (ringFilters.length === 0) {
    return Prisma.empty;
  }

  const allExcludedRingNames = ringFilters
    .filter((option) => option.state === 'excluded')
    .map((option) => option.value);
  const allExcludedRingIds = ringItems
    .filter((item) => allExcludedRingNames.includes(item.name))
    .map((item) => item.id);

  const allIncludedRingNames = ringFilters
    .filter((option) => option.state === 'included')
    .map((option) => option.value);
  const allIncludedRingIds = ringItems
    .filter((item) => allIncludedRingNames.includes(item.name))
    .map((item) => item.id);

  const allDefaultRingNames = ringFilters
    .filter((option) => option.state === 'default')
    .map((option) => option.value);
  const allDefaultRingIds = ringItems
    .filter((item) => allDefaultRingNames.includes(item.name))
    .map((item) => item.id);

  if (allIncludedRingIds.length === 0 && allExcludedRingIds.length === 0) {
    return Prisma.empty;
  }

  const excludeRingIdsQuery =
    allExcludedRingIds.length === 0
      ? Prisma.empty
      : Prisma.sql`AND BuildItems.buildId NOT IN (
          SELECT BuildItems.buildId
          FROM BuildItems
          WHERE BuildItems.buildId = Build.id
          AND BuildItems.itemId IN (${Prisma.join(allExcludedRingIds)})
        )`;

  // If there are no included rings, we want to include all default rings
  // and exclude any excluded rings
  if (allIncludedRingIds.length === 0) {
    return Prisma.sql`AND (
        SELECT COUNT(*)
        FROM BuildItems
        WHERE BuildItems.buildId = Build.id
        AND BuildItems.itemId IN (${Prisma.join(allDefaultRingIds)})
        ${excludeRingIdsQuery}
      )`;
  }

  // If there is only one included ring, we want to ensure that all builds
  // returned have the included ring. We also want to exclude any excluded
  // rings
  if (allIncludedRingIds.length === 1) {
    return Prisma.sql`AND (
        SELECT COUNT(*)
        FROM BuildItems
        WHERE BuildItems.buildId = Build.id
        AND BuildItems.itemId IN (${Prisma.join(allIncludedRingIds)})
        ${excludeRingIdsQuery}
    )`;
  }

  // If the total included rings is less than the max allowed rings
  // we want to ensure that all included rings are included in each
  // returned build. We also want to exclude any excluded rings.
  if (allIncludedRingIds.length < MAX_ALLOWED_RINGS) {
    return Prisma.sql`AND (
      SELECT COUNT(*)
      FROM BuildItems
      WHERE BuildItems.buildId = Build.id
      AND BuildItems.itemId IN (${Prisma.join(allIncludedRingIds)})) = ${
        allIncludedRingIds.length
      }
      ${excludeRingIdsQuery}
    `;
  }

  // If the total included rings is greater than or equal to the max allowed rings
  // we want to ensure that all builds returned have all slots filled with
  // included rings.
  return Prisma.sql`AND (
    SELECT COUNT(*)
    FROM BuildItems
    WHERE BuildItems.buildId = Build.id
    AND BuildItems.itemId IN (${Prisma.join(
      allIncludedRingIds,
    )})) = ${MAX_ALLOWED_RINGS}
  `;
}
