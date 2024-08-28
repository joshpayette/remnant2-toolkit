import { BaseButton } from '@repo/ui';
import { getImageUrl } from '@repo/ui';
import Image from 'next/image';

import { Tooltip } from '@/app/(components)/tooltip';

export function NewBuildBadge({
  unoptimized = false,
}: {
  unoptimized?: boolean;
}) {
  return (
    <Tooltip content={`Denotes a build created in the past 24 hours.`}>
      <BaseButton
        aria-label="Badge denoting the build is a new build in the toolkit."
        plain
      >
        <Image
          src={getImageUrl(`/badges/new_build_badge1.png`)}
          width={50}
          height={50}
          alt="image denoting the build was created in the past 24 hours"
          loading="eager"
          unoptimized={unoptimized}
        />
      </BaseButton>
    </Tooltip>
  );
}
