'use client'

import { Fragment, useState } from 'react'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import ArmorSelect from '@/components/armor-select'
import type { ArmorSlot, Armor } from '@/data/armor'

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

interface ArmorProps {
  slot: ArmorSlot
}

function Armor({ slot }: ArmorProps): JSX.Element {
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedArmor, setSelectedArmor] = useState<Armor | null>(null)

  const armorClasses = getArmorClasses(slot)

  // return a clickable armorElement that displays a modal to select an armor
  return (
    <Fragment>
      <ArmorSelect
        slot={slot}
        open={modalOpen}
        onSelectArmor={(armor) => {
          setSelectedArmor(armor)
          setModalOpen(false)
        }}
        onClose={() => setModalOpen(false)}
      />
      <button type="button" onClick={() => setModalOpen(true)}>
        <div className={armorClasses}>
          {selectedArmor && (
            <Image
              src={selectedArmor.path}
              alt={selectedArmor.name}
              width="60"
              height="60"
              className="pointer-events-none object-cover group-hover:opacity-75"
            />
          )}
        </div>
      </button>
    </Fragment>
  )
}

export default Armor
