import isEqual from 'lodash.isequal';

import { ALL_RELEASE_KEYS } from '@/app/_constants/releases';
import { DEFAULT_BUILD_FIELDS } from '@/app/(builds)/_features/filters/_constants/default-build-fields';
import type { ReleasesFilterValue } from '@/app/(builds)/_features/filters/_libs/filters/releases-filter';
import { Prisma } from '@/lib/db';

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

  const allIncludedReleaseKeys = releaseFilters
    .filter((option) => option.state === 'included')
    .map((option) => option.value);

  if (allIncludedReleaseKeys.length === 0) {
    return Prisma.empty;
  }

  // Keep only builds whose items fall entirely within the included releases
  const deselectedKeys = ALL_RELEASE_KEYS.filter(
    (key) => !allIncludedReleaseKeys.includes(key),
  );

  if (deselectedKeys.length === 0) {
    return Prisma.empty;
  }

  const conditions: Prisma.Sql[] = [];
  if (deselectedKeys.includes('base')) {
    conditions.push(Prisma.sql`Build.hasBaseItems = false`);
  }
  if (deselectedKeys.includes('dlc1')) {
    conditions.push(Prisma.sql`Build.hasDlc1Items = false`);
  }
  if (deselectedKeys.includes('dlc2')) {
    conditions.push(Prisma.sql`Build.hasDlc2Items = false`);
  }
  if (deselectedKeys.includes('dlc3')) {
    conditions.push(Prisma.sql`Build.hasDlc3Items = false`);
  }

  return Prisma.sql`AND ${Prisma.join(conditions, ' AND ')}`;
}
