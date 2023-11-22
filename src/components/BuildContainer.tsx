'use client'

import { useState } from 'react'
import armorList from '@/data/armor-list.json'
import ALoadoutTileButton from '@/components/LoadoutTileButton'
import ArmorSelect from '@/components/ArmorSelect'
import useBuildState from '@/hooks/useBuildState'
import { cn } from '@/lib/utils'
import type { LoadoutSlotType, LoadoutItem, ArmorItem } from '@/types/index'

/**
 * Filter out the armor list for only the slot we're looking for.
 * Because the loadout has 4 ring slots, but ring armor is classified only as 'ring',
 * we need to check in order to display rings.
 */
function getArmorListForSlot(loadoutSlot: LoadoutSlotType | null): ArmorItem[] {
  const slot =
    loadoutSlot === 'ring1' ||
    loadoutSlot === 'ring2' ||
    loadoutSlot === 'ring3' ||
    loadoutSlot === 'ring4'
      ? 'ring'
      : loadoutSlot

  if (!slot) return []

  const filteredArmorList = armorList.filter(
    (item) => item.slot === slot,
  ) as ArmorItem[]
  return filteredArmorList
}

export default function BuildContainer() {
  const { buildState, updateBuildState } = useBuildState()
  /** Tracks which loadout slot was clicked for the armor select modal */
  const [loadoutSlot, setLoadoutSlot] = useState<LoadoutSlotType | null>(null)
  const isArmorSelectOpen = Boolean(loadoutSlot)

  const armorListForSlot = getArmorListForSlot(loadoutSlot)

  function handleSelectArmor(item: LoadoutItem) {
    updateBuildState(item.slot, item)
    setLoadoutSlot(null)
  }

  return (
    <div>
      <ArmorSelect
        armorList={armorListForSlot}
        loadoutSlot={loadoutSlot}
        open={isArmorSelectOpen}
        onSelectArmor={handleSelectArmor}
        onClose={() => setLoadoutSlot(null)}
      />
      <div
        id="build-container"
        className={cn('rounded-lg shadow-lg shadow-purple-950')}
      >
        <div className={cn('grid grid-cols-2 gap-1')}>
          <ALoadoutTileButton
            item={buildState.helm}
            slot="helm"
            onClick={() => setLoadoutSlot('helm')}
          />
          <ALoadoutTileButton
            item={buildState.torso}
            slot="torso"
            onClick={() => setLoadoutSlot('torso')}
          />
          <ALoadoutTileButton
            item={buildState.gloves}
            slot="gloves"
            onClick={() => setLoadoutSlot('gloves')}
          />
          <ALoadoutTileButton
            item={buildState.legs}
            slot="legs"
            onClick={() => setLoadoutSlot('legs')}
          />
          <ALoadoutTileButton
            item={buildState.relic}
            slot="relic"
            onClick={() => setLoadoutSlot('relic')}
          />
          <ALoadoutTileButton
            item={buildState.amulet}
            slot="amulet"
            onClick={() => setLoadoutSlot('amulet')}
          />
          <ALoadoutTileButton
            item={buildState.ring1}
            slot="ring1"
            onClick={() => setLoadoutSlot('ring1')}
          />
          <ALoadoutTileButton
            item={buildState.ring2}
            slot="ring2"
            onClick={() => setLoadoutSlot('ring2')}
          />
          <ALoadoutTileButton
            item={buildState.ring3}
            slot="ring3"
            onClick={() => setLoadoutSlot('ring3')}
          />
          <ALoadoutTileButton
            item={buildState.ring4}
            slot="ring4"
            onClick={() => setLoadoutSlot('ring4')}
          />
          <div className={cn('col-span-2')}>
            <ALoadoutTileButton
              item={buildState.mainhand}
              slot="mainhand"
              onClick={() => setLoadoutSlot('mainhand')}
            />
          </div>
          <div className={cn('col-span-2')}>
            <ALoadoutTileButton
              item={buildState.melee}
              slot="melee"
              onClick={() => setLoadoutSlot('melee')}
            />
          </div>
          <div className={cn('col-span-2')}>
            <ALoadoutTileButton
              item={buildState.offhand}
              slot="offhand"
              onClick={() => setLoadoutSlot('offhand')}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
