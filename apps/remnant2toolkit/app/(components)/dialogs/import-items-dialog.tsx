import { BaseInput } from '@repo/ui/base/input'
import type React from 'react'

import { BaseButton } from '@/app/(components)/_base/button'
import {
  BaseDialog,
  BaseDialogActions,
  BaseDialogBody,
  BaseDialogDescription,
  BaseDialogTitle,
} from '@/app/(components)/_base/dialog'
import { BaseField, BaseLabel } from '@/app/(components)/_base/fieldset'
import { BaseCode } from '@/app/(components)/_base/text'
import LocatingProfileSav from '@/app/(components)/dialogs/partial/locating-profile-sav'
import { ImportSaveSubmitButton } from '@/app/tracker/import-save-submit-button'

interface Props {
  open: boolean
  fileInputRef: React.RefObject<HTMLInputElement>
  onClose: () => void
  onSubmit: (payload: FormData) => void
}

export function ImportItemsDialog({
  open,
  fileInputRef,
  onClose,
  onSubmit,
}: Props) {
  return (
    <BaseDialog open={open} onClose={onClose}>
      <form action={onSubmit}>
        <BaseDialogTitle>Import Save</BaseDialogTitle>
        <BaseDialogDescription>
          Automatically import discovered items from your{' '}
          <BaseCode>profile.sav</BaseCode>
        </BaseDialogDescription>
        <BaseDialogDescription>
          <span className="text-red-500">
            Note: This will overwrite any existing discovered items and then
            reimport.
          </span>
        </BaseDialogDescription>
        <BaseDialogBody>
          <BaseField>
            <BaseLabel>Select Save File</BaseLabel>
            <BaseInput name="saveFile" type="file" ref={fileInputRef} />
          </BaseField>
        </BaseDialogBody>
        <BaseDialogActions>
          <BaseButton plain onClick={onClose}>
            Cancel
          </BaseButton>
          <ImportSaveSubmitButton
            label="Import profile.sav"
            className="w-[200px]"
          />
        </BaseDialogActions>
      </form>
      <LocatingProfileSav />
    </BaseDialog>
  )
}
