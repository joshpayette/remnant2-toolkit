import { cn } from '@/lib/utils'
import ArmorTile from '@/components/loadout-tile'
import type { LoadoutItem, LoadoutSlotType } from '@/types/index'

interface LayoutTileButtonProps {
  item: LoadoutItem | null
  slot: LoadoutSlotType
  onClick: () => void
}

export default function LayoutTileButton({
  item,
  slot,
  onClick,
}: LayoutTileButtonProps) {
  const isGunType =
    slot === 'mainhand' || slot === 'offhand' || slot === 'melee'

  const isArmorSet = item !== null

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'border-2 border-purple-800 p-2',
        !isArmorSet && 'border-dashed border-gray-900',
        isGunType ? 'h-[80px] w-[160px]' : 'h-[80px] w-[80px]',
      )}
    >
      {isArmorSet ? <ArmorTile item={item} slot={slot} /> : null}
    </button>
  )
}
