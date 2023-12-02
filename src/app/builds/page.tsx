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
import PageHeader from '@/components/PageHeader'

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

  // determines whether to show the item select modal
  // instead of a boolean, we store the slot that is clicked
  // so we can filter the item list to only show items for that slot
  const [loadoutItemType, setLoadoutItemType] =
    useState<LoadoutItemType | null>(null)
  const isItemSelectModalOpen = Boolean(loadoutItemType)

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
    () => getItemListForSlot(loadoutItemType),
    [loadoutItemType],
  )

  function handleSelectItem(item: LoadoutItem | null) {
    if (!item || !loadoutItemType) return
    if (Array.isArray(loadout.items[loadoutItemType])) {
      const items = loadout.items[loadoutItemType] as LoadoutItem[]
      items.push(item)
      const itemIds = items.map((i) => i.id).join(',')
      router.push(`${pathname}?${createQueryString(items[0].type, itemIds)}`)
    } else {
      router.push(`${pathname}?${createQueryString(item.type, item.id)}`)
    }
    setLoadoutItemType(null)
  }

  return (
    <Fragment>
      <PageHeader title="Remnant 2 Build Tool" />
      <div className="rounded border-2 border-green-500 bg-black p-4">
        <h2 className="mb-8 text-center text-4xl font-bold text-green-400">
          {loadout.name}
        </h2>

        <ItemSelect
          itemList={itemListForSlot}
          loadoutSlot={loadoutItemType}
          open={isItemSelectModalOpen}
          onSelectItem={handleSelectItem}
          onClose={() => setLoadoutItemType(null)}
        />
        <div
          id="build-container"
          className={cn(
            'grid w-full grid-cols-1 gap-1 sm:max-w-md md:max-w-2xl md:grid-cols-4',
          )}
        >
          <ItemCardButton
            item={loadout.items.helm}
            type="helm"
            onClick={() => setLoadoutItemType('helm')}
            size="sm"
          />
          <ItemCardButton
            item={loadout.items.torso}
            type="torso"
            onClick={() => setLoadoutItemType('torso')}
            size="sm"
          />
          <ItemCardButton
            item={loadout.items.legs}
            type="legs"
            onClick={() => setLoadoutItemType('legs')}
            size="sm"
          />
          <ItemCardButton
            item={loadout.items.gloves}
            type="gloves"
            onClick={() => setLoadoutItemType('gloves')}
            size="sm"
          />
          <ItemCardButton
            item={loadout.items.relic}
            type="relic"
            onClick={() => setLoadoutItemType('relic')}
            size="sm"
          />
          <ItemCardButton
            item={loadout.items.amulet}
            type="amulet"
            onClick={() => setLoadoutItemType('amulet')}
            size="sm"
          />
          {getArrayOfLength(4).map((index) => {
            const item = loadout.items.rings ? loadout.items.rings[index] : null
            return (
              <ItemCardButton
                key={index}
                item={item}
                type="ring"
                onClick={() => setLoadoutItemType('rings')}
                size="sm"
              />
            )
          })}
        </div>
      </div>
    </Fragment>
  )
}
