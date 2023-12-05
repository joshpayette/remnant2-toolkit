import { cn, getArrayOfLength, loadoutItemTypeToItemType } from '@/lib/utils'
import ItemCard from '@/components/ItemCard'
import dynamic from 'next/dynamic'
import { PencilSquareIcon } from '@heroicons/react/24/outline'
import type { Item, Loadout, LoadoutItem, LoadoutItemType } from '@/types'
import { Fragment, useCallback, useMemo, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { remnantItems } from '@/data/items'
import { Switch } from '@headlessui/react'

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

function CardRow({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-2 grid w-full grid-cols-2 gap-1 sm:grid-cols-3 md:grid-cols-4">
      {children}
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

    if (Array.isArray(loadout.items[selectedItemSlot.type])) {
      const items = loadout.items[selectedItemSlot.type] as LoadoutItem[]

      // If no index is set, just add the item to the array
      // otherwise, insert in the specified slot
      if (selectedItemSlot.index === undefined) {
        items.push(item)
      } else {
        items[selectedItemSlot.index] = item
      }
      const itemIds = items.map((i) => i.id).join(',')
      router.push(
        `${pathname}?${createQueryString(
          items[selectedItemSlot.index || 0].type,
          itemIds,
        )}`,
        { scroll: false },
      )
    } else {
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

  // Tracks whether the loadout is editable or not
  const [editable, setEditable] = useState(false)

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
        <Switch.Group
          as="div"
          className="absolute right-0 top-0 col-span-full mb-2 flex items-center"
        >
          <Switch
            checked={editable}
            onChange={setEditable}
            className={cn(
              editable ? 'bg-green-600' : 'bg-gray-200',
              'relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2',
            )}
          >
            <span
              aria-hidden="true"
              className={cn(
                editable ? 'translate-x-5' : 'translate-x-0',
                'pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out',
              )}
            />
          </Switch>
          <Switch.Label as="span" className="ml-3 text-sm">
            <span
              className={cn(
                'font-medium',
                editable ? 'text-green-500' : 'text-gray-500',
              )}
            >
              Editable
            </span>
          </Switch.Label>
        </Switch.Group>
      </div>
      <ItemSelect
        itemList={itemListForSlot}
        loadoutSlot={selectedItemSlot.type}
        open={isItemSelectModalOpen}
        onSelectItem={handleSelectItem}
        onClose={() => setSelectedItemSlot({ type: null })}
      />

      <CardRow>
        <ItemCard
          key="archtype1"
          item={loadout.items.archtypes ? loadout.items.archtypes[0] : null}
          type="archtype"
          size="sm"
          showFooter={editable}
          actions={
            <SelectButton
              onClick={() =>
                setSelectedItemSlot({ type: 'archtypes', index: 0 })
              }
            />
          }
        />
        <ItemCard
          key="skill1"
          item={loadout.items.skills ? loadout.items.skills[0] : null}
          type="skill"
          size="sm"
          showFooter={editable}
          actions={
            <SelectButton
              onClick={() => setSelectedItemSlot({ type: 'skills', index: 0 })}
            />
          }
        />

        <ItemCard
          key="archtype2"
          item={loadout.items.archtypes ? loadout.items.archtypes[1] : null}
          type="archtype"
          size="sm"
          showFooter={editable}
          actions={
            <SelectButton
              onClick={() =>
                setSelectedItemSlot({ type: 'archtypes', index: 1 })
              }
            />
          }
        />
        <ItemCard
          key="skill2"
          item={loadout.items.skills ? loadout.items.skills[1] : null}
          type="skill"
          size="sm"
          showFooter={editable}
          actions={
            <SelectButton
              onClick={() => setSelectedItemSlot({ type: 'skills', index: 1 })}
            />
          }
        />
      </CardRow>

      <CardRow>
        <ItemCard
          item={loadout.items.helm}
          type="helm"
          size="sm"
          showFooter={editable}
          actions={
            <SelectButton
              onClick={() => setSelectedItemSlot({ type: 'helm' })}
            />
          }
        />
        <ItemCard
          item={loadout.items.torso}
          type="torso"
          size="sm"
          showFooter={editable}
          actions={
            <SelectButton
              onClick={() => setSelectedItemSlot({ type: 'torso' })}
            />
          }
        />
        <ItemCard
          item={loadout.items.legs}
          type="legs"
          size="sm"
          showFooter={editable}
          actions={
            <SelectButton
              onClick={() => setSelectedItemSlot({ type: 'legs' })}
            />
          }
        />
        <ItemCard
          item={loadout.items.gloves}
          type="gloves"
          size="sm"
          showFooter={editable}
          actions={
            <SelectButton
              onClick={() => setSelectedItemSlot({ type: 'gloves' })}
            />
          }
        />
        <ItemCard
          item={loadout.items.relic}
          type="relic"
          size="sm"
          showFooter={editable}
          actions={
            <SelectButton
              onClick={() => setSelectedItemSlot({ type: 'relic' })}
            />
          }
        />
        <ItemCard
          item={loadout.items.amulet}
          type="amulet"
          size="sm"
          showFooter={editable}
          actions={
            <SelectButton
              onClick={() => setSelectedItemSlot({ type: 'amulet' })}
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
              showFooter={editable}
              actions={
                <SelectButton
                  onClick={() => setSelectedItemSlot({ type: 'rings', index })}
                />
              }
            />
          )
        })}
      </CardRow>

      <CardRow>
        <ItemCard
          item={loadout.items.mainhand}
          type="mainhand"
          size="sm"
          showFooter={editable}
          actions={
            <SelectButton
              onClick={() => setSelectedItemSlot({ type: 'mainhand' })}
            />
          }
        />
        <ItemCard
          item={loadout.items.mods ? loadout.items.mods[0] : null}
          type="mod"
          size="sm"
          showFooter={editable}
          actions={
            <SelectButton
              onClick={() => setSelectedItemSlot({ type: 'mods', index: 0 })}
            />
          }
        />
        <ItemCard
          item={loadout.items.mutators ? loadout.items.mutators[0] : null}
          type="mutator"
          size="sm"
          showFooter={editable}
          actions={
            <SelectButton
              onClick={() =>
                setSelectedItemSlot({ type: 'mutators', index: 0 })
              }
            />
          }
        />
      </CardRow>

      <CardRow>
        <ItemCard
          item={loadout.items.melee}
          type="melee"
          size="sm"
          showFooter={editable}
          actions={
            <SelectButton
              onClick={() => setSelectedItemSlot({ type: 'melee' })}
            />
          }
        />
        <ItemCard
          item={loadout.items.mods ? loadout.items.mods[1] : null}
          type="mod"
          size="sm"
          showFooter={editable}
          actions={
            <SelectButton
              onClick={() => setSelectedItemSlot({ type: 'mods', index: 1 })}
            />
          }
        />
        <ItemCard
          item={loadout.items.mutators ? loadout.items.mutators[1] : null}
          type="mutator"
          size="sm"
          showFooter={editable}
          actions={
            <SelectButton
              onClick={() =>
                setSelectedItemSlot({ type: 'mutators', index: 1 })
              }
            />
          }
        />
      </CardRow>

      <CardRow>
        <ItemCard
          item={loadout.items.offhand}
          type="offhand"
          size="sm"
          showFooter={editable}
          actions={
            <SelectButton
              onClick={() => setSelectedItemSlot({ type: 'offhand' })}
            />
          }
        />
        <ItemCard
          item={loadout.items.mods ? loadout.items.mods[2] : null}
          type="mod"
          size="sm"
          showFooter={editable}
          actions={
            <SelectButton
              onClick={() => setSelectedItemSlot({ type: 'mods', index: 2 })}
            />
          }
        />
        <ItemCard
          item={loadout.items.mutators ? loadout.items.mutators[2] : null}
          type="mutator"
          size="sm"
          showFooter={editable}
          actions={
            <SelectButton
              onClick={() =>
                setSelectedItemSlot({ type: 'mutators', index: 2 })
              }
            />
          }
        />
      </CardRow>
    </Fragment>
  )
}
