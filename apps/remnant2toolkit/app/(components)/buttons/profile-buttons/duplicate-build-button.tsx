'use client';

import { BaseButton } from '@repo/ui/base/button';
import { DuplicateIcon } from '@repo/ui/icons/duplicate';

import { Tooltip } from '@/app/(components)/tooltip';
import { DBBuild } from '@/app/(features)/builds/types/db-build';
import { dbBuildToBuildState } from '@/app/(features)/builds/utils/db-build-to-build-state';
import { useBuildActions } from '@/app/(hooks)/use-build-actions';

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
