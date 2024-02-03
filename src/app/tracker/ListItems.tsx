'use client'

import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/20/solid'
import { cn } from '@/lib/classnames'
import { useIsClient } from 'usehooks-ts'
import { useLocalStorage } from '@/features/localstorage/useLocalStorage'
import ItemCard from './ItemCard'
import { InformationCircleIcon } from '@heroicons/react/24/solid'
import { ItemCategory } from '@/features/build/types'
import { WeaponItem } from '@/features/items/types/WeaponItem'
import { Item } from '@/features/items/types'
import { MutatorItem } from '@/features/items/types/MutatorItem'

interface ItemTrackerCategory {
  category: ItemCategory
  label: string
  type?: WeaponItem['type'] | MutatorItem['type']
}

function getProgress(
  items: Array<Item & { discovered: boolean }>,
  itemCategory: ItemTrackerCategory,
  isClient: boolean,
) {
  const discoveredCount = items.filter((item) => {
    if (WeaponItem.isWeaponItem(item) || MutatorItem.isMutatorItem(item)) {
      return (
        item.category === itemCategory.category &&
        item.type === itemCategory.type &&
        item.discovered
      )
    }
    return item.category === itemCategory.category && item.discovered
  }).length

  let discoveredPercent = Math.round((discoveredCount / items.length) * 100)

  if (isNaN(discoveredPercent)) discoveredPercent = 0

  const totalDiscoverableItems = items.filter(
    (item) => item.category === itemCategory.category,
  ).length

  return isClient
    ? `${discoveredCount} / ${totalDiscoverableItems} (${discoveredPercent}%)`
    : 'Calculating...'
}

interface ListItemsProps {
  items: Array<Item & { discovered: boolean }>
  onClick: (itemId: string) => void
  onShowItemInfo: (itemId: string) => void
}

export default function ListItems({
  items,
  onClick,
  onShowItemInfo,
}: ListItemsProps) {
  const { collapsedCategories, setCollapsedCategories } = useLocalStorage()

  const isClient = useIsClient()

  function handleCategoryToggle(itemCategory: ItemCategory) {
    const newCollapsedItemTypes = collapsedCategories.includes(itemCategory)
      ? collapsedCategories.filter((type) => type !== itemCategory)
      : [...collapsedCategories, itemCategory]

    setCollapsedCategories({
      categories: newCollapsedItemTypes,
    })
  }

  const itemCategories: ItemTrackerCategory[] = [
    { category: 'helm' as ItemCategory, label: 'Helms' },
    { category: 'torso' as ItemCategory, label: 'Torsos' },
    { category: 'legs' as ItemCategory, label: 'Legs' },
    { category: 'gloves' as ItemCategory, label: 'Gloves' },
    { category: 'relic' as ItemCategory, label: 'Relics' },
    { category: 'relicfragment' as ItemCategory, label: 'Relic Fragments' },
    { category: 'amulet' as ItemCategory, label: 'Amulets' },
    { category: 'ring' as ItemCategory, label: 'Rings' },
    {
      category: 'weapon' as ItemCategory,
      label: 'Long Guns',
      type: 'long gun' as WeaponItem['type'],
    },
    {
      category: 'weapon' as ItemCategory,
      label: 'Hand Guns',
      type: 'hand gun' as WeaponItem['type'],
    },
    {
      category: 'weapon' as ItemCategory,
      label: 'Melee',
      type: 'melee' as WeaponItem['type'],
    },
    { category: 'archetype' as ItemCategory, label: 'Archetypes' },
    { category: 'trait' as ItemCategory, label: 'Traits' },
    { category: 'mod' as ItemCategory, label: 'Mods' },
    {
      category: 'mutator' as ItemCategory,
      label: 'Mutators (Guns)',
      type: 'gun' as MutatorItem['type'],
    },
    {
      category: 'mutator' as ItemCategory,
      label: 'Mutators (Melee)',
      type: 'melee' as MutatorItem['type'],
    },
    {
      category: 'concoction' as ItemCategory,
      label: 'Concoctions',
    },
    {
      category: 'consumable' as ItemCategory,
      label: 'Consumables',
    },
    {
      category: 'misc' as ItemCategory,
      label: 'Miscellaneous',
    },
  ].filter((itemCategory) => {
    const visibleCategories = Array.from(
      new Set(items.map((item) => item.category)),
    )
    return visibleCategories.includes(
      (itemCategory as ItemTrackerCategory).category,
    )
  })

  return (
    <div className="w-full">
      {itemCategories.map((itemCategory) => (
        <Disclosure
          key={itemCategory.label}
          defaultOpen={!collapsedCategories.includes(itemCategory.category)}
        >
          {({ open }) => (
            <>
              <Disclosure.Button
                onClick={() => handleCategoryToggle(itemCategory.category)}
                className="flex w-full justify-start border-b border-purple-700 p-4 text-left hover:border-green-400 hover:bg-black focus:outline-none focus-visible:ring focus-visible:ring-green-500/75"
              >
                <div className="w-full">
                  <h2 className="text-lg font-semibold">
                    {itemCategory.label}
                  </h2>
                  <span className="text-sm text-gray-400">
                    {getProgress(
                      items.filter((item) => {
                        if (
                          WeaponItem.isWeaponItem(item) ||
                          MutatorItem.isMutatorItem(item)
                        ) {
                          return (
                            item.category === itemCategory.category &&
                            item.type === itemCategory.type
                          )
                        }
                        return item.category === itemCategory.category
                      }),
                      itemCategory,
                      isClient,
                    )}
                  </span>
                </div>
                <ChevronUpIcon
                  className={cn(
                    'h-5 w-5 text-white',
                    open ? 'rotate-180 transform' : '',
                  )}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="grid w-full grid-cols-2 gap-4 py-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10">
                {items
                  .filter((item) => {
                    if (
                      WeaponItem.isWeaponItem(item) ||
                      MutatorItem.isMutatorItem(item)
                    ) {
                      return (
                        item.category === itemCategory.category &&
                        item.type === itemCategory.type
                      )
                    }
                    return item.category === itemCategory.category
                  }) // Filter by category
                  .map((item) => (
                    <div key={item.id} className="flex flex-col">
                      <div
                        className={cn(
                          'relative h-full w-full',
                          item.discovered
                            ? 'border-2 border-green-500 grayscale-0'
                            : 'border-2 border-transparent grayscale',
                        )}
                      >
                        <ItemCard
                          item={item}
                          onClick={() => onClick(item.id)}
                        />
                      </div>
                      <div className="flex items-end justify-end bg-black">
                        <button
                          className="flex w-auto items-center gap-1 rounded-md px-2 py-1 text-xs text-green-500 hover:bg-green-500 hover:text-black focus:outline-none focus-visible:ring focus-visible:ring-green-500/75"
                          onClick={() => onShowItemInfo(item.id)}
                        >
                          <InformationCircleIcon className="h-5 w-5" /> Info
                        </button>
                      </div>
                    </div>
                  ))}
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      ))}
    </div>
  )
}
