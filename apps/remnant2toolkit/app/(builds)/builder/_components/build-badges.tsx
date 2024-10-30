import { useBadges } from '@/app/_hooks/use-badges';
import { type BuildState } from '@/app/(builds)/_types/build-state';
import { BaseGameBuildBadge } from '@/app/(builds)/builder/_components/base-game-build-badge';
import { FeaturedBuildBadge } from '@/app/(builds)/builder/_components/featured-build-badge';
import { GimmickBuildBadge } from '@/app/(builds)/builder/_components/gimmick-build-badge';
import { NewBuildBadge } from '@/app/(builds)/builder/_components/new-build-badge';
import { PopularBuildBadge } from '@/app/(builds)/builder/_components/popular-build-badge';

import { BeginnerBuildBadge } from './beginner-build-badge';

interface Props {
  buildState: BuildState;
}

export function BuildBadges({ buildState }: Props) {
  const {
    hasBaseGameBadge,
    hasNewBadge,
    hasGimmickBadge,
    hasPopularBadge,
    popularLevel,
    hasFeaturedBadge,
    hasBeginnerBadge,
  } = useBadges({ buildState });

  return (
    <>
      {hasNewBadge ? <NewBuildBadge /> : null}
      {hasPopularBadge ? <PopularBuildBadge level={popularLevel} /> : null}
      {hasFeaturedBadge ? <FeaturedBuildBadge /> : null}
      {hasGimmickBadge ? <GimmickBuildBadge /> : null}
      {hasBeginnerBadge ? <BeginnerBuildBadge /> : null}
      {hasBaseGameBadge ? <BaseGameBuildBadge /> : null}
    </>
  );
}
