'use client'

import { Fragment } from 'react'
import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/20/solid'
import { capitalize, cn } from '@/lib/utils'
import ItemCardButton from '@/components/ItemCardButton'
import type { Filters } from './Filters'
import type { Item, ItemType } from '@/types'
import { useIsClient } from 'usehooks-ts'

function getProgress(
  items: Array<Item & { discovered: boolean }>,
  itemType: ItemType,
  isClient: boolean,
) {
  const discoveredCount = items.filter(
    (item) => item.type === itemType && item.discovered,
  ).length
  const discoveredPercent = Math.round(
    (discoveredCount / items.length) * 100,
  ).toString()
  const total = items.filter((item) => item.type === itemType).length

  return isClient
    ? `${discoveredCount} / ${total} (${discoveredPercent}%)`
    : 'Calculating...'
}

interface ListItemsProps {
  filters: Filters
  items: Array<Item & { discovered: boolean }>
  itemTypes: ItemType[]
  onClick: (itemId: string) => void
}

export default function ListItems({
  filters,
  items,
  itemTypes,
  onClick,
}: ListItemsProps) {
  const isClient = useIsClient()

  const gridTemplate =
    'grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-4'

  return (
    <Fragment>
      <div>
        {itemTypes.map((itemType) => (
          <Disclosure key={itemType} defaultOpen>
            {({ open }) => (
              <Fragment>
                <Disclosure.Button className="flex w-full justify-start border-b border-purple-700 p-4 text-left hover:border-green-400 hover:bg-black focus:outline-none focus-visible:ring focus-visible:ring-green-500/75">
                  <div className="w-full">
                    <h2 className="text-lg font-semibold">
                      {capitalize(itemType)}
                    </h2>
                    <span className="text-sm text-gray-400">
                      {getProgress(
                        items.filter((i) => i.type === itemType),
                        itemType,
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
                <Disclosure.Panel className={cn(gridTemplate, 'py-4')}>
                  {items
                    .filter((item) => item.type === itemType)
                    .filter((item) => {
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
                        <ItemCardButton
                          item={item}
                          onClick={() => onClick(item.id)}
                        />
                      </div>
                    ))}
                </Disclosure.Panel>
              </Fragment>
            )}
          </Disclosure>
        ))}
      </div>
    </Fragment>
  )
}
