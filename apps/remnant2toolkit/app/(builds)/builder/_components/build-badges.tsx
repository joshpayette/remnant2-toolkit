import { useBadges } from '@/app/_hooks/use-badges';
import { type BuildState } from '@/app/(builds)/_types/build-state';
import { FeaturedBuildBadge } from '@/app/(builds)/builder/_components/featured-build-badge';
import { GimmickBuildBadge } from '@/app/(builds)/builder/_components/gimmick-build-badge';
import { NewBuildBadge } from '@/app/(builds)/builder/_components/new-build-badge';
import { PopularBuildBadge } from '@/app/(builds)/builder/_components/popular-build-badge';

interface Props {
  buildState: BuildState;
  isScreenshotMode?: boolean;
}

export function BuildBadges({ buildState, isScreenshotMode = false }: Props) {
  const {
    hasNewBadge,
    hasGimmickBadge,
    hasPopularBadge,
    popularLevel,
    hasFeaturedBadge,
  } = useBadges({ buildState });

  return (
    <>
      {hasNewBadge ? <NewBuildBadge unoptimized={isScreenshotMode} /> : null}
      {hasPopularBadge ? (
        <PopularBuildBadge
          level={popularLevel}
          unoptimized={isScreenshotMode}
        />
      ) : null}
      {hasFeaturedBadge ? (
        <FeaturedBuildBadge unoptimized={isScreenshotMode} />
      ) : null}
      {hasGimmickBadge ? (
        <GimmickBuildBadge unoptimized={isScreenshotMode} />
      ) : null}
    </>
  );
}
