'use client'

import { useEffect, useRef, useState } from 'react'
import { useFormState } from 'react-dom'
import { toast } from 'react-toastify'

import { BaseButton } from '@/app/(components)/_base/button'
import { BaseDialogDescription } from '@/app/(components)/_base/dialog'
import { BaseCode } from '@/app/(components)/_base/text'
import { ImportSaveDialog } from '@/app/(components)/dialogs/import-save-dialog'
import { parseSaveFile } from '@/app/profile/[userId]/loadouts/actions/parse-save-file'

export default function ImportLoadouts() {
  const [importSaveDialogOpen, setImportSaveDialogOpen] = useState(false)
  const saveFileInputRef = useRef<HTMLInputElement | null>(null)

  const [uploadSaveFormResponse, saveFileFormAction] = useFormState(
    parseSaveFile,
    {
      loadouts: null,
    },
  )

  // If the upload save file form response changes, we need to set the save data
  useEffect(() => {
    if (!uploadSaveFormResponse) return

    const { loadouts, error } = uploadSaveFormResponse

    if (error) {
      saveFileInputRef.current = null
      setImportSaveDialogOpen(false)
      toast.error(error)
      return
    }

    if (!loadouts) return

    // TODO - Impelement the logic for adding the layouts to the page
    console.info('loadouts', loadouts)

    saveFileInputRef.current = null

    setImportSaveDialogOpen(false)
    toast.success('Save file imported successfully!')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [uploadSaveFormResponse])

  return (
    <div className="mb-4 grid w-full grid-cols-1 gap-2">
      <ImportSaveDialog
        open={importSaveDialogOpen}
        description={
          <>
            <BaseDialogDescription>
              Automatically import your in-game loadouts from your{' '}
              <BaseCode>profile.sav</BaseCode>
            </BaseDialogDescription>
            <BaseDialogDescription>
              <span className="text-red-500">
                Note: This will overwrite any existing loadouts and then
                reimport.
              </span>
            </BaseDialogDescription>
          </>
        }
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
    </div>
  )
}
