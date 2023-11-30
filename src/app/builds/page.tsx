'use client'

import { useCallback, useState } from 'react'
import { remnantItemTypes, remnantItems } from '@/data/items'
import ItemSelect from '@/components/ItemSelect'
import {
  cn,
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
    rings: [null, null, null, null],
    mainhand: null,
    offhand: null,
    melee: null,
    mods: [null, null, null],
    archtypes: [null, null],
    concoctions: [null, null, null, null, null],
    mutators: [null, null, null],
    relicfragments: [null, null, null],
    traits: [null, null, null, null, null, null, null, null, null, null],
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

      if (loadout.items[loadoutItemType]) {
        ;(loadout.items[loadoutItemType] as LoadoutItem[])[itemIndex] = {
          ...item,
          type: loadoutItemType,
        }
      } else {
        loadout.items[loadoutItemType] = { ...item, type: loadoutItemType }
      }
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
  console.info('loadout', loadout)

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
    <div>
      <ItemSelect
        itemList={itemListForSlot}
        loadoutSlot={loadoutSlot}
        open={isItemSelectModalOpen}
        onSelectItem={handleSelectItem}
        onClose={() => setLoadoutSlot(null)}
      />
      <div id="build-container" className={cn('grid grid-cols-5 gap-1')}>
        {Object.keys(loadout.items).map((loadoutItemType) => {
          if (
            Array.isArray(loadout.items[loadoutItemType as LoadoutItemType])
          ) {
            const loadoutItems = loadout.items[
              loadoutItemType as LoadoutItemType
            ] as LoadoutItem[]
            return loadoutItems.map((loadoutItem, index) => {
              const item = remnantItems.find((i) => i.id === loadoutItem?.id)
              return <ItemCard item={item || null} key={index} />
            })
          }

          const loadoutItem = loadout.items[
            loadoutItemType as LoadoutItemType
          ] as LoadoutItem

          const item = remnantItems.find((i) => i.id === loadoutItem?.id)
          return <ItemCard item={item || null} key={loadoutItemType} />
        })}
      </div>
    </div>
  )
}
