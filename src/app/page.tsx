'use client'

import { useState } from 'react'
import armorList from '@/data/armor-list.json'
import ALoadoutTileButton from '@/components/LoadoutTileButton'
import ArmorSelect from '@/components/ArmorSelect'
import useBuildState from '@/hooks/useBuildState'
import { cn } from '@/lib/utils'
import type { LoadoutSlotType, LoadoutItem, ArmorItem } from '@/types/index'

export default function Home() {
  const { buildState, updateBuildState } = useBuildState()
  /** The loadout slot that is currently open in the armor select modal. */
  const [loadoutSlot, setLoadoutSlot] = useState<LoadoutSlotType | null>(null)
  const isArmorSelectOpen = Boolean(loadoutSlot)

  /**
   * Filter out the armor list for only the slot we're looking for.
   * Because the loadout has 4 ring slots, but ring armor is classified only as 'ring',
   * we need to check in order to display rings.
   */
  function getArmorListForSlot(): ArmorItem[] {
    const slot =
      loadoutSlot === 'ring1' ||
      loadoutSlot === 'ring2' ||
      loadoutSlot === 'ring3' ||
      loadoutSlot === 'ring4'
        ? 'ring'
        : loadoutSlot

    const filteredArmorList = armorList.filter(
      (item) => item.slot === slot,
    ) as ArmorItem[]
    return filteredArmorList
  }

  function handleSelectArmor(item: LoadoutItem) {
    updateBuildState(item.slot, item)
    setLoadoutSlot(null)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4">
      <ArmorSelect
        armorList={getArmorListForSlot()}
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
    </main>
  )
}
