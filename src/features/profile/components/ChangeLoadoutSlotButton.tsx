import { ArrowPathRoundedSquareIcon } from '@heroicons/react/24/solid'
import { toast } from 'react-toastify'

import { changeLoadoutSlot } from '@/app/profile/loadout-builds/actions'
import { Tooltip } from '@/features/ui/Tooltip'

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
  return (
    <Tooltip content="Move to different loadout slot">
      <button
        className="flex flex-col items-center gap-y-1 text-xs text-primary-500 hover:text-primary-300"
        aria-label="Move to different loadout slot"
        onClick={async () => {
          const newSlot = prompt(
            'Enter the new loadout slot number (1-8). If the slot is already occupied, the loadout will be swapped with the loadout in that slot.',
          )

          if (!newSlot) {
            if (callback) callback(false, null)
            return
          }

          const newSlotNumber = parseInt(newSlot)
          if (isNaN(newSlotNumber) || newSlotNumber < 1 || newSlotNumber > 8) {
            if (callback) callback(false, null)
            toast.error('Invalid slot number')
            return
          }

          const response = await changeLoadoutSlot(buildId, newSlotNumber)
          if (!response.success) {
            if (callback) callback(false, null)
            toast.error('Failed to change loadout slot')
            return
          }
          if (callback) callback(true, response.newLoadouts ?? null)
          toast.success('Loadout slot changed successfully')
        }}
      >
        <ArrowPathRoundedSquareIcon className="h-5 w-5" /> Change Slot
      </button>
    </Tooltip>
  )
}
