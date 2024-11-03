import { Prisma } from '@repo/db';
import isEqual from 'lodash.isequal';

import { MAX_ALLOWED_RELIC_FRAGMENTS } from '@/app/(builds)/_constants/max-allowed-relic-fragments';
import { DEFAULT_BUILD_FIELDS } from '@/app/(builds)/_features/filters/_constants/default-build-fields';
import type { RelicFragmentFilterValue } from '@/app/(builds)/_features/filters/_libs/filters/relic-fragment-filter';
import { relicFragmentItems } from '@/app/(items)/_constants/relic-fragment-items';

export function limitByRelicFragmentsSegment(
  relicFragmentFilters: RelicFragmentFilterValue,
): Prisma.Sql {
  // if the relic fragments are the default filters, do nothing
  if (isEqual(relicFragmentFilters, DEFAULT_BUILD_FIELDS.relicFragments)) {
    return Prisma.empty;
  }
  // If there are no filters, do nothing
  if (relicFragmentFilters.length === 0) {
    return Prisma.empty;
  }

  const allExcludedRelicFragmentames = relicFragmentFilters
    .filter((option) => option.state === 'excluded')
    .map((option) => option.value);
  const allExcludedRelicFragmentIds = relicFragmentItems
    .filter((item) => allExcludedRelicFragmentames.includes(item.name))
    .map((item) => item.id);

  const allIncludedRelicFragmentames = relicFragmentFilters
    .filter((option) => option.state === 'included')
    .map((option) => option.value);
  const allIncludedRelicFragmentIds = relicFragmentItems
    .filter((item) => allIncludedRelicFragmentames.includes(item.name))
    .map((item) => item.id);

  const allDefaultRelicFragmentames = relicFragmentFilters
    .filter((option) => option.state === 'default')
    .map((option) => option.value);
  const allDefaultRelicFragmentIds = relicFragmentItems
    .filter((item) => allDefaultRelicFragmentames.includes(item.name))
    .map((item) => item.id);

  if (
    allIncludedRelicFragmentIds.length === 0 &&
    allExcludedRelicFragmentIds.length === 0
  ) {
    return Prisma.empty;
  }

  const excludeRelicFragmentIdsQuery =
    allExcludedRelicFragmentIds.length === 0
      ? Prisma.empty
      : Prisma.sql`AND BuildItems.buildId NOT IN (
          SELECT BuildItems.buildId
          FROM BuildItems
          WHERE BuildItems.buildId = Build.id
          AND BuildItems.itemId IN (${Prisma.join(allExcludedRelicFragmentIds)})
        )`;

  // If there are no included relic fragments, we want to include all default relic fragments
  // and exclude any excluded relic fragments
  if (allIncludedRelicFragmentIds.length === 0) {
    return Prisma.sql`AND (
      SELECT COUNT(*)
      FROM BuildItems
      WHERE BuildItems.buildId = Build.id
      AND BuildItems.itemId IN (${Prisma.join(allDefaultRelicFragmentIds)})
      ${excludeRelicFragmentIdsQuery}
    )`;
  }

  // If there is only one included relic fragment, we want to ensure that all builds
  // returned have the include relic fragment. We also want to exclude any excluded
  // relic fragments.
  if (allIncludedRelicFragmentIds.length === 1) {
    return Prisma.sql`AND (
      SELECT COUNT(*)
      FROM BuildItems
      WHERE BuildItems.buildId = Build.id
      AND BuildItems.itemId IN (${Prisma.join(allIncludedRelicFragmentIds)})
      ${excludeRelicFragmentIdsQuery}
    )`;
  }

  // If the total included relic fragments is less than the max allowed relic fragments,
  // we want to ensure that all included relic fragments are included in each
  // returned build. We also want to exclude any excluded archetypes.
  if (allIncludedRelicFragmentIds.length < MAX_ALLOWED_RELIC_FRAGMENTS) {
    return Prisma.sql`AND (
      SELECT COUNT(*)
      FROM BuildItems
      WHERE BuildItems.buildId = Build.id
      AND BuildItems.itemId IN (${Prisma.join(allIncludedRelicFragmentIds)})
    ) = ${allIncludedRelicFragmentIds.length}
    ${excludeRelicFragmentIdsQuery}`;
  }

  // If the total included relic fragments is greater than or equal to the max allowed relic fragments,
  // we want to ensure that all builds returned have all slots filled with
  // included relic fragments
  return Prisma.sql`AND (
    SELECT COUNT(*)
    FROM BuildItems
    WHERE BuildItems.buildId = Build.id
    AND BuildItems.itemId IN (${Prisma.join(allIncludedRelicFragmentIds)})
  ) = ${MAX_ALLOWED_RELIC_FRAGMENTS}`;
}
