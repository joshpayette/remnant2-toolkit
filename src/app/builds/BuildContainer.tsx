'use client'

import { useState } from 'react'
import itemList from '@/data/item-list.json'
import ItemSelect from '@/app/builds/ItemSelect'
import useLoadoutState from '@/hooks/useLoadoutState'
import { cn, loadoutItemTypeToItemType } from '@/lib/utils'
import type { LoadoutItemType, LoadoutItem, Item } from '@/types'
import ItemCard from './ItemCard'

/**
 * Filter out the item list for only the slot we're looking for.
 * Because the loadout has 4 ring slots, but the ring item is classified only as 'ring',
 * we need to check in order to display rings.
 */
function getItemListForSlot(loadoutSlot: LoadoutItemType | null): Item[] {
  if (!loadoutSlot) return []

  // Convert loadslots like ring1, ring2, etc. to ring
  const slot = loadoutItemTypeToItemType(loadoutSlot)

  const filteredItemList = (itemList as Item[]).filter(
    (item) => item.type === slot,
  )
  return filteredItemList
}

export default function BuildContainer() {
  const { loadoutState, updateLoadoutState } = useLoadoutState()

  const [loadoutSlot, setLoadoutSlot] = useState<LoadoutItemType | null>(null)
  const isItemSelectModalOpen = Boolean(loadoutSlot)

  const itemListForSlot = getItemListForSlot(loadoutSlot)

  function handleSelectItem(item: LoadoutItem) {
    updateLoadoutState(item.type, item)
    setLoadoutSlot(null)
  }

  const testItem = itemList[0] as Item

  return (
    <div>
      <ItemSelect
        itemList={itemListForSlot}
        loadoutSlot={loadoutSlot}
        open={isItemSelectModalOpen}
        onSelectItem={handleSelectItem}
        onClose={() => setLoadoutSlot(null)}
      />
      <div id="build-container" className={cn('grid grid-cols-5 gap-1')}>
        <ItemCard item={testItem} />
      </div>
    </div>
  )
}
