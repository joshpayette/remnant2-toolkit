import { Prisma } from '@repo/db';
import type { FilterOption } from '@repo/ui';
import isEqual from 'lodash.isequal';

import { DEFAULT_BUILD_FIELDS } from '@/app/(builds)/_features/filters/_constants/default-build-fields';

export function limitByArchetypesSegment(archetypeFilters: FilterOption[]) {
  // if the archetypes are the default filters, do nothing
  if (isEqual(archetypeFilters, DEFAULT_BUILD_FIELDS.archetypes)) {
    return Prisma.empty;
  }
  // If there are no filters, do nothing
  if (archetypeFilters.length === 0) {
    return Prisma.empty;
  }

  const allExcludedArchetypeIds = archetypeFilters
    .filter((option) => option.state === 'excluded')
    .map((option) => option.value);

  const allIncludedArchetypeIds = archetypeFilters
    .filter((option) => option.state === 'included')
    .map((option) => option.value);

  const allDefaultArchetypeIds = archetypeFilters
    .filter((option) => option.state === 'default')
    .map((option) => option.value);

  if (
    allIncludedArchetypeIds.length === 0 &&
    allExcludedArchetypeIds.length === 0
  ) {
    return Prisma.empty;
  }

  const excludeArchetypeIdsQuery =
    allExcludedArchetypeIds.length === 0
      ? Prisma.empty
      : Prisma.sql`AND BuildItems.buildId NOT IN (
          SELECT BuildItems.buildId
          FROM BuildItems
          WHERE BuildItems.buildId = Build.id
          AND BuildItems.itemId IN (${Prisma.join(allExcludedArchetypeIds)})
        )`;

  if (allIncludedArchetypeIds.length === 0) {
    return Prisma.sql`AND (
      SELECT COUNT(*)
      FROM BuildItems
      WHERE BuildItems.buildId = Build.id
      AND BuildItems.itemId IN (${Prisma.join(allDefaultArchetypeIds)})
      ${excludeArchetypeIdsQuery}
    )`;
  }

  return Prisma.sql`AND (
    SELECT COUNT(*)
    FROM BuildItems
    WHERE BuildItems.buildId = Build.id
    AND BuildItems.itemId IN (${Prisma.join(allIncludedArchetypeIds)})
    ${excludeArchetypeIdsQuery}
  )`;
}
