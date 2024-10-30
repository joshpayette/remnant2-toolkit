import { Prisma } from '@repo/db';
import isEqual from 'lodash.isequal';

import { MAX_BUILD_TAGS } from '@/app/(builds)/_constants/max-build-tags';
import { DEFAULT_BUILD_FIELDS } from '@/app/(builds)/_features/filters/_constants/default-build-fields';
import type { BuildTagFilterValue } from '@/app/(builds)/_features/filters/_libs/build-tag-filter';

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

  const allExcludedBuildTagIds = buildTagFilters
    .filter((option) => option.state === 'excluded')
    .map((option) => option.value);

  const allIncludedBuildTagIds = buildTagFilters
    .filter((option) => option.state === 'included')
    .map((option) => option.value);

  const allDefaultBuildTagIds = buildTagFilters
    .filter((option) => option.state === 'default')
    .map((option) => option.value);

  console.info('allIncludedBuildTagIds', allIncludedBuildTagIds);

  if (
    allIncludedBuildTagIds.length === 0 &&
    allExcludedBuildTagIds.length === 0
  ) {
    return Prisma.empty;
  }

  const excludeBuildTagIdsQuery =
    allExcludedBuildTagIds.length === 0
      ? Prisma.empty
      : Prisma.sql`AND BuildTags.buildId NOT IN (
          SELECT BuildTags.buildId
          FROM BuildTags
          WHERE BuildTags.buildId = Build.id
          AND BuildTags.tag IN (${Prisma.join(allExcludedBuildTagIds)})
        )`;

  // If there are no included build tags, we want to include all default build tags
  // and exclude any excluded build tags
  if (allIncludedBuildTagIds.length === 0) {
    return Prisma.sql`AND (
      SELECT COUNT(*)
      FROM BuildTags
      WHERE BuildTags.buildId = Build.id
      AND BuildTags.tag IN (${Prisma.join(allDefaultBuildTagIds)})
      ${excludeBuildTagIdsQuery}
    )`;
  }

  // If there is only one included build tag, we want to ensure that all builds
  // returned have the included build tag. We also want to exclude any excluded
  // build tags
  if (allIncludedBuildTagIds.length === 1) {
    return Prisma.sql`AND (
      SELECT COUNT(*)
      FROM BuildTags
      WHERE BuildTags.buildId = Build.id
      AND BuildTags.tag IN (${Prisma.join(allIncludedBuildTagIds)})
      ${excludeBuildTagIdsQuery}
    )`;
  }

  // If the total included build tags is less than the max build tags, we want to
  // ensure that all included build tags are included in each returned build. We also
  // want to exclude any excluded build tags
  if (allIncludedBuildTagIds.length < MAX_BUILD_TAGS) {
    return Prisma.sql`AND (
      SELECT COUNT(*)
      FROM BuildTags
      WHERE BuildTags.buildId = Build.id
      AND BuildTags.tag IN (${Prisma.join(allIncludedBuildTagIds)})) = ${
        allIncludedBuildTagIds.length
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
    AND BuildTags.tag IN (${Prisma.join(allIncludedBuildTagIds)})
  ) = ${MAX_BUILD_TAGS}`;
}
