import { getImageUrl, Tooltip } from '@repo/ui';

export function GimmickBuildBadge() {
  return (
    <Tooltip content={`Denotes a gimmick build.`}>
      <button aria-label="Badge denoting the build is a gimmick build.">
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
