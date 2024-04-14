'use client'

import { useState } from 'react'

import {
  Alert,
  AlertActions,
  AlertBody,
  AlertDescription,
  AlertTitle,
} from '@/app/(components)/_base/alert'
import { Button } from '@/app/(components)/_base/button'
import { Input } from '@/app/(components)/_base/input'

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

  return (
    <Alert open={open} onClose={onClose}>
      <AlertTitle>Change Loadout Slot</AlertTitle>
      <AlertDescription>
        Enter the new loadout slot. If the slot is already occupied, this
        loadout will be swapped with the loadout in that slot.
      </AlertDescription>
      <AlertBody>
        <Input
          autoFocus
          name="newSlot"
          type="number"
          aria-label="New slot"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          min={1}
          max={8}
        />
      </AlertBody>
      <AlertActions>
        <Button plain onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={() => onConfirm(input)}>Save</Button>
      </AlertActions>
    </Alert>
  )
}
