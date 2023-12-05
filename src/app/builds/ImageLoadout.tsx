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
          items[selectedItemType.index || 0].type,
          itemIds,
        )}`,
        { scroll: false },
      )
    } else {
      router.push(`${pathname}?${createQueryString(item.type, item.id)}`, {
        scroll: false,
      })
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

      <div className="grid w-full max-w-md grid-cols-2 gap-1 sm:grid-cols-3 md:max-w-2xl md:grid-cols-4">
        <ItemCard
          key="archtype1"
          item={loadout.items.archtypes ? loadout.items.archtypes[0] : null}
          type="archtype"
          size="sm"
          actions={
            <SelectButton
              onClick={() =>
                setSelectedItemType({ type: 'archtypes', index: 0 })
              }
            />
          }
        />
        <ItemCard
          key="skill1"
          item={loadout.items.skills ? loadout.items.skills[0] : null}
          type="skill"
          size="sm"
          actions={
            <SelectButton
              onClick={() => setSelectedItemType({ type: 'skills', index: 0 })}
            />
          }
        />

        <ItemCard
          key="archtype2"
          item={loadout.items.archtypes ? loadout.items.archtypes[1] : null}
          type="archtype"
          size="sm"
          actions={
            <SelectButton
              onClick={() =>
                setSelectedItemType({ type: 'archtypes', index: 1 })
              }
            />
          }
        />
        <ItemCard
          key="skill2"
          item={loadout.items.skills ? loadout.items.skills[1] : null}
          type="skill"
          size="sm"
          actions={
            <SelectButton
              onClick={() => setSelectedItemType({ type: 'skills', index: 1 })}
            />
          }
        />
      </div>
      <div className="mt-4 grid w-full max-w-md grid-cols-2 gap-1 sm:grid-cols-3 md:max-w-2xl md:grid-cols-4">
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
              key={`ring${index + 1}`}
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
      <div className="mt-4 grid w-full max-w-md grid-cols-2 gap-1 sm:grid-cols-3 md:max-w-2xl md:grid-cols-4">
        <ItemCard
          item={loadout.items.mainhand}
          type="mainhand"
          size="sm"
          actions={
            <SelectButton
              onClick={() => setSelectedItemType({ type: 'mainhand' })}
            />
          }
        />
        <ItemCard
          item={loadout.items.mods ? loadout.items.mods[0] : null}
          type="mod"
          size="sm"
          actions={
            <SelectButton
              onClick={() => setSelectedItemType({ type: 'mods', index: 0 })}
            />
          }
        />
        <ItemCard
          item={loadout.items.mutators ? loadout.items.mutators[0] : null}
          type="mutator"
          size="sm"
          actions={
            <SelectButton
              onClick={() =>
                setSelectedItemType({ type: 'mutators', index: 0 })
              }
            />
          }
        />
      </div>
      <div className="mt-4 grid w-full max-w-md grid-cols-2 gap-1 sm:grid-cols-3 md:max-w-2xl md:grid-cols-4">
        <ItemCard
          item={loadout.items.melee}
          type="melee"
          size="sm"
          actions={
            <SelectButton
              onClick={() => setSelectedItemType({ type: 'melee' })}
            />
          }
        />
        <ItemCard
          item={loadout.items.mods ? loadout.items.mods[1] : null}
          type="mod"
          size="sm"
          actions={
            <SelectButton
              onClick={() => setSelectedItemType({ type: 'mods', index: 1 })}
            />
          }
        />
        <ItemCard
          item={loadout.items.mutators ? loadout.items.mutators[1] : null}
          type="mutator"
          size="sm"
          actions={
            <SelectButton
              onClick={() =>
                setSelectedItemType({ type: 'mutators', index: 1 })
              }
            />
          }
        />
      </div>
      <div className="mt-4 grid w-full max-w-md grid-cols-2 gap-1 sm:grid-cols-3 md:max-w-2xl md:grid-cols-4">
        <ItemCard
          item={loadout.items.offhand}
          type="offhand"
          size="sm"
          actions={
            <SelectButton
              onClick={() => setSelectedItemType({ type: 'offhand' })}
            />
          }
        />
        <ItemCard
          item={loadout.items.mods ? loadout.items.mods[2] : null}
          type="mod"
          size="sm"
          actions={
            <SelectButton
              onClick={() => setSelectedItemType({ type: 'mods', index: 2 })}
            />
          }
        />
        <ItemCard
          item={loadout.items.mutators ? loadout.items.mutators[2] : null}
          type="mutator"
          size="sm"
          actions={
            <SelectButton
              onClick={() =>
                setSelectedItemType({ type: 'mutators', index: 2 })
              }
            />
          }
        />
      </div>
    </div>
  )
}
