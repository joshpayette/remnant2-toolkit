import { ArchiveBoxIcon, PlusIcon } from '@heroicons/react/24/solid'

import { Tooltip } from '@/features/ui/Tooltip'

export function AddToLoadoutButton({ onClick }: { onClick: () => void }) {
  return (
    <Tooltip content="Add To Loadout">
      <button
        className="flex flex-col items-center gap-y-1 text-xs text-accent2-500 hover:text-accent2-300"
        aria-label="Add to your pinned loadouts"
        onClick={onClick}
      >
        <PlusIcon className="h-5 w-5" /> Add to Loadout
      </button>
    </Tooltip>
  )
}
