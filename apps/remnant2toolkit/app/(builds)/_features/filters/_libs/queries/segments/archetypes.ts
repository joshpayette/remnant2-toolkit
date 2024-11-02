import { Prisma } from '@repo/db';
import isEqual from 'lodash.isequal';

import { MAX_ALLOWED_ARCHETYPES } from '@/app/(builds)/_constants/max-allowed-archetypes';
import { DEFAULT_BUILD_FIELDS } from '@/app/(builds)/_features/filters/_constants/default-build-fields';
import type { ArchetypeFilterValue } from '@/app/(builds)/_features/filters/_libs/filters/archetype-filter';

export function limitByArchetypesSegment(
  archetypeFilters: ArchetypeFilterValue,
  archetypeSlot: number,
): Prisma.Sql {
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

  let equippedArchetypeSlotQuery = Prisma.empty;
  if (archetypeSlot === 0 || archetypeSlot === 1) {
    equippedArchetypeSlotQuery = Prisma.sql`AND BuildItems.index = ${archetypeSlot}`;
  }

  // If there are no included archetypes, we want to include all default archetypes
  // and exclude any excluded archetypes
  if (allIncludedArchetypeIds.length === 0) {
    return Prisma.sql`AND (
      SELECT COUNT(*)
      FROM BuildItems
      WHERE BuildItems.buildId = Build.id
      AND BuildItems.itemId IN (${Prisma.join(allDefaultArchetypeIds)})
      ${excludeArchetypeIdsQuery}
    )`;
  }

  // If there is only one included archetype, we want to ensure that all builds
  // returned have the included archetype. We also want to exclude any excluded
  // archetypes.
  if (allIncludedArchetypeIds.length === 1) {
    return Prisma.sql`AND (
      SELECT COUNT(*)
      FROM BuildItems
      WHERE BuildItems.buildId = Build.id
      AND BuildItems.itemId IN (${Prisma.join(allIncludedArchetypeIds)})
      ${equippedArchetypeSlotQuery}
      ${excludeArchetypeIdsQuery}
    )`;
  }

  // If the total included archetypes is less than the max allowed archetypes,
  // we want to ensure the all included archetypes are included in each
  // returned build. We also want to exclude any excluded archetypes.
  if (allIncludedArchetypeIds.length < MAX_ALLOWED_ARCHETYPES) {
    return Prisma.sql`AND (
      SELECT COUNT(*)
      FROM BuildItems
      WHERE BuildItems.buildId = Build.id
      AND BuildItems.itemId IN (${Prisma.join(allIncludedArchetypeIds)})) = ${
        allIncludedArchetypeIds.length
      }
      ${excludeArchetypeIdsQuery}
    `;
  }

  // If the total included archetypes is greater than or equal to the max allowed archetypes,
  // we want to ensure that all builds returned have all slots filled with
  // included archetypes.
  return Prisma.sql`AND (
    SELECT COUNT(*)
    FROM BuildItems
    WHERE BuildItems.buildId = Build.id
    AND BuildItems.itemId IN (${Prisma.join(allIncludedArchetypeIds)})
  ) = ${MAX_ALLOWED_ARCHETYPES}`;
}
