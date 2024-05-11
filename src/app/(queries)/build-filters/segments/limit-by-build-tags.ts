import { BUILD_TAG, Prisma } from '@prisma/client'

import { ALL_BUILD_TAGS } from '@/app/(components)/builder/build-tags/constants'

export function limitByBuildTagsSegment(tagValues: BUILD_TAG[]) {
  // ! Excluding this for now because it seems like we'd want to do this
  // ! different than archetypes, namely find all builds that include
  // ! the specified tags at a minimum.
  // const allExcludedTagValues = ALL_TAGS.map((tag) => tag.value).filter(
  //   (tag) => !tagValues.includes(tag),
  // )
  // const allExcludedTagValuesQuery =
  //   allExcludedTagValues.length === 0
  //     ? Prisma.empty
  //     : Prisma.sql`
  //     AND BuildTags.buildId NOT IN (
  //       SELECT BuildTags.buildId
  //       FROM BuildTags
  //       WHERE BuildTags.tag IN (${Prisma.join(allExcludedTagValues)})
  //     )
  //   `

  if (tagValues.length === 0) {
    return Prisma.empty
  }

  if (tagValues.length === 1) {
    return Prisma.sql`AND (
  SELECT COUNT(*)
  FROM BuildTags
  WHERE BuildTags.buildId = Build.id
  AND BuildTags.tag = ${tagValues[0]}
)`
  }

  if (tagValues.length >= 2) {
    return Prisma.sql`AND (
  SELECT COUNT(*)
  FROM BuildTags
  WHERE BuildTags.buildId = Build.id
  AND BuildTags.tag IN (${Prisma.join(tagValues)})
) = ${tagValues.length}`
    //     return Prisma.sql`AND (
    //   SELECT COUNT(*)
    //   FROM BuildTags
    //   WHERE BuildTags.buildId = Build.id
    //   AND BuildTags.tag IN (${Prisma.join(tagValues)})
    //   ${allExcludedTagValuesQuery}
    // )`
  }
}

export function buildTagsFilterToValues(buildTags: string[]): BUILD_TAG[] {
  const validTags = buildTags.filter((tag) =>
    ALL_BUILD_TAGS.some(
      (validTag) => validTag.value.toLowerCase() === tag.toLowerCase(),
    ),
  )

  return validTags as BUILD_TAG[]
}
