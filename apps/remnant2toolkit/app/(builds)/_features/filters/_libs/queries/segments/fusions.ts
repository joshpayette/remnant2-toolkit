import { Prisma } from '@repo/db';
import isEqual from 'lodash.isequal';

import { MAX_ALLOWED_FUSIONS } from '@/app/(builds)/_constants/max-allowed-fusions';
import { DEFAULT_BUILD_FIELDS } from '@/app/(builds)/_features/filters/_constants/default-build-fields';
import type { FusionFilterValue } from '@/app/(builds)/_features/filters/_libs/filters/fusion-filter';

export function limitByFusionsSegment(
  fusionFilters: FusionFilterValue,
): Prisma.Sql {
  // if the fusions are the default filters, do nothing
  if (isEqual(fusionFilters, DEFAULT_BUILD_FIELDS.fusions)) {
    return Prisma.empty;
  }
  // If there are no filters, do nothing
  if (fusionFilters.length === 0) {
    return Prisma.empty;
  }

  const allExcludedFusionIds = fusionFilters
    .filter((option) => option.state === 'excluded')
    .map((option) => option.value);

  const allIncludedFusionIds = fusionFilters
    .filter((option) => option.state === 'included')
    .map((option) => option.value);

  const allDefaultFusionIds = fusionFilters
    .filter((option) => option.state === 'default')
    .map((option) => option.value);

  if (allIncludedFusionIds.length === 0 && allExcludedFusionIds.length === 0) {
    return Prisma.empty;
  }

  const excludeFusionIdsQuery =
    allExcludedFusionIds.length === 0
      ? Prisma.empty
      : Prisma.sql`AND BuildItems.buildId NOT IN (
          SELECT BuildItems.buildId
          FROM BuildItems
          WHERE BuildItems.buildId = Build.id
          AND BuildItems.itemId IN (${Prisma.join(allExcludedFusionIds)})
        )`;

  // If there are no included fusions, we want to include all default fusions
  // and exclude any excluded fusions
  if (allIncludedFusionIds.length === 0) {
    return Prisma.sql`AND (
      SELECT COUNT(*)
      FROM BuildItems
      WHERE BuildItems.buildId = Build.id
      AND BuildItems.itemId IN (${Prisma.join(allDefaultFusionIds)})
      ${excludeFusionIdsQuery}
    )`;
  }

  // If there is only one included fusion, we want to ensure that all builds
  // returned have the include fusion. We also want to exclude any excluded
  // fusions.
  if (allIncludedFusionIds.length === 1) {
    return Prisma.sql`AND (
      SELECT COUNT(*)
      FROM BuildItems
      WHERE BuildItems.buildId = Build.id
      AND BuildItems.itemId IN (${Prisma.join(allIncludedFusionIds)})
      ${excludeFusionIdsQuery}
    )`;
  }

  // If the total included fusions is less than the max allowed fusions,
  // we want to ensure that all included fusions are included in each
  // returned build. We also want to exclude any excluded archetypes.
  if (allIncludedFusionIds.length < MAX_ALLOWED_FUSIONS) {
    return Prisma.sql`AND (
      SELECT COUNT(*)
      FROM BuildItems
      WHERE BuildItems.buildId = Build.id
      AND BuildItems.itemId IN (${Prisma.join(allIncludedFusionIds)})
    ) = ${allIncludedFusionIds.length}
    ${excludeFusionIdsQuery}`;
  }

  // If the total included fusions is greater than or equal to the max allowed fusions,
  // we want to ensure that all builds returned have all slots filled with
  // included fusions
  return Prisma.sql`AND (
    SELECT COUNT(*)
    FROM BuildItems
    WHERE BuildItems.buildId = Build.id
    AND BuildItems.itemId IN (${Prisma.join(allIncludedFusionIds)})
  ) = ${MAX_ALLOWED_FUSIONS}`;
}
