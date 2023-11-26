'use client'

import { useState } from 'react'
import { remnantItems } from '@/data/items'
import ItemSelect from '@/components/ItemSelect'
import useLoadout from '@/hooks/useLoadout'
import { cn, loadoutItemTypeToItemType } from '@/lib/utils'
import type { LoadoutItemType, LoadoutItem, Item } from '@/types'
import ItemCard from '../../components/ItemCard'

/**
 * Filter out the item list for only the slot we're looking for.
 * Because the loadout has 4 ring slots, but the ring item is classified only as 'ring',
 * we need to check in order to display rings.
 */
function getItemListForSlot(loadoutSlot: LoadoutItemType | null): Item[] {
  if (!loadoutSlot) return []

  // Convert loadslots like ring1, ring2, etc. to ring
  const slot = loadoutItemTypeToItemType(loadoutSlot)

  // Filter out the items that don't match the slot
  const filteredItemList = (remnantItems as Item[]).filter(
    (item) => item.type === slot,
  )
  return filteredItemList
}

export default function BuildHomePage() {
  const { loadout, updateLoadout } = useLoadout()

  // determines whether to show the item select modal
  // instead of a boolean, we store the slot that is clicked
  // so we can filter the item list to only show items for that slot
  const [loadoutSlot, setLoadoutSlot] = useState<LoadoutItemType | null>(null)
  const isItemSelectModalOpen = Boolean(loadoutSlot)
  const itemListForSlot = getItemListForSlot(loadoutSlot)

  function handleSelectItem(item: LoadoutItem) {
    updateLoadout(item.type, item)
    setLoadoutSlot(null)
  }

  const testItem = remnantItems[0] as Item

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
