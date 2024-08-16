import type { BuildState, DBBuild } from '@/app/(types)/builds'

/**
 * We often need to know if a build has a featured badge for spacing and layout purposes.
 */
export function buildHasFeaturedBadge(build: DBBuild | BuildState): boolean {
  return build.isFeaturedBuild || build.isBaseGameBuild || build.isBeginnerBuild
}
