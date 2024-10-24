import { getImageUrl } from '@repo/ui';
import Image from 'next/image';

import { Tooltip } from '@/app/_components/tooltip';

export function BeginnerBuildBadge({
  unoptimized = false,
}: {
  unoptimized?: boolean;
}) {
  return (
    <Tooltip content={`Denotes a base game build.`}>
      <button aria-label="Badge denoting the build is a base game build.">
        {/* <Image
          src={getImageUrl(`/badges/beginner-build-badge.png`)}
          width={52}
          height={60}
          alt="Badge denoting the build is a base game build."
          loading="eager"
          unoptimized={unoptimized}
          quality={100}
        /> */}
        <img
          src={getImageUrl(`/badges/beginner-build-badge.png`)}
          width={52}
          height={60}
          alt="Badge denoting the build is a base game build."
        />
      </button>
    </Tooltip>
  );
}
