'use client';

import { BaseButton, DuplicateIcon } from '@repo/ui';

import { Tooltip } from '@/app/_components/tooltip';
import { useBuildActions } from '@/app/(builds)/_hooks/use-build-actions';
import { dbBuildToBuildState } from '@/app/(builds)/_libs/db-build-to-build-state';
import { type DBBuild } from '@/app/(builds)/_types/db-build';

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
