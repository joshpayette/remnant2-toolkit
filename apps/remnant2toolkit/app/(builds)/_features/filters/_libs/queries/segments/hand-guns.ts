import { Prisma } from '@repo/db';
import isEqual from 'lodash.isequal';

import { DEFAULT_BUILD_FIELDS } from '@/app/(builds)/_features/filters/_constants/default-build-fields';
import type { HandGunFilterValue } from '@/app/(builds)/_features/filters/_libs/filters/hand-gun-filter';

export function limitByHandGunSegment(
  handGunFilters: HandGunFilterValue,
): Prisma.Sql {
  // if the handGuns are the default filters, do nothing
  if (isEqual(handGunFilters, DEFAULT_BUILD_FIELDS.handGuns)) {
    return Prisma.empty;
  }
  // If there are no filters, do nothing
  if (handGunFilters.length === 0) {
    return Prisma.empty;
  }

  const allExcludedHandGunIds = handGunFilters
    .filter((option) => option.state === 'excluded')
    .map((option) => option.value);

  const allIncludedHandGunIds = handGunFilters
    .filter((option) => option.state === 'included')
    .map((option) => option.value);

  const allDefaultHandGunIds = handGunFilters
    .filter((option) => option.state === 'default')
    .map((option) => option.value);

  if (
    allIncludedHandGunIds.length === 0 &&
    allExcludedHandGunIds.length === 0
  ) {
    return Prisma.empty;
  }

  const excludeHandGunIdsQuery =
    allExcludedHandGunIds.length === 0
      ? Prisma.empty
      : Prisma.sql`AND BuildItems.buildId NOT IN (
          SELECT BuildItems.buildId
          FROM BuildItems
          WHERE BuildItems.buildId = Build.id 
          AND BuildItems.itemId IN (${Prisma.join(allExcludedHandGunIds)})
        )`;

  // If there are no included handGuns, we want to include all default handGuns
  // and exclude any excluded handGuns
  if (allIncludedHandGunIds.length === 0) {
    return Prisma.sql`AND (
      SELECT COUNT(*)
      FROM BuildItems
      WHERE BuildItems.buildId = Build.id
      AND BuildItems.itemId IN (${Prisma.join(allDefaultHandGunIds)})
      ${excludeHandGunIdsQuery}
    )`;
  }

  // If there is one or more included handGuns, we want to ensure that all builds
  // returned have the included handGuns. We also want to exclude any excluded handGuns
  return Prisma.sql`AND (
    SELECT COUNT(*)
    FROM BuildItems
    WHERE BuildItems.buildId = Build.id
    AND BuildItems.itemId IN (${Prisma.join(allIncludedHandGunIds)})
    ${excludeHandGunIdsQuery}
  )`;
}
