'use client';

import { BaseButton, DuplicateIcon } from '@repo/ui';
import { useRouter } from 'next/navigation';

import { Tooltip } from '@/app/_components/tooltip';
import { handleDuplicateBuild } from '@/app/(builds)/_libs/handlers/handle-duplicate-build';
import { type LinkedBuildItem } from '@/app/(builds)/builder/linked/_types/linked-build-item';

export function DuplicateBuildButton({
  buildVariants,
}: {
  buildVariants: LinkedBuildItem[];
}) {
  const router = useRouter();

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
