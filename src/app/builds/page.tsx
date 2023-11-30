'use client'

import { Fragment, useCallback, useState } from 'react'
import { remnantItemTypes, remnantItems } from '@/data/items'
import ItemSelect from '@/components/ItemSelect'
import {
  cn,
  getArrayOfLength,
  itemTypeToLoadoutItemType,
  loadoutItemTypeToItemType,
} from '@/lib/utils'
import type { LoadoutItemType, LoadoutItem, Item, Loadout } from '@/types'
import ItemCard from '../../components/ItemCard'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

const initialLoadout: Loadout = {
  name: 'My Loadout',
  items: {
    helm: null,
    torso: null,
    legs: null,
    gloves: null,
    relic: null,
    amulet: null,
    rings: [],
    mainhand: null,
    offhand: null,
    melee: null,
    archtypes: [],
    concoctions: [],
    mods: [],
    mutators: [],
    relicfragments: [],
    traits: [],
  },
}

function getLoadoutFromQueryString(searchParams: URLSearchParams): Loadout {
  const loadout: Loadout = initialLoadout

  remnantItemTypes.forEach((itemType) => {
    const loadoutItemType = itemTypeToLoadoutItemType(itemType)
    const itemIds = searchParams.get(loadoutItemType)?.split(',')
    itemIds?.forEach((itemId, itemIndex) => {
      const item = remnantItems.find((i) => i.id === itemId)
      if (!item) return

      // Check if we have a single or array of items
      Array.isArray(loadout.items[loadoutItemType])
        ? ((loadout.items[loadoutItemType] as LoadoutItem[])[itemIndex] = {
            ...item,
            type: loadoutItemType,
          })
        : ((loadout.items[loadoutItemType] as LoadoutItem) = {
            ...item,
            type: loadoutItemType,
          })
    })
  })

  return loadout
}

export default function BuildHomePage() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // determines whether to show the item select modal
  // instead of a boolean, we store the slot that is clicked
  // so we can filter the item list to only show items for that slot
  const [loadoutSlot, setLoadoutSlot] = useState<LoadoutItemType | null>(null)
  const isItemSelectModalOpen = Boolean(loadoutSlot)

  // Build the loadout from the query string
  const loadout = getLoadoutFromQueryString(searchParams)

  // router.push(pathname + '?' + createQueryString('build', buildString))
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)
      return params.toString()
    },
    [searchParams],
  )

  /**
   * Filter out the item list for only the slot we're looking for.
   */
  function getItemListForSlot(loadoutSlot: LoadoutItemType | null): Item[] {
    if (!loadoutSlot) return []
    // convert loadout slots like rings -> ring, archtypes -> archtype, etc.
    const slot = loadoutItemTypeToItemType(loadoutSlot)
    // return items that match the slot
    return (remnantItems as Item[]).filter((item) => item.type === slot)
  }
  const itemListForSlot = getItemListForSlot(loadoutSlot)

  function handleSelectItem(item: LoadoutItem) {
    // updateLoadout(item.type, item)
    setLoadoutSlot(null)
  }

  return (
    <Fragment>
      <ItemSelect
        itemList={itemListForSlot}
        loadoutSlot={loadoutSlot}
        open={isItemSelectModalOpen}
        onSelectItem={handleSelectItem}
        onClose={() => setLoadoutSlot(null)}
      />
      <div
        id="build-container"
        className={cn(
          'grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
        )}
      >
        <ItemCard item={loadout.items.helm} type="helm" />
        <ItemCard item={loadout.items.torso} type="torso" />
        <ItemCard item={loadout.items.legs} type="legs" />
        <ItemCard item={loadout.items.gloves} type="gloves" />
        <ItemCard item={loadout.items.relic} type="relic" />
        <ItemCard item={loadout.items.amulet} type="amulet" />
        {getArrayOfLength(4).map((index) => {
          const item = loadout.items.rings ? loadout.items.rings[index] : null
          return <ItemCard key={index} item={item} type="ring" />
        })}
      </div>
    </Fragment>
  )
}
