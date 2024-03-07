import { ArchiveBoxIcon } from '@heroicons/react/24/solid'

import { Tooltip } from '@/features/ui/Tooltip'

export function AddToLoadoutButton({ onClick }: { onClick: () => void }) {
  return (
    <Tooltip content="Add To Loadout">
      <button
        className="text-secondary-500 hover:text-secondary-300"
        aria-label="Add to your pinned loadouts"
        onClick={onClick}
      >
        <ArchiveBoxIcon className="h-5 w-5" />
      </button>
    </Tooltip>
  )
}
