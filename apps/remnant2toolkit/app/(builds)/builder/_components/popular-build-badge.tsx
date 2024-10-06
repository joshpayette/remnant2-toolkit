import { getImageUrl } from '@repo/ui';
import Image from 'next/image';

import { Tooltip } from '@/app/_components/tooltip';
import {
  POPULAR_VOTE_THRESHOLD1,
  POPULAR_VOTE_THRESHOLD2,
} from '@/app/(builds)/_constants/popular-vote-thresholds';

export function PopularBuildBadge({
  level,
  unoptimized = false,
}: {
  level: 1 | 2;
  unoptimized?: boolean;
}) {
  let src = '';
  let voteThreshold = 0;
  switch (level) {
    case 1:
      src = getImageUrl(`/badges/popular_badge_tier1.png`);
      voteThreshold = POPULAR_VOTE_THRESHOLD1;
      break;
    case 2:
      src = getImageUrl(`/badges/popular_badge_tier2.png`);
      voteThreshold = POPULAR_VOTE_THRESHOLD2;
      break;
    default:
      src = getImageUrl(`/badges/popular_badge_tier1.png`);
      voteThreshold = POPULAR_VOTE_THRESHOLD1;
  }

  return (
    <Tooltip
      content={`Awarded to builds that have ${voteThreshold}+ favorites!`}
    >
      <button aria-label="Badge denoting the build is popular">
        <Image
          src={src}
          width={52}
          height={60}
          alt="image denoting the build is popular"
          className="h-[60px] max-h-[60px] w-[52px] max-w-[52px]"
          loading="eager"
          unoptimized={unoptimized}
        />
      </button>
    </Tooltip>
  );
}
