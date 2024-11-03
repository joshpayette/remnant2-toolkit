import { Prisma } from '@repo/db';
import isEqual from 'lodash.isequal';

import { DEFAULT_BUILD_FIELDS } from '@/app/(builds)/_features/filters/_constants/default-build-fields';
import type { LegendaryFragmentFilterValue } from '@/app/(builds)/_features/filters/_libs/filters/legendary-fragment-filter';
import { relicFragmentItems } from '@/app/(items)/_constants/relic-fragment-items';

const legendaryFragmentItems = relicFragmentItems.filter(
  (item) => item.color === 'legendary',
);

export function limitByLegendaryFragmentsSegment(
  legendaryFragmentFilters: LegendaryFragmentFilterValue,
): Prisma.Sql {
  // if the legendary fragments are the default filters, do nothing
  if (
    isEqual(legendaryFragmentFilters, DEFAULT_BUILD_FIELDS.legendaryFragments)
  ) {
    return Prisma.empty;
  }
  // If there are no filters, do nothing
  if (legendaryFragmentFilters.length === 0) {
    return Prisma.empty;
  }

  const allExcludedLegendaryFragmentNames = legendaryFragmentFilters
    .filter((option) => option.state === 'excluded')
    .map((option) => option.value);
  const allExcludedLegendaryFragmentIds = legendaryFragmentItems
    .filter((item) => allExcludedLegendaryFragmentNames.includes(item.name))
    .map((item) => item.id);

  const allIncludedLegendaryFragmentNames = legendaryFragmentFilters
    .filter((option) => option.state === 'included')
    .map((option) => option.value);
  const allIncludedLegendaryFragmentIds = legendaryFragmentItems
    .filter((item) => allIncludedLegendaryFragmentNames.includes(item.name))
    .map((item) => item.id);

  const allDefaultLegendaryFragmentNames = legendaryFragmentFilters
    .filter((option) => option.state === 'default')
    .map((option) => option.value);
  const allDefaultLegendaryFragmentIds = legendaryFragmentItems
    .filter((item) => allDefaultLegendaryFragmentNames.includes(item.name))
    .map((item) => item.id);

  if (
    allIncludedLegendaryFragmentIds.length === 0 &&
    allExcludedLegendaryFragmentIds.length === 0
  ) {
    return Prisma.empty;
  }

  const excludeLegendaryFragmentIdsQuery =
    allExcludedLegendaryFragmentIds.length === 0
      ? Prisma.empty
      : Prisma.sql`AND BuildItems.buildId NOT IN (
          SELECT BuildItems.buildId
          FROM BuildItems
          WHERE BuildItems.buildId = Build.id
          AND BuildItems.itemId IN (${Prisma.join(
            allExcludedLegendaryFragmentIds,
          )})
        )`;

  // If there are no included legendary fragments, we want to include all default legendary fragments
  // and exclude any excluded legendary fragments
  if (allIncludedLegendaryFragmentIds.length === 0) {
    return Prisma.sql`AND (
      SELECT COUNT(*)
      FROM BuildItems
      WHERE BuildItems.buildId = Build.id
      AND BuildItems.itemId IN (${Prisma.join(allDefaultLegendaryFragmentIds)})
      ${excludeLegendaryFragmentIdsQuery}
    )`;
  }

  return Prisma.sql`AND (
      SELECT COUNT(*)
      FROM BuildItems
      WHERE BuildItems.buildId = Build.id
      AND BuildItems.itemId IN (${Prisma.join(allIncludedLegendaryFragmentIds)})
      ${excludeLegendaryFragmentIdsQuery}
    )`;
}
