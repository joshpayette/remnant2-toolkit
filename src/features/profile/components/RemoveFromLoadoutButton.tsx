import { toast } from 'react-toastify'

import { removeBuildFromLoadout } from '@/app/profile/loadout-builds/actions'

export function RemoveFromLoadoutButton({
  buildId,
  slot,
}: {
  buildId: string
  slot: number
}) {
  return (
    <button
      className="text-red-500 hover:text-red-300"
      aria-label="Remove from your pinned loadouts"
      onClick={async () => {
        const response = await removeBuildFromLoadout(buildId, slot)
        if (!response.success) {
          toast.error('Failed to remove build from loadout')
          return
        }
        toast.success('Build removed from loadout')
      }}
    >
      Remove From Loadout
    </button>
  )
}
