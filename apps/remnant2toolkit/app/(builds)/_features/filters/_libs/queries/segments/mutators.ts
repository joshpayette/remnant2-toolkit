import { Prisma } from '@repo/db';
import isEqual from 'lodash.isequal';

import { MAX_ALLOWED_MUTATORS } from '@/app/(builds)/_constants/max-allowed-mutators';
import { DEFAULT_BUILD_FIELDS } from '@/app/(builds)/_features/filters/_constants/default-build-fields';
import type { MutatorFilterValue } from '@/app/(builds)/_features/filters/_libs/filters/mutator-filter';

export function limitByMutatorsSegment(
  mutatorFilters: MutatorFilterValue,
): Prisma.Sql {
  // if the mutators are the default filters, do nothing
  if (isEqual(mutatorFilters, DEFAULT_BUILD_FIELDS.mutators)) {
    return Prisma.empty;
  }
  // If there are no filters, do nothing
  if (mutatorFilters.length === 0) {
    return Prisma.empty;
  }

  const allExcludedMutatorIds = mutatorFilters
    .filter((option) => option.state === 'excluded')
    .map((option) => option.value);

  const allIncludedMutatorIds = mutatorFilters
    .filter((option) => option.state === 'included')
    .map((option) => option.value);

  const allDefaultMutatorIds = mutatorFilters
    .filter((option) => option.state === 'default')
    .map((option) => option.value);

  if (
    allIncludedMutatorIds.length === 0 &&
    allExcludedMutatorIds.length === 0
  ) {
    return Prisma.empty;
  }

  const excludeModIdsQuery =
    allExcludedMutatorIds.length === 0
      ? Prisma.empty
      : Prisma.sql`AND BuildItems.buildId NOT IN (
          SELECT BuildItems.buildId
          FROM BuildItems
          WHERE BuildItems.buildId = Build.id
          AND BuildItems.itemId IN (${Prisma.join(allExcludedMutatorIds)})
        )`;

  // If there are no included mutators, we want to include all default mutators
  // and exclude any excluded mutators
  if (allIncludedMutatorIds.length === 0) {
    return Prisma.sql`AND (
      SELECT COUNT(*)
      FROM BuildItems
      WHERE BuildItems.buildId = Build.id
      AND BuildItems.itemId IN (${Prisma.join(allDefaultMutatorIds)})
      ${excludeModIdsQuery}
    )`;
  }

  // If there is only one included mutator, we want to ensure that all builds
  // returned have the include mutator. We also want to exclude any excluded
  // mutators.
  if (allIncludedMutatorIds.length === 1) {
    return Prisma.sql`AND (
      SELECT COUNT(*)
      FROM BuildItems
      WHERE BuildItems.buildId = Build.id
      AND BuildItems.itemId IN (${Prisma.join(allIncludedMutatorIds)})
      ${excludeModIdsQuery}
    )`;
  }

  // If the total included mutators is less than the max allowed mutators,
  // we want to ensure that all included mutators are included in each
  // returned build. We also want to exclude any excluded archetypes.
  if (allIncludedMutatorIds.length < MAX_ALLOWED_MUTATORS) {
    return Prisma.sql`AND (
      SELECT COUNT(*)
      FROM BuildItems
      WHERE BuildItems.buildId = Build.id
      AND BuildItems.itemId IN (${Prisma.join(allIncludedMutatorIds)})
    ) = ${allIncludedMutatorIds.length}
    ${excludeModIdsQuery}`;
  }

  // If the total included mutators is greater than or equal to the max allowed mutators,
  // we want to ensure that all builds returned have all slots filled with
  // included mutators
  return Prisma.sql`AND (
    SELECT COUNT(*)
    FROM BuildItems
    WHERE BuildItems.buildId = Build.id
    AND BuildItems.itemId IN (${Prisma.join(allIncludedMutatorIds)})
  ) = ${MAX_ALLOWED_MUTATORS}`;
}
