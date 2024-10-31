import { getImageUrl, Tooltip } from '@repo/ui';

export function NewBuildBadge() {
  return (
    <Tooltip content={`Denotes a build created in the past 24 hours.`}>
      <button aria-label="Badge denoting the build is a new build in the toolkit.">
        <img
          src={getImageUrl(`/badges/new-build-badge.png`)}
          width={52}
          height={60}
          alt="image denoting the build was created in the past 24 hours"
        />
      </button>
    </Tooltip>
  );
}
