import {
  BaseButton,
  BaseCode,
  BaseDialog,
  BaseDialogActions,
  BaseDialogBody,
  BaseDialogDescription,
  BaseDialogTitle,
  BaseField,
  BaseInput,
  BaseLabel,
  BaseListbox,
  BaseListboxLabel,
  BaseListboxOption,
} from '@repo/ui';
import { getArrayOfLength } from '@repo/utils/get-array-of-length';
import type React from 'react';

import LocatingProfileSav from '@/app/(components)/dialogs/partial/locating-profile-sav';
import { DBBuild } from '@/app/(features)/builds/types/db-build';
import { ImportSaveSubmitButton } from '@/app/tracker/import-save-submit-button';

interface Props {
  open: boolean;
  fileInputRef: React.RefObject<HTMLInputElement>;
  existingLoadouts: Array<DBBuild & { slot: number }>;
  onClose: () => void;
  onSubmit: (payload: FormData) => void;
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
          A big thanks to Andrew Savinykh for the help with parsing loadouts
          from profile.sav files.
        </BaseDialogDescription>
        <BaseDialogDescription>
          <span className="font-bold text-red-500 underline">
            This feature is in beta and may have bugs. Please report any issues
            you find in the Discord, or by clicking the Cog then Bug icon at the
            lower right of the site.
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
            <p className="mb-2 text-sm text-zinc-400">
              This will replace the loadouts in the selected slots with the new
              loadouts.
            </p>
            <BaseListbox
              name="loadoutsToReplace"
              multiple
              defaultValue={[1, 2, 3, 4, 5, 6, 7, 8]}
            >
              {getArrayOfLength(8).map((_, index) => {
                const loadout = existingLoadouts.find(
                  (loadout) => loadout.slot === index + 1,
                );

                return (
                  <BaseListboxOption key={index} value={index + 1}>
                    <BaseListboxLabel>
                      {index + 1}. {loadout?.name ?? 'Empty Slot'}
                    </BaseListboxLabel>
                  </BaseListboxOption>
                );
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
  );
}
