'use client';

import { BaseButton, DuplicateIcon } from '@repo/ui';
import { useRouter } from 'next/navigation';

import { Tooltip } from '@/app/_components/tooltip';
import { dbBuildToBuildState } from '@/app/(builds)/_libs/db-build-to-build-state';
import { handleDuplicateBuild } from '@/app/(builds)/_libs/handlers/handle-duplicate-build';
import { type DBBuild } from '@/app/(builds)/_types/db-build';

export function DuplicateBuildButton({ build }: { build: DBBuild }) {
  const router = useRouter();
  const buildState = dbBuildToBuildState(build);

  return (
    <Tooltip content="Duplicate Build">
      <BaseButton
        color="yellow"
        onClick={() =>
          handleDuplicateBuild({
            buildState,
            onDuplicate: (buildId: string) =>
              router.push(`/builder/${buildId}`),
          })
        }
        aria-label="Duplicate Build"
      >
        <DuplicateIcon className="h-4 w-4" />
      </BaseButton>
    </Tooltip>
  );
}
