'use client'

import { Fragment } from 'react'
import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/20/solid'
import { capitalize, cn } from '@/lib/utils'
import { type Filters } from './Filters'
import { type Item, type ItemCategory } from '@/types'
import { useIsClient } from 'usehooks-ts'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import ItemCard from './ItemCard'

function getProgress(
  items: Array<Item & { discovered: boolean }>,
  itemCategory: ItemCategory,
  isClient: boolean,
) {
  const discoveredCount = items.filter(
    (item) => item.category === itemCategory && item.discovered,
  ).length
  const discoveredPercent = Math.round(
    (discoveredCount / items.length) * 100,
  ).toString()
  const total = items.filter((item) => item.category === itemCategory).length

  return isClient
    ? `${discoveredCount} / ${total} (${discoveredPercent}%)`
    : 'Calculating...'
}

interface ListItemsProps {
  filters: Filters
  items: Array<Item & { discovered: boolean }>
  itemCategories: ItemCategory[]
  onClick: (itemId: string) => void
  onShowItemInfo: (itemId: string) => void
}

export default function ListItems({
  filters,
  items,
  itemCategories,
  onClick,
  onShowItemInfo,
}: ListItemsProps) {
  const { itemTrackerStorage, setItemTrackerStorage } = useLocalStorage()
  const { collapsedCategories } = itemTrackerStorage

  const isClient = useIsClient()

  const getItemTitle = (itemCategory: ItemCategory) => {
    if (itemCategory === 'relicfragment') return 'Relic Fragments'
    return capitalize(itemCategory)
  }

  function handleCategoryToggle(itemCategory: ItemCategory) {
    const newCollapsedItemTypes = collapsedCategories.includes(itemCategory)
      ? collapsedCategories.filter((type) => type !== itemCategory)
      : [...collapsedCategories, itemCategory]

    setItemTrackerStorage({
      ...itemTrackerStorage,
      collapsedCategories: newCollapsedItemTypes,
    })
  }

  return (
    <div className="w-full">
      {itemCategories.map((itemCategory) => (
        <Disclosure
          key={itemCategory}
          defaultOpen={!collapsedCategories.includes(itemCategory)}
        >
          {({ open }) => (
            <Fragment>
              <Disclosure.Button
                onClick={() => handleCategoryToggle(itemCategory)}
                className="flex w-full justify-start border-b border-purple-700 p-4 text-left hover:border-green-400 hover:bg-black focus:outline-none focus-visible:ring focus-visible:ring-green-500/75"
              >
                <div className="w-full">
                  <h2 className="text-lg font-semibold">
                    {getItemTitle(itemCategory)}
                  </h2>
                  <span className="text-sm text-gray-400">
                    {getProgress(
                      items.filter((i) => i.category === itemCategory),
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
                  .filter((item) => item.category === itemCategory) // Filter by category
                  .filter((item) => {
                    // Filter by discovered/undiscovered
                    if (filters.undiscovered && filters.discovered) {
                      return true
                    } else if (filters.undiscovered) {
                      return item.discovered === false
                    } else if (filters.discovered) {
                      return item.discovered === true
                    } else {
                      return false
                    }
                  })
                  .map((item) => (
                    <div
                      key={item.id}
                      className={cn(
                        'relative h-full w-full',
                        item.discovered
                          ? 'border-2 border-purple-400 grayscale-0'
                          : 'border-2 border-transparent grayscale',
                      )}
                    >
                      <ItemCard item={item} onClick={() => onClick(item.id)} />
                    </div>
                  ))}
              </Disclosure.Panel>
            </Fragment>
          )}
        </Disclosure>
      ))}
    </div>
  )
}
