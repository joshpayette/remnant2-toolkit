import { ArchiveBoxIcon, PlusIcon } from '@heroicons/react/24/solid'

import { Tooltip } from '@/features/ui/Tooltip'

export function AddToLoadoutButton({ onClick }: { onClick: () => void }) {
  return (
    <Tooltip content="Add To Loadout">
      <button
        className="text-accent2-500 hover:text-accent2-300"
        aria-label="Add to your pinned loadouts"
        onClick={onClick}
      >
        <PlusIcon className="h-6 w-6" />
      </button>
    </Tooltip>
  )
}
