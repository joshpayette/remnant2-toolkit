import { Prisma } from '@repo/db';
import isEqual from 'lodash.isequal';

import { DEFAULT_BUILD_FIELDS } from '@/app/(builds)/_features/filters/_constants/default-build-fields';
import type { releasesFilter } from '@/app/(builds)/_features/filters/_libs/releases-filter';

export function limitByReleaseSegment(
  releaseFilters: ReleasesFilterValue,
): Prisma.Sql {
  // if the releases are the default filters, do nothing
  if (isEqual(releaseFilters, DEFAULT_BUILD_FIELDS.releases)) {
    return Prisma.empty;
  }
  // If there are no filters, do nothing
  if (releaseFilters.length === 0) {
    return Prisma.empty;
  }

  const allIncludedReleaseIds = releaseFilters
    .filter((option) => option.state === 'included')
    .map((option) => option.value);

  if (allIncludedReleaseIds.length === 0) {
    return Prisma.empty;
  }

  // If there is one or more included releases, we want to ensure that all builds
  // returned have the included releases. We also want to exclude any excluded releases
  return Prisma.sql`AND NOT EXISTS (
    SELECT 1
    FROM BuildItems
    LEFT JOIN Item ON BuildItems.itemId = Item.itemId 
    WHERE BuildItems.buildId = Build.id
    AND (Item.dlc NOT IN (${Prisma.join(
      allIncludedReleaseIds,
    )}) AND BuildItems.itemId != '')
  )
`;
}
