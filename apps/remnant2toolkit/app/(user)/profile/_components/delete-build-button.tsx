'use client';

import { BaseButton, Tooltip, TrashIcon } from '@repo/ui';
import { useState } from 'react';

import { DeleteBuildAlert } from '@/app/(builds)/_components/delete-build-alert';
import { handleDeleteBuild } from '@/app/(builds)/_libs/handlers/handle-delete-build';

export function DeleteBuildButton({
  buildId,
  onDelete,
}: {
  buildId: string;
  onDelete: (buildId: string) => void;
}) {
  const [deleteAlertOpen, setDeleteAlertOpen] = useState(false);

  return (
    <>
      <DeleteBuildAlert
        open={deleteAlertOpen}
        onClose={() => setDeleteAlertOpen(false)}
        onDelete={() => {
          setDeleteAlertOpen(false);
          handleDeleteBuild({ buildId, onDelete });
        }}
      />
      <Tooltip content="Delete Build">
        <BaseButton
          color="red"
          aria-label="Delete Build"
          onClick={() => setDeleteAlertOpen(true)}
        >
          <TrashIcon className="h-4 w-4" />
        </BaseButton>
      </Tooltip>
    </>
  );
}
