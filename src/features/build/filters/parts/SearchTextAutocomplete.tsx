'use client'

import { Combobox } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/solid'
import React, { useEffect, useState } from 'react'
import { useIsClient, useMediaQuery } from 'usehooks-ts'

import { Skeleton } from '@/features/ui/Skeleton'
import { cn } from '@/lib/classnames'

type Item = {
  id: string
  name: string
}

interface Props {
  autoFocus?: boolean
  onChange: (value: string) => void
  onKeyDown?: () => void
  items: Item[]
  value: string
  showLabel?: boolean
}

export function SearchTextAutocomplete({
  autoFocus = false,
  onChange,
  onKeyDown,
  items,
  showLabel = true,
  value,
}: Props) {
  const [selectedItem, setSelectedItem] = useState<Item | null>(
    value === ''
      ? null
      : {
          id: '',
          name: value,
        },
  )

  useEffect(() => {
    if (!selectedItem) return
    if (selectedItem.name === value && onKeyDown) onKeyDown()
  }, [selectedItem, onKeyDown, value])

  const filteredItems =
    value === ''
      ? items
      : items.filter((item) =>
          item.name.toLowerCase().includes(value.toLowerCase()),
        )

  const isClient = useIsClient()
  const isLargeScreen = useMediaQuery('(min-width: 768px)')

  if (!isClient) return <Skeleton className="h-[67px] w-[400px]" />

  return (
    <Combobox
      as="div"
      value={selectedItem}
      onChange={(item) => {
        if (item) {
          setSelectedItem(item)
          onChange(item.name)
        }
      }}
      onKeyDown={(e: React.KeyboardEvent<HTMLElement>) => {
        if (e.key === 'Enter') {
          if (onKeyDown) onKeyDown()
        }
      }}
      className={cn('w-full')}
      nullable
    >
      {showLabel && (
        <Combobox.Label className="block text-sm font-bold leading-6 text-primary-500">
          Search Text
        </Combobox.Label>
      )}
      <div className="relative mt-2">
        <Combobox.Input
          className="w-full rounded-md border-2 border-secondary-700 bg-black py-1.5 pl-3 pr-10 text-sm text-gray-300 shadow-sm ring-1 ring-secondary-700 focus:border-secondary-500 focus:outline-none focus:ring-1 focus:ring-secondary-500"
          onChange={(event) => onChange(event.target.value)}
          displayValue={(item: Item) => item?.name}
          placeholder="Search for an item or tag"
          autoFocus={autoFocus && isLargeScreen}
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <ChevronUpDownIcon
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </Combobox.Button>

        <Combobox.Options className="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-md bg-gray-900 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
          {value.length > 0 && (
            <Combobox.Option
              value={{ id: null, name: value }}
              className={({ active }) =>
                cn(
                  'relative cursor-default select-none py-2 pl-3 pr-9',
                  active ? 'bg-secondary-600 text-white' : 'text-gray-300',
                )
              }
            >
              {value}
            </Combobox.Option>
          )}

          {filteredItems.map((item) => (
            <Combobox.Option
              key={item.id}
              value={item}
              className={({ active }) =>
                cn(
                  'relative cursor-default select-none py-2 pl-3 pr-9',
                  active ? 'bg-secondary-600 text-white' : 'text-gray-300',
                )
              }
            >
              {({ active, selected }) => (
                <>
                  <span
                    className={cn(
                      'block truncate',
                      selected && 'font-semibold',
                    )}
                  >
                    {item.name}
                  </span>

                  {selected && (
                    <span
                      className={cn(
                        'absolute inset-y-0 right-0 flex items-center pr-4',
                        active ? 'text-white' : 'text-secondary-600',
                      )}
                    >
                      <CheckIcon className="h-5 w-5" aria-hidden="true" />
                    </span>
                  )}
                </>
              )}
            </Combobox.Option>
          ))}
        </Combobox.Options>
      </div>
    </Combobox>
  )
}
