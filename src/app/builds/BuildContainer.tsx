'use client'

import { useState } from 'react'
import armorList from '@/data/item-list.json'
import LoadoutTileButton from '@/components/LoadoutTileButton'
import ItemSelect from '@/app/builds/ItemSelect'
import useBuildState from '@/hooks/useBuildState'
import { cn } from '@/lib/utils'
import type { LoadoutSlot, LoadoutItem, Item } from '@/types'

/**
 * Filter out the item list for only the slot we're looking for.
 * Because the loadout has 4 ring slots, but the ring item is classified only as 'ring',
 * we need to check in order to display rings.
 */
function getItemListForSlot(loadoutSlot: LoadoutSlot | null): Item[] {
  const slot =
    loadoutSlot === 'ring1' ||
    loadoutSlot === 'ring2' ||
    loadoutSlot === 'ring3' ||
    loadoutSlot === 'ring4'
      ? 'ring'
      : loadoutSlot

  if (!slot) return []

  const filteredItemList = armorList.filter(
    (item) => item.slot === slot,
  ) as Item[]
  return filteredItemList
}

export default function BuildContainer() {
  const { buildState, updateBuildState } = useBuildState()
  /** Tracks which loadout slot was clicked for the armor select modal */
  const [loadoutSlot, setLoadoutSlot] = useState<LoadoutSlot | null>(null)
  const isItemSelectOpen = Boolean(loadoutSlot)

  const itemListForSlot = getItemListForSlot(loadoutSlot)

  function handleSelectItem(item: LoadoutItem) {
    updateBuildState(item.slot, item)
    setLoadoutSlot(null)
  }

  return (
    <div>
      <ItemSelect
        itemList={itemListForSlot}
        loadoutSlot={loadoutSlot}
        open={isItemSelectOpen}
        onSelectItem={handleSelectItem}
        onClose={() => setLoadoutSlot(null)}
      />
      <div
        id="build-container"
        className={cn('rounded-lg shadow-lg shadow-purple-950')}
      >
        <div className={cn('grid grid-cols-2 gap-1')}>
          <LoadoutTileButton
            item={buildState.helm}
            slot="helm"
            onClick={() => setLoadoutSlot('helm')}
          />
          <LoadoutTileButton
            item={buildState.torso}
            slot="torso"
            onClick={() => setLoadoutSlot('torso')}
          />
          <LoadoutTileButton
            item={buildState.gloves}
            slot="gloves"
            onClick={() => setLoadoutSlot('gloves')}
          />
          <LoadoutTileButton
            item={buildState.legs}
            slot="legs"
            onClick={() => setLoadoutSlot('legs')}
          />
          <LoadoutTileButton
            item={buildState.relic}
            slot="relic"
            onClick={() => setLoadoutSlot('relic')}
          />
          <LoadoutTileButton
            item={buildState.amulet}
            slot="amulet"
            onClick={() => setLoadoutSlot('amulet')}
          />
          <LoadoutTileButton
            item={buildState.ring1}
            slot="ring1"
            onClick={() => setLoadoutSlot('ring1')}
          />
          <LoadoutTileButton
            item={buildState.ring2}
            slot="ring2"
            onClick={() => setLoadoutSlot('ring2')}
          />
          <LoadoutTileButton
            item={buildState.ring3}
            slot="ring3"
            onClick={() => setLoadoutSlot('ring3')}
          />
          <LoadoutTileButton
            item={buildState.ring4}
            slot="ring4"
            onClick={() => setLoadoutSlot('ring4')}
          />
          <div className={cn('col-span-2')}>
            <LoadoutTileButton
              item={buildState.mainhand}
              slot="mainhand"
              onClick={() => setLoadoutSlot('mainhand')}
            />
          </div>
          <div className={cn('col-span-2')}>
            <LoadoutTileButton
              item={buildState.melee}
              slot="melee"
              onClick={() => setLoadoutSlot('melee')}
            />
          </div>
          <div className={cn('col-span-2')}>
            <LoadoutTileButton
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
