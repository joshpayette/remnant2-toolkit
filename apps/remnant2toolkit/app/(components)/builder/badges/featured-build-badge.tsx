import Image from 'next/image'

import { BaseButton } from '@repo/ui/base/button'
import { Tooltip } from '@/app/(components)/tooltip'
import { getImageUrl } from '@/app/(utils)/get-image-url'

export function FeaturedBuildBadge({
  unoptimized = false,
}: {
  unoptimized?: boolean
}) {
  return (
    <Tooltip content={`Denotes a featured build.`}>
      <BaseButton
        aria-label="Badge denoting the build is a featured build."
        plain
      >
        <Image
          src={getImageUrl(`/badges/featured_build_badge1.png`)}
          width={50}
          height={50}
          alt="Badge denoting the build is a featured build."
          className="h-[50px] max-h-[50px] w-[50px] max-w-[50px]"
          loading="eager"
          unoptimized={unoptimized}
        />
      </BaseButton>
    </Tooltip>
  )
}
