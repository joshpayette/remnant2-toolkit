'use client'

import { Fragment, useCallback, useMemo, useState } from 'react'
import { remnantItemTypes, remnantItems } from '@/data/items'
import {
  cn,
  getArrayOfLength,
  itemTypeToLoadoutItemType,
  loadoutItemTypeToItemType,
} from '@/lib/utils'
import type { LoadoutItemType, LoadoutItem, Item, Loadout } from '@/types'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import dynamic from 'next/dynamic'
import ItemCardButton from '@/components/ItemCardButton'
import PageHeader from '@/app/PageHeader'

const ItemSelect = dynamic(() => import('@/app/builds/ItemSelect'), {
  ssr: false,
})

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
    consumables: [],
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

  // Tracks information about the slot the user is selecting an item for
  const [selectedItemType, setSelectedItemType] = useState<{
    type: LoadoutItemType | null
    index?: number
  }>({ type: null })
  // If the item type is not null, the modal should be open
  const isItemSelectModalOpen = Boolean(selectedItemType.type)

  // Build the loadout from the query string
  const loadout = useMemo(
    () => getLoadoutFromQueryString(searchParams),
    [searchParams],
  )

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
    // convert loadout types like rings -> ring, archtypes -> archtype, etc.
    const itemType = loadoutItemTypeToItemType(loadoutSlot)
    // return items that match the slot
    return (remnantItems as Item[]).filter((item) => item.type === itemType)
  }
  const itemListForSlot = useMemo(
    () => getItemListForSlot(selectedItemType.type),
    [selectedItemType],
  )

  function handleSelectItem(item: LoadoutItem | null) {
    if (!item || !selectedItemType.type) return
    if (Array.isArray(loadout.items[selectedItemType.type])) {
      const items = loadout.items[selectedItemType.type] as LoadoutItem[]

      console.info('selectedItemType', selectedItemType)
      // If no index is set, just add the item to the array
      // otherwise, insert in the specified slot
      if (selectedItemType.index === undefined) {
        items.push(item)
      } else {
        items[selectedItemType.index] = item
      }
      const itemIds = items.map((i) => i.id).join(',')
      router.push(`${pathname}?${createQueryString(items[0].type, itemIds)}`)
    } else {
      router.push(`${pathname}?${createQueryString(item.type, item.id)}`)
    }
    setSelectedItemType({ type: null })
  }

  return (
    <Fragment>
      <PageHeader title="Remnant 2 Build Tool">
        <div
          id="alert"
          className="rounded border border-red-500 bg-black p-4 text-red-500"
        >
          <p>
            This tool is a work in progress. It is not yet ready for public
            consumption.
          </p>
        </div>
      </PageHeader>
      <div className="w-full max-w-md rounded border-2 border-green-500 bg-black p-4 md:max-w-2xl">
        <h2 className="mb-8 text-center text-4xl font-bold text-green-400">
          {loadout.name}
        </h2>

        <ItemSelect
          itemList={itemListForSlot}
          loadoutSlot={selectedItemType.type}
          open={isItemSelectModalOpen}
          onSelectItem={handleSelectItem}
          onClose={() => setSelectedItemType({ type: null })}
        />

        <div
          id="build-container"
          className={cn(
            'grid w-full max-w-md grid-cols-2 gap-1 sm:grid-cols-3 md:max-w-2xl md:grid-cols-4',
          )}
        >
          {getArrayOfLength(2).map((index) => {
            const item = loadout.items.archtypes
              ? loadout.items.archtypes[index]
              : null
            return (
              <ItemCardButton
                key={index}
                item={item}
                type="archtype"
                onClick={() =>
                  setSelectedItemType({ type: 'archtypes', index })
                }
                size="sm"
              />
            )
          })}
          <ItemCardButton
            item={loadout.items.helm}
            type="helm"
            size="sm"
            onClick={() => setSelectedItemType({ type: 'helm' })}
          />
          <ItemCardButton
            item={loadout.items.torso}
            type="torso"
            size="sm"
            onClick={() => setSelectedItemType({ type: 'torso' })}
          />
          <ItemCardButton
            item={loadout.items.legs}
            type="legs"
            size="sm"
            onClick={() => setSelectedItemType({ type: 'legs' })}
          />
          <ItemCardButton
            item={loadout.items.gloves}
            type="gloves"
            size="sm"
            onClick={() => setSelectedItemType({ type: 'gloves' })}
          />
          <ItemCardButton
            item={loadout.items.relic}
            type="relic"
            size="sm"
            onClick={() => setSelectedItemType({ type: 'relic' })}
          />
          <ItemCardButton
            item={loadout.items.amulet}
            type="amulet"
            size="sm"
            onClick={() => setSelectedItemType({ type: 'amulet' })}
          />
          {getArrayOfLength(4).map((index) => {
            const item = loadout.items.rings ? loadout.items.rings[index] : null
            return (
              <ItemCardButton
                key={index}
                item={item}
                type="ring"
                size="sm"
                onClick={() => setSelectedItemType({ type: 'rings', index })}
              />
            )
          })}
        </div>
      </div>
    </Fragment>
  )
}
