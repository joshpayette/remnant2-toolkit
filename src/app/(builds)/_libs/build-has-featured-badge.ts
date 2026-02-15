import { type BuildState } from '@/app/(builds)/_types/build-state';
import { type DBBuild } from '@/app/(builds)/_types/db-build';

/**
 * We often need to know if a build has a featured badge for spacing and layout purposes.
 */
export function buildHasFeaturedBadge(build: DBBuild | BuildState): boolean {
  return (
    build.isFeaturedBuild || build.isBaseGameBuild || build.isBeginnerBuild
  );
}
