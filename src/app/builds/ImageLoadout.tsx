import { cn, getArrayOfLength, loadoutItemTypeToItemType } from '@/lib/utils'
import ItemCard from '@/components/ItemCard'
import dynamic from 'next/dynamic'
import { PencilSquareIcon } from '@heroicons/react/24/outline'
import type { Item, Loadout, LoadoutItem, LoadoutItemType } from '@/types'
import { useCallback, useMemo, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { remnantItems } from '@/data/items'

const ItemSelect = dynamic(() => import('@/app/builds/ItemSelect'), {
  ssr: false,
})

function SelectButton({ onClick }: { onClick: () => void }) {
  return (
    <div className="flex w-full items-center justify-end">
      <button className="text-green-400 hover:text-green-200" onClick={onClick}>
        <PencilSquareIcon className="h-4 w-4" />
      </button>
    </div>
  )
}

interface ImageLoadoutProps {
  loadout: Loadout
}

export default function ImageLoadout({ loadout }: ImageLoadoutProps) {
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

  // router.push(pathname + '?' + createQueryString('build', buildString))
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)
      return params.toString()
    },
    [searchParams],
  )

  function handleSelectItem(item: LoadoutItem | null) {
    if (!item || !selectedItemType.type) return

    if (Array.isArray(loadout.items[selectedItemType.type])) {
      const items = loadout.items[selectedItemType.type] as LoadoutItem[]

      // If no index is set, just add the item to the array
      // otherwise, insert in the specified slot
      if (selectedItemType.index === undefined) {
        items.push(item)
      } else {
        items[selectedItemType.index] = item
      }
      const itemIds = items.map((i) => i.id).join(',')
      router.push(
        `${pathname}?${createQueryString(
          items[selectedItemType.index ?? 0].type,
          itemIds,
        )}`,
      )
    } else {
      router.push(`${pathname}?${createQueryString(item.type, item.id)}`)
    }
    setSelectedItemType({ type: null })
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
  const itemListForSlot = useMemo(
    () => getItemListForSlot(selectedItemType.type),
    [selectedItemType],
  )

  return (
    <div>
      <h2 className="mb-8 border-b border-b-green-900 pb-2 text-center text-4xl font-bold text-green-400">
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
            <ItemCard
              key={index}
              item={item}
              type="archtype"
              size="sm"
              actions={
                <SelectButton
                  onClick={() =>
                    setSelectedItemType({ type: 'archtypes', index })
                  }
                />
              }
            />
          )
        })}
        <ItemCard
          item={loadout.items.helm}
          type="helm"
          size="sm"
          actions={
            <SelectButton
              onClick={() => setSelectedItemType({ type: 'helm' })}
            />
          }
        />
        <ItemCard
          item={loadout.items.torso}
          type="torso"
          size="sm"
          actions={
            <SelectButton
              onClick={() => setSelectedItemType({ type: 'torso' })}
            />
          }
        />
        <ItemCard
          item={loadout.items.legs}
          type="legs"
          size="sm"
          actions={
            <SelectButton
              onClick={() => setSelectedItemType({ type: 'legs' })}
            />
          }
        />
        <ItemCard
          item={loadout.items.gloves}
          type="gloves"
          size="sm"
          actions={
            <SelectButton
              onClick={() => setSelectedItemType({ type: 'gloves' })}
            />
          }
        />
        <ItemCard
          item={loadout.items.relic}
          type="relic"
          size="sm"
          actions={
            <SelectButton
              onClick={() => setSelectedItemType({ type: 'relic' })}
            />
          }
        />
        <ItemCard
          item={loadout.items.amulet}
          type="amulet"
          size="sm"
          actions={
            <SelectButton
              onClick={() => setSelectedItemType({ type: 'amulet' })}
            />
          }
        />
        {getArrayOfLength(4).map((index) => {
          const item = loadout.items.rings ? loadout.items.rings[index] : null
          return (
            <ItemCard
              key={index}
              item={item}
              type="ring"
              size="sm"
              actions={
                <SelectButton
                  onClick={() => setSelectedItemType({ type: 'rings', index })}
                />
              }
            />
          )
        })}
      </div>
    </div>
  )
}
