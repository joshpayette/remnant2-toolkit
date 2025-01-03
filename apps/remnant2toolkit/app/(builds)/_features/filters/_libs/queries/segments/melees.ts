import { Prisma } from '@repo/db';
import isEqual from 'lodash.isequal';

import { DEFAULT_BUILD_FIELDS } from '@/app/(builds)/_features/filters/_constants/default-build-fields';
import type { MeleeFilterValue } from '@/app/(builds)/_features/filters/_libs/filters/melee-filter';
import { weaponItems } from '@/app/(items)/_constants/weapon-items';

const meleeItems = weaponItems.filter((item) => item.type === 'melee');

export function limitByMeleeSegment(
  meleeFilters: MeleeFilterValue,
): Prisma.Sql {
  // if the melees are the default filters, do nothing
  if (isEqual(meleeFilters, DEFAULT_BUILD_FIELDS.melees)) {
    return Prisma.empty;
  }
  // If there are no filters, do nothing
  if (meleeFilters.length === 0) {
    return Prisma.empty;
  }

  const allExcludedMeleeNames = meleeFilters
    .filter((option) => option.state === 'excluded')
    .map((option) => option.value);
  const allExcludedMeleeIds = meleeItems
    .filter((item) => allExcludedMeleeNames.includes(item.name))
    .map((item) => item.id);

  const allIncludedMeleeNames = meleeFilters
    .filter((option) => option.state === 'included')
    .map((option) => option.value);
  const allIncludedMeleeIds = meleeItems
    .filter((item) => allIncludedMeleeNames.includes(item.name))
    .map((item) => item.id);

  const allDefaultMeleeNames = meleeFilters
    .filter((option) => option.state === 'default')
    .map((option) => option.value);
  const allDefaultMeleeIds = meleeItems
    .filter((item) => allDefaultMeleeNames.includes(item.name))
    .map((item) => item.id);

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
