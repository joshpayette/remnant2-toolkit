import { getImageUrl, Tooltip } from '@repo/ui';

import {
  POPULAR_VOTE_THRESHOLD1,
  POPULAR_VOTE_THRESHOLD2,
} from '@/app/(builds)/_constants/popular-vote-thresholds';

export function PopularBuildBadge({ level }: { level: 1 | 2 }) {
  let src = '';
  let voteThreshold = 0;
  switch (level) {
    case 1:
      src = getImageUrl(`/badges/popular-badge-tier1.png`);
      voteThreshold = POPULAR_VOTE_THRESHOLD1;
      break;
    case 2:
      src = getImageUrl(`/badges/popular-badge-tier2.png`);
      voteThreshold = POPULAR_VOTE_THRESHOLD2;
      break;
    default:
      src = getImageUrl(`/badges/popular-badge-tier1.png`);
      voteThreshold = POPULAR_VOTE_THRESHOLD1;
  }

  return (
    <Tooltip
      content={`Awarded to builds that have ${voteThreshold}+ favorites!`}
    >
      <button aria-label="Badge denoting the build is popular">
        {/* <Image
          src={src}
          width={52}
          height={60}
          alt="image denoting the build is popular"
          className="h-[60px] max-h-[60px] w-[52px] max-w-[52px]"
          loading="eager"
          unoptimized={unoptimized}
          quality={100}
        /> */}
        <img
          src={src}
          width={52}
          height={60}
          alt="image denoting the build is popular"
        />
      </button>
    </Tooltip>
  );
}
