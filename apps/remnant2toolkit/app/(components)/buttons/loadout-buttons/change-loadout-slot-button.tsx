'use client'

import { ArrowPathRoundedSquareIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'
import { toast } from 'react-toastify'

import { changeLoadoutSlot } from '@/app/(actions)/loadouts/change-loadout-slot'
import { BaseButton } from '@/app/(components)/_base/button'
import { ChangeLoadoutSlotPrompt } from '@/app/(components)/alerts/change-loadout-slot-prompt'
import { Tooltip } from '@/app/(components)/tooltip'

export function ChangeLoadoutSlotButton({
  buildId,
  callback,
}: {
  buildId: string
  callback?: (
    success: boolean,
    newLoadouts: {
      oldSlot: number
      newSlot: number
    } | null,
  ) => void
}) {
  const [alertOpen, setAlertOpen] = useState(false)

  async function handleConfirm(newSlot: string) {
    const newSlotNumber = parseInt(newSlot)
    if (isNaN(newSlotNumber) || newSlotNumber < 1 || newSlotNumber > 8) {
      if (callback) callback(false, null)
      setAlertOpen(false)
      toast.error('Invalid slot number')
      return
    }

    const response = await changeLoadoutSlot(buildId, newSlotNumber)
    if (!response.success) {
      if (callback) callback(false, null)
      toast.error('Failed to change loadout slot')
      setAlertOpen(false)
      return
    }
    if (callback) callback(true, response.newLoadouts ?? null)
    toast.success('Loadout slot changed successfully')
    setAlertOpen(false)
  }

  function handleCancel() {
    if (callback) {
      callback(false, null)
    }
    setAlertOpen(false)
  }

  return (
    <>
      <ChangeLoadoutSlotPrompt
        open={alertOpen}
        onCancel={handleCancel}
        onClose={() => setAlertOpen(false)}
        onConfirm={handleConfirm}
      />
      <Tooltip content="Move to different loadout slot">
        <BaseButton
          color="cyan"
          className="flex flex-col items-center gap-y-1 text-xs"
          aria-label="Move to different loadout slot"
          onClick={() => setAlertOpen(true)}
        >
          <ArrowPathRoundedSquareIcon className="h-5 w-5" />
        </BaseButton>
      </Tooltip>
    </>
  )
}
