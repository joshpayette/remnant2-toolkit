'use client'

import { Fragment } from 'react'
import { remnantItemTypes, remnantItems } from '@/data/items'
import { itemTypeToLoadoutItemType } from '@/lib/utils'
import type { LoadoutItem, Loadout } from '@/types'
import { useSearchParams } from 'next/navigation'
import PageHeader from '@/app/PageHeader'
import ImageLoadout from './ImageLoadout'
import TextLoadout from './TextLoadout'

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
    skills: [],
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
  const searchParams = useSearchParams()
  const loadout = getLoadoutFromQueryString(searchParams)

  return (
    <Fragment>
      <PageHeader
        title="Remnant 2 Build Tool"
        subtitle="Create and share Remnant 2 builds"
      >
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
        <ImageLoadout loadout={loadout} />
        <TextLoadout loadout={loadout} />
      </div>
    </Fragment>
  )
}
