import Image from 'next/image'
import type { LoadoutItem, LoadoutSlotType } from '@/types'

interface LoadoutTileProps {
  item: LoadoutItem
  slot: LoadoutSlotType
}

export default function ArmorTile({ item, slot }: LoadoutTileProps) {
  const isGunType =
    slot === 'mainhand' || slot === 'offhand' || slot === 'melee'

  return (
    <Image
      src={item.path}
      alt={item.name}
      width={isGunType ? 120 : 60}
      height={60}
      className="pointer-events-none object-cover group-hover:opacity-75"
    />
  )
}
