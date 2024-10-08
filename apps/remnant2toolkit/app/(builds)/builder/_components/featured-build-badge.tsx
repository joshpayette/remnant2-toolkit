import { getImageUrl } from '@repo/ui';
import Image from 'next/image';

import { Tooltip } from '@/app/_components/tooltip';

export function FeaturedBuildBadge({
  unoptimized = false,
}: {
  unoptimized?: boolean;
}) {
  return (
    <Tooltip content={`Denotes a featured build.`}>
      <button aria-label="Badge denoting the build is a featured build.">
        {/* <Image
          src={getImageUrl(`/badges/featured-build-badge.png`)}
          width={60}
          height={60}
          alt="Badge denoting the build is a featured build."
          loading="eager"
          unoptimized={unoptimized}
          quality={100}
        /> */}
        <img
          src={getImageUrl(`/badges/featured-build-badge.png`)}
          width={60}
          height={60}
          alt="Badge denoting the build is a featured build."
        />
      </button>
    </Tooltip>
  );
}
