import { Prisma } from '@repo/db';
import isEqual from 'lodash.isequal';

import { MAX_ALLOWED_MODS } from '@/app/(builds)/_constants/max-allowed-mods';
import { DEFAULT_BUILD_FIELDS } from '@/app/(builds)/_features/filters/_constants/default-build-fields';
import type { ModFilterValue } from '@/app/(builds)/_features/filters/_libs/filters/mod-filter';
import { modItems } from '@/app/(items)/_constants/mod-items';

export function limitByModsSegment(modFilters: ModFilterValue): Prisma.Sql {
  // if the mods are the default filters, do nothing
  if (isEqual(modFilters, DEFAULT_BUILD_FIELDS.mods)) {
    return Prisma.empty;
  }
  // If there are no filters, do nothing
  if (modFilters.length === 0) {
    return Prisma.empty;
  }

  const allExcludedModNames = modFilters
    .filter((option) => option.state === 'excluded')
    .map((option) => option.value);
  const allExcludedModIds = modItems
    .filter((item) => allExcludedModNames.includes(item.name))
    .map((item) => item.id);

  const allIncludedModNames = modFilters
    .filter((option) => option.state === 'included')
    .map((option) => option.value);
  const allIncludedModIds = modItems
    .filter((item) => allIncludedModNames.includes(item.name))
    .map((item) => item.id);

  const allDefaultModNames = modFilters
    .filter((option) => option.state === 'default')
    .map((option) => option.value);
  const allDefaultModIds = modItems
    .filter((item) => allDefaultModNames.includes(item.name))
    .map((item) => item.id);

  if (allIncludedModIds.length === 0 && allExcludedModIds.length === 0) {
    return Prisma.empty;
  }

  const excludeModIdsQuery =
    allExcludedModIds.length === 0
      ? Prisma.empty
      : Prisma.sql`AND BuildItems.buildId NOT IN (
          SELECT BuildItems.buildId
          FROM BuildItems
          WHERE BuildItems.buildId = Build.id
          AND BuildItems.itemId IN (${Prisma.join(allExcludedModIds)})
        )`;

  // If there are no included mods, we want to include all default mods
  // and exclude any excluded mods
  if (allIncludedModIds.length === 0) {
    return Prisma.sql`AND (
      SELECT COUNT(*)
      FROM BuildItems
      WHERE BuildItems.buildId = Build.id
      AND BuildItems.itemId IN (${Prisma.join(allDefaultModIds)})
      ${excludeModIdsQuery}
    )`;
  }

  // If there is only one included mod, we want to ensure that all builds
  // returned have the include mod. We also want to exclude any excluded
  // mods.
  if (allIncludedModIds.length === 1) {
    return Prisma.sql`AND (
      SELECT COUNT(*)
      FROM BuildItems
      WHERE BuildItems.buildId = Build.id
      AND BuildItems.itemId IN (${Prisma.join(allIncludedModIds)})
      ${excludeModIdsQuery}
    )`;
  }

  // If the total included mods is less than the max allowed mods,
  // we want to ensure that all included mods are included in each
  // returned build. We also want to exclude any excluded archetypes.
  if (allIncludedModIds.length < MAX_ALLOWED_MODS) {
    return Prisma.sql`AND (
      SELECT COUNT(*)
      FROM BuildItems
      WHERE BuildItems.buildId = Build.id
      AND BuildItems.itemId IN (${Prisma.join(allIncludedModIds)})
    ) = ${allIncludedModIds.length}
    ${excludeModIdsQuery}`;
  }

  // If the total included mods is greater than or equal to the max allowed mods,
  // we want to ensure that all builds returned have all slots filled with
  // included mods
  return Prisma.sql`AND (
    SELECT COUNT(*)
    FROM BuildItems
    WHERE BuildItems.buildId = Build.id
    AND BuildItems.itemId IN (${Prisma.join(allIncludedModIds)})
  ) = ${MAX_ALLOWED_MODS}`;
}
