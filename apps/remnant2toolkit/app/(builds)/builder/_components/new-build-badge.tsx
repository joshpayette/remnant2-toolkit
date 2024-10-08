import { getImageUrl } from '@repo/ui';
import Image from 'next/image';

import { Tooltip } from '@/app/_components/tooltip';

export function NewBuildBadge({
  unoptimized = false,
}: {
  unoptimized?: boolean;
}) {
  return (
    <Tooltip content={`Denotes a build created in the past 24 hours.`}>
      <button aria-label="Badge denoting the build is a new build in the toolkit.">
        <Image
          src={getImageUrl(`/badges/new-build-badge.png`)}
          width={52}
          height={60}
          alt="image denoting the build was created in the past 24 hours"
          loading="eager"
          unoptimized={unoptimized}
          quality={100}
        />
      </button>
    </Tooltip>
  );
}
