'use client'

import { remnantItemTypes } from '@/data/items'
import type { Filters } from './types'
import { capitalize, cn } from '@/lib/utils'
import type { Item } from '@/types'
import ItemCard from '@/components/ItemCard'
import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/20/solid'
import { Fragment, useState } from 'react'

interface ListItemsProps {
  filters: Filters
  items: Item[]
  variant: 'undiscovered' | 'discovered'
  onClick: (itemId: string) => void
}

export default function ListItems({
  filters,
  items,
  variant,
  onClick,
}: ListItemsProps) {
  const gridTemplate =
    'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8'

  return (
    <Disclosure defaultOpen>
      {({ open }) => (
        <Fragment>
          <Disclosure.Button className="flex w-full justify-between border-b border-purple-700 p-4 hover:bg-purple-700 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
            <h1 className="w-full text-2xl font-semibold leading-6 text-white">{`${capitalize(
              variant,
            )} Items`}</h1>
            <ChevronUpIcon
              className={cn(
                'h-5 w-5 text-white',
                open ? 'rotate-180 transform' : '',
              )}
            />
          </Disclosure.Button>
          <Disclosure.Panel>
            {remnantItemTypes.map(
              (itemType) =>
                filters[itemType] && (
                  <Disclosure key={itemType} defaultOpen>
                    {({ open }) => (
                      <Fragment>
                        <Disclosure.Button className="flex w-full justify-start border-b border-purple-700 p-4 text-left focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
                          <h2 className="w-full text-lg font-semibold leading-6 text-white">
                            {capitalize(itemType)}
                          </h2>
                          <ChevronUpIcon
                            className={cn(
                              'h-5 w-5 text-white',
                              open ? 'rotate-180 transform' : '',
                            )}
                          />
                        </Disclosure.Button>
                        <Disclosure.Panel className={cn(gridTemplate)}>
                          {items
                            .filter((item) => item.type === itemType)
                            .map((item) => (
                              <button
                                key={item.id}
                                className={cn(
                                  variant === 'undiscovered'
                                    ? 'grayscale hover:grayscale-0'
                                    : 'grayscale-0 hover:grayscale',
                                )}
                                onClick={() => onClick(item.id)}
                              >
                                <ItemCard item={item} />
                              </button>
                            ))}
                        </Disclosure.Panel>
                      </Fragment>
                    )}
                  </Disclosure>
                ),
            )}
          </Disclosure.Panel>
        </Fragment>
      )}
    </Disclosure>
  )
}
