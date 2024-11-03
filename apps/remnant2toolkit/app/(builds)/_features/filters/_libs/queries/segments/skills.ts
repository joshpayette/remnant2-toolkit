import { Prisma } from '@repo/db';
import isEqual from 'lodash.isequal';

import { MAX_ALLOWED_SKILLS } from '@/app/(builds)/_constants/max-allowed-skills';
import { DEFAULT_BUILD_FIELDS } from '@/app/(builds)/_features/filters/_constants/default-build-fields';
import type { SkillFilterValue } from '@/app/(builds)/_features/filters/_libs/filters/skill-filter';
import { skillItems } from '@/app/(items)/_constants/skill-items';

export function limitBySkillsSegment(
  skillFilters: SkillFilterValue,
): Prisma.Sql {
  // if the skills are the default filters, do nothing
  if (isEqual(skillFilters, DEFAULT_BUILD_FIELDS.skills)) {
    return Prisma.empty;
  }
  // If there are no filters, do nothing
  if (skillFilters.length === 0) {
    return Prisma.empty;
  }

  const allExcludedSkillNames = skillFilters
    .filter((option) => option.state === 'excluded')
    .map((option) => option.value);
  const allExcludedSkillIds = skillItems
    .filter((item) => allExcludedSkillNames.includes(item.name))
    .map((item) => item.id);

  const allIncludedSkillNames = skillFilters
    .filter((option) => option.state === 'included')
    .map((option) => option.value);
  const allIncludedSkillIds = skillItems
    .filter((item) => allIncludedSkillNames.includes(item.name))
    .map((item) => item.id);

  const allDefaultSkillNames = skillFilters
    .filter((option) => option.state === 'default')
    .map((option) => option.value);
  const allDefaultSkillIds = skillItems
    .filter((item) => allDefaultSkillNames.includes(item.name))
    .map((item) => item.id);

  if (allIncludedSkillIds.length === 0 && allExcludedSkillIds.length === 0) {
    return Prisma.empty;
  }

  const excludeSkillIdsQuery =
    allExcludedSkillIds.length === 0
      ? Prisma.empty
      : Prisma.sql`AND BuildItems.buildId NOT IN (
          SELECT BuildItems.buildId
          FROM BuildItems
          WHERE BuildItems.buildId = Build.id
          AND BuildItems.itemId IN (${Prisma.join(allExcludedSkillIds)})
        )`;

  // If there are no included skills, we want to include all default skills
  // and exclude any excluded skills
  if (allIncludedSkillIds.length === 0) {
    return Prisma.sql`AND (
      SELECT COUNT(*)
      FROM BuildItems
      WHERE BuildItems.buildId = Build.id
      AND BuildItems.itemId IN (${Prisma.join(allDefaultSkillIds)})
      ${excludeSkillIdsQuery}
    )`;
  }

  // If there is only one included skill, we want to ensure that all builds
  // returned have the included skill. We also want to exclude any excluded
  // skills.
  if (allIncludedSkillIds.length === 1) {
    return Prisma.sql`AND (
      SELECT COUNT(*)
      FROM BuildItems
      WHERE BuildItems.buildId = Build.id
      AND BuildItems.itemId = ${allIncludedSkillIds[0]}
      ${excludeSkillIdsQuery}
    )`;
  }

  // If the total included skills is less than the max allowed skills,
  // we want to ensure that all included skills are included in each
  // returned build. We also want to exclude any excluded skills.
  if (allIncludedSkillIds.length < MAX_ALLOWED_SKILLS) {
    return Prisma.sql`AND (
      SELECT COUNT(*)
      FROM BuildItems
      WHERE BuildItems.buildId = Build.id
      AND BuildItems.itemId IN (${Prisma.join(allIncludedSkillIds)})) = ${
        allIncludedSkillIds.length
      }
      ${excludeSkillIdsQuery}`;
  }

  // If the total included skills is greater than or equal to the max allowed skills,
  // we want ot ensure that all builds returned have all slots filled with
  // included skills.
  return Prisma.sql`AND (
    SELECT COUNT(*)
    FROM BuildItems
    WHERE BuildItems.buildId = Build.id
    AND BuildItems.itemId IN (${Prisma.join(allIncludedSkillIds)})
  ) = ${MAX_ALLOWED_SKILLS}`;
}
