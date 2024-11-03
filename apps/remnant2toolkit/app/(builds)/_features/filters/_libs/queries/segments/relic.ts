import { Prisma } from '@repo/db';
import isEqual from 'lodash.isequal';

import { DEFAULT_BUILD_FIELDS } from '@/app/(builds)/_features/filters/_constants/default-build-fields';
import type { RelicFilterValue } from '@/app/(builds)/_features/filters/_libs/filters/relic-filter';
import { relicItems } from '@/app/(items)/_constants/relic-items';

export function limitByRelicSegment(
  relicFilters: RelicFilterValue,
): Prisma.Sql {
  // if the relics are the default filters, do nothing
  if (isEqual(relicFilters, DEFAULT_BUILD_FIELDS.relics)) {
    return Prisma.empty;
  }
  // If there are no filters, do nothing
  if (relicFilters.length === 0) {
    return Prisma.empty;
  }

  const allExcludedRelicNames = relicFilters
    .filter((option) => option.state === 'excluded')
    .map((option) => option.value);
  const allExcludedRelicIds = relicItems
    .filter((item) => allExcludedRelicNames.includes(item.name))
    .map((item) => item.id);

  const allIncludedRelicNames = relicFilters
    .filter((option) => option.state === 'included')
    .map((option) => option.value);
  const allIncludedRelicIds = relicItems
    .filter((item) => allIncludedRelicNames.includes(item.name))
    .map((item) => item.id);

  const allDefaultRelicNames = relicFilters
    .filter((option) => option.state === 'default')
    .map((option) => option.value);
  const allDefaultRelicIds = relicItems
    .filter((item) => allDefaultRelicNames.includes(item.name))
    .map((item) => item.id);

  if (allIncludedRelicIds.length === 0 && allExcludedRelicIds.length === 0) {
    return Prisma.empty;
  }

  const excludeRelicIdsQuery =
    allExcludedRelicIds.length === 0
      ? Prisma.empty
      : Prisma.sql`AND BuildItems.buildId NOT IN (
          SELECT BuildItems.buildId
          FROM BuildItems
          WHERE BuildItems.buildId = Build.id 
          AND BuildItems.itemId IN (${Prisma.join(allExcludedRelicIds)})
        )`;

  // If there are no included relics, we want to include all default relics
  // and exclude any excluded relics
  if (allIncludedRelicIds.length === 0) {
    return Prisma.sql`AND (
      SELECT COUNT(*)
      FROM BuildItems
      WHERE BuildItems.buildId = Build.id
      AND BuildItems.itemId IN (${Prisma.join(allDefaultRelicIds)})
      ${excludeRelicIdsQuery}
    )`;
  }

  // If there is one or more included relics, we want to ensure that all builds
  // returned have the included relics. We also want to exclude any excluded relics
  return Prisma.sql`AND (
    SELECT COUNT(*)
    FROM BuildItems
    WHERE BuildItems.buildId = Build.id
    AND BuildItems.itemId IN (${Prisma.join(allIncludedRelicIds)})
    ${excludeRelicIdsQuery}
  )`;
}
