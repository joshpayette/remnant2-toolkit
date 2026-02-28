import { Tooltip } from '@/ui/common/tooltip';
import { getImageUrl } from '@/utils/get-image-url';

export function BaseGameBuildBadge() {
  return (
    <Tooltip content={`Denotes a base game build.`}>
      <button aria-label="Badge denoting the build is a base game build.">
        {/* <Image
          src={getImageUrl(`/badges/base-game-build-badge.png`)}
          width={52}
          height={60}
          alt="Badge denoting the build is a base game build."
          loading="eager"
          unoptimized={unoptimized}
          quality={100}
        /> */}
        <img
          src={getImageUrl(`/badges/base-game-build-badge.png`)}
          width={52}
          height={60}
          alt="Badge denoting the build is a base game build."
        />
      </button>
    </Tooltip>
  );
}
