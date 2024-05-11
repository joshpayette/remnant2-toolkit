import Image from 'next/image'

import { BaseButton } from '@/app/(components)/_base/button'
import { Tooltip } from '@/app/(components)/tooltip'
import {
  POPULAR_VOTE_THRESHOLD1,
  POPULAR_VOTE_THRESHOLD2,
} from '@/app/(data)/builds/constants'

export function PopularBuildBadge({
  level,
  unoptimized = false,
}: {
  level: 1 | 2
  unoptimized?: boolean
}) {
  let src = ''
  let voteThreshold = 0
  switch (level) {
    case 1:
      src = `https://${process.env.NEXT_PUBLIC_IMAGE_URL}/badges/popular_badge_tier1.png`
      voteThreshold = POPULAR_VOTE_THRESHOLD1
      break
    case 2:
      src = `https://${process.env.NEXT_PUBLIC_IMAGE_URL}/badges/popular_badge_tier2.png`
      voteThreshold = POPULAR_VOTE_THRESHOLD2
      break
    default:
      src = '/popular_badge1.webp'
      voteThreshold = POPULAR_VOTE_THRESHOLD1
  }

  return (
    <Tooltip
      content={`Awarded to builds that have ${voteThreshold}+ favorites!`}
    >
      <BaseButton aria-label="Badge denoting the build is popular" plain>
        <Image
          src={src}
          width={52}
          height={60}
          alt="image denoting the build is popular"
          className="h-[60px] max-h-[60px] w-[52px] max-w-[52px]"
          loading="eager"
          unoptimized={unoptimized}
        />
      </BaseButton>
    </Tooltip>
  )
}
