import Image from 'next/image'

import { Tooltip } from '@/features/ui/Tooltip'

import { POPULAR_VOTE_THRESHOLD } from '../constants'

export function PopularBuildBadge() {
  return (
    <Tooltip
      content={`Awarded to builds that exceed ${POPULAR_VOTE_THRESHOLD} favorites!`}
    >
      <button aria-label="Badge denoting the build is popular">
        <Image
          src={`https://${process.env.NEXT_PUBLIC_IMAGE_URL}/badges/popular_build_badge.png`}
          width={50}
          height={50}
          alt="image denoting the build is popular"
          className="h-[50px] w-[50px]"
        />
      </button>
    </Tooltip>
  )
}
