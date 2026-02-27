'use client';

import { useRouter } from 'next/navigation';

import { BaseButton } from '@/ui/base/button';
import { EditIcon } from '@/ui/common/icons/edit';
import { Tooltip } from '@/ui/common/tooltip';

export function EditBuildButton({ buildId }: { buildId: string }) {
  const router = useRouter();

  function handleEditBuild() {
    router.push(`/builder/edit/${buildId}`);
  }

  return (
    <Tooltip content="Edit Build">
      <BaseButton
        color="green"
        onClick={handleEditBuild}
        aria-label="Edit Build"
      >
        <EditIcon className="h-4 w-4" />
      </BaseButton>
    </Tooltip>
  );
}
