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
import { BaseCode, BaseText, BaseTextLink } from '@/app/(components)/_base/text'
import { ImportSaveSubmitButton } from '@/app/tracker/import-save-submit-button'

interface Props {
  open: boolean
  description: React.ReactNode
  fileInputRef: React.RefObject<HTMLInputElement>
  onClose: () => void
  onSubmit: (payload: FormData) => void
}

export function ImportSaveDialog({
  open,
  description,
  fileInputRef,
  onClose,
  onSubmit,
}: Props) {
  return (
    <BaseDialog open={open} onClose={onClose}>
      <form action={onSubmit}>
        <BaseDialogTitle>Import Save</BaseDialogTitle>
        {description}
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
      <BaseDialogTitle>Locating Your Save</BaseDialogTitle>
      <BaseDialogBody>
        Steam
        <BaseText>
          Your save file is located at the following location:
          <br />
          <BaseCode>
            C:\Users\_your_username_\Saved
            Games\Remnant2\Steam\_steam_id_\profile.sav
          </BaseCode>
        </BaseText>
      </BaseDialogBody>
      <BaseDialogBody>
        XBox Game Pass
        <BaseText>
          This is a bit more complicated, but you can follow{' '}
          <BaseTextLink
            href="https://www.reddit.com/r/remnantgame/comments/187rfdq/transferring_save_files_from_pcsteam_to_xbox/"
            target="_blank"
          >
            this guide on Reddit by SpectralHunt
          </BaseTextLink>
          . Once you find your file, you can rename it to{' '}
          <BaseCode>profile.sav</BaseCode> and import it here.
        </BaseText>
      </BaseDialogBody>
      <BaseDialogBody>
        XBox
        <BaseText>
          I don&apos;t have the ability to test this, but I believe you can
          export your save file to a USB drive, then rename the file to
          <BaseCode>profile.sav</BaseCode> and import. If you can confirm this
          works, please use the blue bug report icon in the bottom right to get
          in touch.
        </BaseText>
      </BaseDialogBody>
      <BaseDialogBody>
        Playstation
        <BaseText>
          I could use some help with this one. If you know where the save is, or
          can provide a save that I can test with, I will happily try to make
          this work. Please use the blue bug report icon in the bottom right to
          get in touch.
        </BaseText>
      </BaseDialogBody>
    </BaseDialog>
  )
}
