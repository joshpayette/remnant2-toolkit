import { cn } from '@/lib/utils'
import Image from 'next/image'
import type { ArmorSlot, Armor } from '@/data/armor'

/**
 * Defines the classes for each armor slot,
 * based on the slot name,
 * including the absolute positioning
 * @param slot The slot name
 * @returns The classes for the slot
 */
function getArmorClasses(slot: ArmorSlot): string {
  const baseClasses = 'absolute h-[60px] w-[60px] bg-black'

  switch (slot) {
    case 'helm':
      return cn(baseClasses, 'left-[310px] top-[163px]')
    case 'torso':
      return cn(baseClasses, 'left-[289px] top-[235px]')
    case 'legs':
      return cn(baseClasses, 'left-[275px] top-[308px]')
    case 'gloves':
      return cn(baseClasses, 'left-[286px] top-[380px]')
    case 'relic':
      return cn(baseClasses, 'left-[310px] top-[452px]')
    case 'amulet':
      return cn(baseClasses, 'left-[830px] top-[163px]')
    case 'ring1':
      return cn(baseClasses, 'left-[855px] top-[235px]')
    case 'ring2':
      return cn(baseClasses, 'left-[865px] top-[308px]')
    case 'ring3':
      return cn(baseClasses, 'left-[855px] top-[380px]')
    case 'ring4':
      return cn(baseClasses, 'left-[830px] top-[452px]')
  }
}

interface ArmorItemProps {
  onClick: () => void
  selectedArmor: Armor | null
  slot: ArmorSlot
}

export default function ArmorItem({
  onClick,
  selectedArmor,
  slot,
}: ArmorItemProps) {
  const armorClasses = getArmorClasses(slot)

  // return a clickable armorElement that displays a modal to select an armor
  return (
    <div className={armorClasses}>
      <button
        type="button"
        onClick={onClick}
        style={{ width: '100%', height: '100%' }}
      >
        {selectedArmor && (
          <Image
            src={selectedArmor.path}
            alt={selectedArmor.name}
            width="60"
            height="60"
            className="pointer-events-none object-cover group-hover:opacity-75"
          />
        )}
      </button>
    </div>
  )
}
