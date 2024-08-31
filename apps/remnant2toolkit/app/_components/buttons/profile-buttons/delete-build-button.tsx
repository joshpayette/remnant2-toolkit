'use client';

import { BaseButton, TrashIcon } from '@repo/ui';
import { useState } from 'react';

import { Tooltip } from '@/app/_components/tooltip';
import { DeleteBuildAlert } from '@/app/(builds)/_components/delete-build-alert';
import { useBuildActions } from '@/app/(builds)/_hooks/use-build-actions';

export function DeleteBuildButton({
  buildId,
  onDelete,
}: {
  buildId: string;
  onDelete: (buildId: string) => void;
}) {
  const [deleteAlertOpen, setDeleteAlertOpen] = useState(false);
  const { handleDeleteBuild } = useBuildActions();

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
