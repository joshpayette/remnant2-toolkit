import { Prisma } from '@repo/db';
import isEqual from 'lodash.isequal';

import { MAX_BUILD_TAGS } from '@/app/(builds)/_constants/max-build-tags';
import { DEFAULT_BUILD_FIELDS } from '@/app/(builds)/_features/filters/_constants/default-build-fields';
import type { BuildTagFilterValue } from '@/app/(builds)/_features/filters/_libs/filters/build-tag-filter';

export function limitByBuildTagsSegment(
  buildTagFilters: BuildTagFilterValue,
): Prisma.Sql {
  // If the build tags are the default filters, do nothing
  if (isEqual(buildTagFilters, DEFAULT_BUILD_FIELDS.buildTags)) {
    return Prisma.empty;
  }
  // If there are no filters, do nothing
  if (buildTagFilters.length === 0) {
    return Prisma.empty;
  }

  const allExcludedBuildTagNames = buildTagFilters
    .filter((option) => option.state === 'excluded')
    .map((option) => option.value);

  const allIncludedBuildTagNames = buildTagFilters
    .filter((option) => option.state === 'included')
    .map((option) => option.value);

  const allDefaultBuildTagNames = buildTagFilters
    .filter((option) => option.state === 'default')
    .map((option) => option.value);

  if (
    allIncludedBuildTagNames.length === 0 &&
    allExcludedBuildTagNames.length === 0
  ) {
    return Prisma.empty;
  }

  const excludeBuildTagIdsQuery =
    allExcludedBuildTagNames.length === 0
      ? Prisma.empty
      : Prisma.sql`AND BuildTags.buildId NOT IN (
          SELECT BuildTags.buildId
          FROM BuildTags
          WHERE BuildTags.buildId = Build.id
          AND BuildTags.tag IN (${Prisma.join(allExcludedBuildTagNames)})
        )`;

  // If there are no included build tags, we want to include all default build tags
  // and exclude any excluded build tags
  if (allIncludedBuildTagNames.length === 0) {
    return Prisma.sql`AND (
      SELECT COUNT(*)
      FROM BuildTags
      WHERE BuildTags.buildId = Build.id
      AND BuildTags.tag IN (${Prisma.join(allDefaultBuildTagNames)})
      ${excludeBuildTagIdsQuery}
    )`;
  }

  // If there is only one included build tag, we want to ensure that all builds
  // returned have the included build tag. We also want to exclude any excluded
  // build tags
  if (allIncludedBuildTagNames.length === 1) {
    return Prisma.sql`AND (
      SELECT COUNT(*)
      FROM BuildTags
      WHERE BuildTags.buildId = Build.id
      AND BuildTags.tag IN (${Prisma.join(allIncludedBuildTagNames)})
      ${excludeBuildTagIdsQuery}
    )`;
  }

  // If the total included build tags is less than the max build tags, we want to
  // ensure that all included build tags are included in each returned build. We also
  // want to exclude any excluded build tags
  if (allIncludedBuildTagNames.length < MAX_BUILD_TAGS) {
    return Prisma.sql`AND (
      SELECT COUNT(*)
      FROM BuildTags
      WHERE BuildTags.buildId = Build.id
      AND BuildTags.tag IN (${Prisma.join(allIncludedBuildTagNames)})) = ${
        allIncludedBuildTagNames.length
      }
     ${excludeBuildTagIdsQuery}
      `;
  }

  // If the total included build tags is greater than or equal to the max allowed build tags
  // we want to ensure that all builds returned have all slots filled with included build tags.
  return Prisma.sql`AND (
    SELECT COUNT(*)
    FROM BuildTags
    WHERE BuildTags.buildId = Build.id
    AND BuildTags.tag IN (${Prisma.join(allIncludedBuildTagNames)})
  ) = ${MAX_BUILD_TAGS}`;
}
