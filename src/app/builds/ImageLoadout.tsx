import { cn, getArrayOfLength, loadoutItemTypeToItemType } from '@/lib/utils'
import ItemCard from '@/components/ItemCard'
import dynamic from 'next/dynamic'
import { PencilSquareIcon } from '@heroicons/react/24/outline'
import type { Item, Loadout, LoadoutItem, LoadoutItemType } from '@/types'
import { Fragment, useCallback, useMemo, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { remnantItems } from '@/data/items'

const ItemSelect = dynamic(() => import('@/app/builds/ItemSelect'), {
  ssr: false,
})

function SelectButton({ onClick }: { onClick: () => void }) {
  return (
    <div className="flex w-full items-center justify-end">
      <button
        className="flex items-center rounded border border-black bg-gray-950 px-1 py-0.5 text-xs text-white hover:bg-purple-800"
        onClick={onClick}
      >
        <PencilSquareIcon className="h-4 w-4" />
      </button>
    </div>
  )
}

interface ImageLoadoutProps {
  loadout: Loadout
}

export default function ImageLoadout({ loadout }: ImageLoadoutProps) {
  // Hooks for monitoring the URL query string
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  /**
   * Used to modify the URL query string
   */
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)
      return params.toString()
    },
    [searchParams],
  )

  /**
   * Fires when the user changes an item in the loadout.
   * It will add the item to the URL query string.
   */
  function handleSelectItem(item: LoadoutItem | null) {
    if (!item || !selectedItemSlot.type) return

    const loadoutItemOrItems = loadout.items[selectedItemSlot.type]

    if (Array.isArray(loadoutItemOrItems)) {
      const loadoutItems = loadoutItemOrItems as LoadoutItem[]

      // If no index is set, just add the item to the array
      // otherwise, insert in the specified slot
      if (selectedItemSlot.index === undefined) {
        // If the item is already in the loadout, don't add it again
        if (!loadoutItems.find((i) => i.id === item.id)) {
          loadoutItems.push(item)
        }
      } else {
        if (!loadoutItems.find((i) => i.id === item.id)) {
          loadoutItems[selectedItemSlot.index] = item
        }
      }
      const itemIds = loadoutItems.map((i) => i.id).join(',')
      router.push(
        `${pathname}?${createQueryString(
          loadoutItems[selectedItemSlot.index || 0].type,
          itemIds,
        )}`,
        { scroll: false },
      )
    } else {
      const loadoutItem = loadoutItemOrItems as LoadoutItem
      if (loadoutItem.id === item.id) return
      router.push(`${pathname}?${createQueryString(item.type, item.id)}`, {
        scroll: false,
      })
    }
    setSelectedItemSlot({ type: null })
  }

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

  // Tracks information about the slot the user is selecting an item for
  const [selectedItemSlot, setSelectedItemSlot] = useState<{
    type: LoadoutItemType | null
    index?: number
  }>({ type: null })

  // If the item type is not null, the modal should be open
  const isItemSelectModalOpen = Boolean(selectedItemSlot.type)

  // Filters out the item list for the slot the user clicked.
  // This info is used to populate the item select modal.
  const itemListForSlot = useMemo(
    () => getItemListForSlot(selectedItemSlot.type),
    [selectedItemSlot],
  )

  return (
    <Fragment>
      <div className="relative">
        <h2 className="mb-2 border-b border-b-green-900 pb-2 text-center text-4xl font-bold text-green-400">
          {loadout.name}
        </h2>
      </div>
      <ItemSelect
        itemList={itemListForSlot}
        loadoutSlot={selectedItemSlot.type}
        open={isItemSelectModalOpen}
        onSelectItem={handleSelectItem}
        onClose={() => setSelectedItemSlot({ type: null })}
      />

      <div
        id="container"
        className="relative mb-12 grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-3"
      >
        <div
          id="archtypes"
          className="col-span-full grid grid-cols-2 sm:col-span-1"
        >
          <ItemCard
            key="archtype1"
            item={loadout.items.archtypes ? loadout.items.archtypes[0] : null}
            type="archtype"
            size="sm"
            onClick={() => setSelectedItemSlot({ type: 'archtypes', index: 0 })}
          />
          <ItemCard
            key="skill1"
            item={loadout.items.skills ? loadout.items.skills[0] : null}
            type="skill"
            size="sm"
            onClick={() => setSelectedItemSlot({ type: 'skills', index: 0 })}
          />

          <ItemCard
            key="archtype2"
            item={loadout.items.archtypes ? loadout.items.archtypes[1] : null}
            type="archtype"
            size="sm"
            onClick={() => setSelectedItemSlot({ type: 'archtypes', index: 1 })}
          />
          <ItemCard
            key="skill2"
            item={loadout.items.skills ? loadout.items.skills[1] : null}
            type="skill"
            size="sm"
            onClick={() => setSelectedItemSlot({ type: 'skills', index: 1 })}
          />
        </div>
        <div
          id="armor"
          className="col-span-full grid grid-cols-2 sm:col-span-1"
        >
          <ItemCard
            item={loadout.items.helm}
            type="helm"
            size="sm"
            onClick={() => setSelectedItemSlot({ type: 'helm' })}
          />
          <ItemCard
            item={loadout.items.torso}
            type="torso"
            size="sm"
            onClick={() => setSelectedItemSlot({ type: 'torso' })}
          />
          <ItemCard
            item={loadout.items.legs}
            type="legs"
            size="sm"
            onClick={() => setSelectedItemSlot({ type: 'legs' })}
          />
          <ItemCard
            item={loadout.items.gloves}
            type="gloves"
            size="sm"
            onClick={() => setSelectedItemSlot({ type: 'gloves' })}
          />
        </div>
        <div
          id="jewelry"
          className="col-span-full grid grid-cols-2 sm:grid-cols-3 md:col-span-1"
        >
          <ItemCard
            item={loadout.items.relic}
            type="relic"
            size="sm"
            onClick={() => setSelectedItemSlot({ type: 'relic' })}
          />
          <ItemCard
            item={loadout.items.amulet}
            type="amulet"
            size="sm"
            onClick={() => setSelectedItemSlot({ type: 'amulet' })}
          />
          {getArrayOfLength(4).map((index) => {
            const item = loadout.items.rings ? loadout.items.rings[index] : null
            return (
              <ItemCard
                key={`ring${index + 1}`}
                item={item}
                type="ring"
                size="sm"
                onClick={() => setSelectedItemSlot({ type: 'rings', index })}
              />
            )
          })}
        </div>
        <div
          id="mainhand"
          className="col-span-full grid grid-cols-2 sm:col-span-1 sm:grid-cols-2"
        >
          <ItemCard
            item={loadout.items.mainhand}
            type="mainhand"
            size="sm"
            onClick={() => setSelectedItemSlot({ type: 'mainhand' })}
          />
          <ItemCard
            item={loadout.items.mods ? loadout.items.mods[0] : null}
            type="mod"
            size="sm"
            onClick={() => setSelectedItemSlot({ type: 'mods', index: 0 })}
          />
          <ItemCard
            item={loadout.items.mutators ? loadout.items.mutators[0] : null}
            type="mutator"
            size="sm"
            onClick={() => setSelectedItemSlot({ type: 'mutators', index: 0 })}
          />
        </div>
        <div
          id="melee"
          className="col-span-full grid grid-cols-2 sm:col-span-1 sm:grid-cols-2"
        >
          <ItemCard
            item={loadout.items.melee}
            type="melee"
            size="sm"
            onClick={() => setSelectedItemSlot({ type: 'melee' })}
          />
          <ItemCard
            item={loadout.items.mods ? loadout.items.mods[1] : null}
            type="mod"
            size="sm"
            onClick={() => setSelectedItemSlot({ type: 'mods', index: 1 })}
          />
          <ItemCard
            item={loadout.items.mutators ? loadout.items.mutators[1] : null}
            type="mutator"
            size="sm"
            onClick={() => setSelectedItemSlot({ type: 'mutators', index: 1 })}
          />
        </div>
        <div
          id="offhand"
          className="col-span-full grid grid-cols-2 sm:col-span-1 sm:grid-cols-2"
        >
          <ItemCard
            item={loadout.items.offhand}
            type="offhand"
            size="sm"
            onClick={() => setSelectedItemSlot({ type: 'offhand' })}
          />
          <ItemCard
            item={loadout.items.mods ? loadout.items.mods[2] : null}
            type="mod"
            size="sm"
            onClick={() => setSelectedItemSlot({ type: 'mods', index: 2 })}
          />
          <ItemCard
            item={loadout.items.mutators ? loadout.items.mutators[2] : null}
            type="mutator"
            size="sm"
            onClick={() => setSelectedItemSlot({ type: 'mutators', index: 2 })}
          />
        </div>
      </div>
    </Fragment>
  )
}
