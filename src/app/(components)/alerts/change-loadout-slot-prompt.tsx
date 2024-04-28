'use client'

import { useState } from 'react'

import {
  BaseAlert,
  BaseAlertActions,
  BaseAlertBody,
  BaseAlertDescription,
  BaseAlertTitle,
} from '@/app/(components)/_base/alert'
import { BaseButton } from '@/app/(components)/_base/button'
import { BaseInput } from '@/app/(components)/_base/input'

interface Props {
  open: boolean
  onCancel: () => void
  onClose: () => void
  onConfirm: (newSlot: string) => void
}

export function ChangeLoadoutSlotPrompt({
  open,
  onCancel,
  onClose,
  onConfirm,
}: Props) {
  const [input, setInput] = useState('')
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false)

  return (
    <BaseAlert open={open} onClose={onClose}>
      <BaseAlertTitle>Change Loadout Slot</BaseAlertTitle>
      <BaseAlertDescription>
        Enter the new loadout slot. If the slot is already occupied, this
        loadout will be swapped with the loadout in that slot.
      </BaseAlertDescription>
      <BaseAlertBody>
        <BaseInput
          autoFocus
          name="newSlot"
          type="number"
          aria-label="New slot"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          min={1}
          max={8}
        />
      </BaseAlertBody>
      <BaseAlertActions>
        <BaseButton plain onClick={onCancel}>
          Cancel
        </BaseButton>
        <BaseButton
          disabled={isSubmitDisabled || input.trim() === ''}
          onClick={() => {
            setIsSubmitDisabled(true)
            onConfirm(input)
          }}
        >
          Save
        </BaseButton>
      </BaseAlertActions>
    </BaseAlert>
  )
}
