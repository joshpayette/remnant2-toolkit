import { Prisma } from '@repo/db';
import isEqual from 'lodash.isequal';

import { DEFAULT_BUILD_FIELDS } from '@/app/(builds)/_features/filters/_constants/default-build-fields';
import type { TraitFilterValue } from '@/app/(builds)/_features/filters/_libs/filters/trait-filter';
import { traitItems } from '@/app/(items)/_constants/trait-items';

export function limitByTraitsSegment(
  traitFilters: TraitFilterValue,
): Prisma.Sql {
  // if the traits are the default filters, do nothing
  if (isEqual(traitFilters, DEFAULT_BUILD_FIELDS.traits)) {
    return Prisma.empty;
  }
  // If there are no filters, do nothing
  if (traitFilters.length === 0) {
    return Prisma.empty;
  }

  const allExcludedTraitNames = traitFilters
    .filter((option) => option.state === 'excluded')
    .map((option) => option.value);
  const allExcludedTraitIds = traitItems
    .filter((item) => allExcludedTraitNames.includes(item.name))
    .map((item) => item.id);

  const allIncludedTraitNames = traitFilters
    .filter((option) => option.state === 'included')
    .map((option) => option.value);
  const allIncludedTraitIds = traitItems
    .filter((item) => allIncludedTraitNames.includes(item.name))
    .map((item) => item.id);

  const allDefaultTraitNames = traitFilters
    .filter((option) => option.state === 'default')
    .map((option) => option.value);
  const allDefaultTraitIds = traitItems
    .filter((item) => allDefaultTraitNames.includes(item.name))
    .map((item) => item.id);

  if (allIncludedTraitIds.length === 0 && allExcludedTraitIds.length === 0) {
    return Prisma.empty;
  }

  const excludeTraitIdsQuery =
    allExcludedTraitIds.length === 0
      ? Prisma.empty
      : Prisma.sql`AND BuildItems.buildId NOT IN (
          SELECT BuildItems.buildId
          FROM BuildItems
          WHERE BuildItems.buildId = Build.id
          AND BuildItems.itemId IN (${Prisma.join(allExcludedTraitIds)})
        )`;

  // If there are no included traits, we want to include all default traits
  // and exclude any excluded traits
  if (allIncludedTraitIds.length === 0) {
    return Prisma.sql`AND (
      SELECT COUNT(*)
      FROM BuildItems
      WHERE BuildItems.buildId = Build.id
      AND BuildItems.itemId IN (${Prisma.join(allDefaultTraitIds)})
      ${excludeTraitIdsQuery}
    )`;
  }

  // If there is only one included trait, we want to ensure that all builds
  // returned have the include trait. We also want to exclude any excluded
  // traits.
  return Prisma.sql`AND (
      SELECT COUNT(*)
      FROM BuildItems
      WHERE BuildItems.buildId = Build.id
      AND BuildItems.itemId IN (${Prisma.join(allIncludedTraitIds)})
      ${excludeTraitIdsQuery}
    )`;
}
