import { TrashIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'
import { toast } from 'react-toastify'

import { Button } from '@/app/(components)/_base/button'
import { RemoveFromLoadoutAlert } from '@/app/(components)/alerts/remove-from-loadout-alert'
import { removeBuildFromLoadout } from '@/features/loadouts/actions/removeBuildFromLoadout'
import { Tooltip } from '@/features/ui/Tooltip'

export function RemoveFromLoadoutButton({
  buildId,
  slot,
  callback,
}: {
  buildId: string
  slot: number
  callback?: (success: boolean) => void
}) {
  const [alertOpen, setAlertOpen] = useState(false)

  async function handleRemoveFromLoadout() {
    const response = await removeBuildFromLoadout(buildId, slot)
    if (!response.success) {
      if (callback) callback(false)
      toast.error('Failed to remove build from loadout')
      setAlertOpen(false)
      return
    }
    if (callback) callback(true)
    toast.success('Build removed from loadout')
    setAlertOpen(false)
  }

  function handleCancel() {
    if (callback) callback(false)
    setAlertOpen(false)
  }

  return (
    <>
      <RemoveFromLoadoutAlert
        open={alertOpen}
        onClose={() => setAlertOpen(false)}
        onCancel={handleCancel}
        onConfirm={handleRemoveFromLoadout}
      />
      <Tooltip content="Remove From loadout?">
        <Button
          color="red"
          className="flex flex-col items-center gap-y-1"
          aria-label="Remove from your pinned loadouts"
          onClick={() => setAlertOpen(true)}
        >
          <TrashIcon className="h-5 w-5" />
        </Button>
      </Tooltip>
    </>
  )
}
