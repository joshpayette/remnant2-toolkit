import { Prisma } from '@repo/db';
import type { FilterOption } from '@repo/ui';
import isEqual from 'lodash.isequal';

import { DEFAULT_BUILD_FIELDS } from '@/app/(builds)/_features/filters/_constants/default-build-fields';

export function limitByMeleeSegment(meleeFilters: FilterOption[]) {
  // if the melees are the default filters, do nothing
  if (isEqual(meleeFilters, DEFAULT_BUILD_FIELDS.melees)) {
    return Prisma.empty;
  }
  // If there are no filters, do nothing
  if (meleeFilters.length === 0) {
    return Prisma.empty;
  }

  const allExcludedMeleeIds = meleeFilters
    .filter((option) => option.state === 'excluded')
    .map((option) => option.value);

  const allIncludedMeleeIds = meleeFilters
    .filter((option) => option.state === 'included')
    .map((option) => option.value);

  const allDefaultMeleeIds = meleeFilters
    .filter((option) => option.state === 'default')
    .map((option) => option.value);

  if (allIncludedMeleeIds.length === 0 && allExcludedMeleeIds.length === 0) {
    return Prisma.empty;
  }

  const excludeMeleeIdsQuery =
    allExcludedMeleeIds.length === 0
      ? Prisma.empty
      : Prisma.sql`AND BuildItems.buildId NOT IN (
          SELECT BuildItems.buildId
          FROM BuildItems
          WHERE BuildItems.buildId = Build.id 
          AND BuildItems.itemId IN (${Prisma.join(allExcludedMeleeIds)})
        )`;

  // If there are no included melees, we want to include all default melees
  // and exclude any excluded melees
  if (allIncludedMeleeIds.length === 0) {
    return Prisma.sql`AND (
      SELECT COUNT(*)
      FROM BuildItems
      WHERE BuildItems.buildId = Build.id
      AND BuildItems.itemId IN (${Prisma.join(allDefaultMeleeIds)})
      ${excludeMeleeIdsQuery}
    )`;
  }

  // If there is one or more included melees, we want to ensure that all builds
  // returned have the included melees. We also want to exclude any excluded melees
  return Prisma.sql`AND (
    SELECT COUNT(*)
    FROM BuildItems
    WHERE BuildItems.buildId = Build.id
    AND BuildItems.itemId IN (${Prisma.join(allIncludedMeleeIds)})
    ${excludeMeleeIdsQuery}
  )`;
}
