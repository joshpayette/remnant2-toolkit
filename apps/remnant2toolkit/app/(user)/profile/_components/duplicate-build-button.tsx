'use client';

import { BaseButton, DuplicateIcon } from '@repo/ui';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Tooltip } from '@/app/_components/tooltip';
import { dbBuildToBuildVariants } from '@/app/(builds)/_libs/db-build-to-build-variants';
import { handleDuplicateBuild } from '@/app/(builds)/_libs/handlers/handle-duplicate-build';
import { type BuildState } from '@/app/(builds)/_types/build-state';
import { type DBBuild } from '@/app/(builds)/_types/db-build';

export async function DuplicateBuildButton({ build }: { build: DBBuild }) {
  const router = useRouter();

  const [buildVariants, setBuildVariants] = useState<BuildState[]>([]);

  useEffect(() => {
    async function getVariants() {
      const response = await dbBuildToBuildVariants(build);
      setBuildVariants(response);
    }
    getVariants();
  }, [build]);

  return (
    <Tooltip content="Duplicate Build">
      <BaseButton
        color="yellow"
        onClick={() =>
          handleDuplicateBuild({
            buildVariants,
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
