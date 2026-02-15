import { buildHasFeaturedBadge } from '@/app/(builds)/_libs/build-has-featured-badge';
import { isBuildNew } from '@/app/(builds)/_libs/is-build-new';
import { isBuildPopular } from '@/app/(builds)/_libs/is-build-popular';
import { type BuildState } from '@/app/(builds)/_types/build-state';

export function useBadges({ buildState }: { buildState: BuildState }) {
  const { isPopular: hasPopularBadge, popularLevel } = isBuildPopular(
    buildState.totalUpvotes,
  );

  const hasNewBadge = isBuildNew(buildState.createdAt);
  const hasFeaturedBadge = buildHasFeaturedBadge(buildState);
  const hasGimmickBadge = buildState.isGimmickBuild;
  const hasBeginnerBadge = buildState.isBeginnerBuild;
  const hasBaseGameBadge = buildState.isBaseGameBuild;

  const hasAnyBadge =
    hasNewBadge ||
    hasPopularBadge ||
    hasFeaturedBadge ||
    hasGimmickBadge ||
    hasBeginnerBadge ||
    hasBaseGameBadge;

  return {
    hasAnyBadge,
    hasNewBadge,
    hasPopularBadge,
    popularLevel,
    hasFeaturedBadge,
    hasGimmickBadge,
    hasBeginnerBadge,
    hasBaseGameBadge,
  };
}
