import { toast } from 'react-toastify'

import { addBuildToLoadout } from '@/app/profile/loadout-builds/actions'

export function AddToLoadoutButton({ buildId }: { buildId: string }) {
  return (
    <button
      className="text-purple-500 hover:text-purple-300"
      aria-label="Add to your pinned loadouts"
      onClick={async () => {
        const prompt = window.prompt('Which loadout slot? (1-8)', '1')
        if (!prompt) return
        const slot = parseInt(prompt)
        if (slot < 1 || slot > 8) {
          toast.error('Invalid slot')
          return
        }

        const response = await addBuildToLoadout(buildId, slot)
        if (!response.success) {
          toast.error('Failed to add build to loadout')
          return
        }
        toast.success('Build added to loadout')
      }}
    >
      Add To Loadout
    </button>
  )
}
