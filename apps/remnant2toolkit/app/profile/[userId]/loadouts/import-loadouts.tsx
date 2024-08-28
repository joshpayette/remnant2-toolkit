'use client';

import { BaseButton } from '@repo/ui';
import { useEffect, useRef, useState } from 'react';
import { useFormState } from 'react-dom';
import { toast } from 'react-toastify';

import { DBBuild } from '@/app/(features)/builds/types/db-build';
import { ImportLoadoutsDialog } from '@/app/(features)/loadouts/components/dialogs/import-loadouts-dialog';
import { parseSaveFile } from '@/app/profile/[userId]/loadouts/actions/parse-save-file';

interface Props {
  existingLoadouts: Array<DBBuild & { slot: number }>;
}

export default function ImportLoadouts({ existingLoadouts }: Props) {
  const [importSaveDialogOpen, setImportSaveDialogOpen] = useState(false);
  const saveFileInputRef = useRef<HTMLInputElement | null>(null);

  const [uploadSaveFormResponse, saveFileFormAction] = useFormState(
    parseSaveFile,
    {
      status: 'error',
      message: '',
    },
  );

  // If the upload save file form response changes, we need to set the save data
  useEffect(() => {
    if (uploadSaveFormResponse.message === '') return;

    const { status, message } = uploadSaveFormResponse;

    setImportSaveDialogOpen(false);
    saveFileInputRef.current = null;

    if (status === 'error') {
      toast.error(message);
      return;
    }
    toast.success('Save file imported successfully!');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uploadSaveFormResponse]);

  return (
    <>
      <ImportLoadoutsDialog
        open={importSaveDialogOpen}
        existingLoadouts={existingLoadouts}
        onClose={() => setImportSaveDialogOpen(false)}
        onSubmit={saveFileFormAction}
        fileInputRef={saveFileInputRef}
      />
      <BaseButton
        color="cyan"
        className="w-[200px]"
        onClick={() => setImportSaveDialogOpen(true)}
      >
        Import Loadouts
      </BaseButton>
    </>
  );
}
