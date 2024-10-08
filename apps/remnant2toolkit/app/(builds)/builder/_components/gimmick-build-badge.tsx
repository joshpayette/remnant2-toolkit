import { getImageUrl } from '@repo/ui';
import Image from 'next/image';

import { Tooltip } from '@/app/_components/tooltip';

export function GimmickBuildBadge({
  unoptimized = false,
}: {
  unoptimized?: boolean;
}) {
  return (
    <Tooltip content={`Denotes a gimmick build.`}>
      <button aria-label="Badge denoting the build is a gimmick build.">
        {/* <Image
          src={getImageUrl(`/badges/gimmick-build-badge.png`)}
          width={52}
          height={60}
          alt="Badge denoting the build is a gimmick build."
          loading="eager"
          unoptimized={unoptimized}
          quality={100}
        /> */}
        <img
          src={getImageUrl(`/badges/gimmick-build-badge.png`)}
          width={52}
          height={60}
          alt="Badge denoting the build is a gimmick build."
        />
      </button>
    </Tooltip>
  );
}
