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
import { BaseInput } from '@/app/(components)/_base/input'
import {
  BaseListbox,
  BaseListboxLabel,
  BaseListboxOption,
} from '@/app/(components)/_base/listbox'
import { BaseCode } from '@/app/(components)/_base/text'
import LocatingProfileSav from '@/app/(components)/dialogs/partial/locating-profile-sav'
import type { DBBuild } from '@/app/(types)/builds'
import { getArrayOfLength } from '@/app/(utils)/get-array-of-length'
import { ImportSaveSubmitButton } from '@/app/tracker/import-save-submit-button'

interface Props {
  open: boolean
  fileInputRef: React.RefObject<HTMLInputElement>
  existingLoadouts: Array<DBBuild & { slot: number }>
  onClose: () => void
  onSubmit: (payload: FormData) => void
}

export function ImportLoadoutsDialog({
  open,
  existingLoadouts,
  fileInputRef,
  onClose,
  onSubmit,
}: Props) {
  return (
    <BaseDialog open={open} onClose={onClose}>
      <form action={onSubmit}>
        <BaseDialogTitle>Import Save</BaseDialogTitle>
        <BaseDialogDescription>
          Automatically import your in-game loadouts from your{' '}
          <BaseCode>profile.sav</BaseCode>
        </BaseDialogDescription>
        <BaseDialogDescription>
          <span className="text-red-500">
            Note: This will overwrite any existing loadouts and then reimport.
          </span>
        </BaseDialogDescription>
        <BaseDialogBody>
          <BaseField className="mb-2">
            <BaseLabel>Character Slot (1-5)</BaseLabel>
            <BaseInput
              type="number"
              min="1"
              max="5"
              name="characterSlot"
              defaultValue="1"
            />
          </BaseField>
          <BaseField className="mb-2">
            <BaseLabel>Loadouts to Replace</BaseLabel>
            <BaseListbox name="loadoutsToReplace" multiple>
              {getArrayOfLength(8).map((_, index) => {
                const loadout = existingLoadouts.find(
                  (loadout) => loadout.slot === index + 1,
                )

                return (
                  <BaseListboxOption key={index} value={index + 1}>
                    <BaseListboxLabel>
                      {index + 1}. {loadout?.name ?? 'Empty Slot'}
                    </BaseListboxLabel>
                  </BaseListboxOption>
                )
              })}
            </BaseListbox>
          </BaseField>
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
