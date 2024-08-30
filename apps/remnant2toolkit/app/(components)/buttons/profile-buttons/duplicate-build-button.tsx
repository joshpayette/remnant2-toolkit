'use client';

import { BaseButton, DuplicateIcon } from '@repo/ui';

import { useBuildActions } from '@/app/(builds)/_hooks/use-build-actions';
import { type DBBuild } from '@/app/(builds)/_types/db-build';
import { dbBuildToBuildState } from '@/app/(builds)/_utils/db-build-to-build-state';
import { Tooltip } from '@/app/(components)/tooltip';

export function DuplicateBuildButton({ build }: { build: DBBuild }) {
  const buildState = dbBuildToBuildState(build);
  const { handleDuplicateBuild } = useBuildActions();

  return (
    <Tooltip content="Duplicate Build">
      <BaseButton
        color="yellow"
        onClick={() => handleDuplicateBuild(buildState)}
        aria-label="Duplicate Build"
      >
        <DuplicateIcon className="h-4 w-4" />
      </BaseButton>
    </Tooltip>
  );
}
