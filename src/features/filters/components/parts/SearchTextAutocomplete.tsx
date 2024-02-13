import { Combobox } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/solid'
import { useEffect, useState } from 'react'

import { remnantBosses } from '@/features/bosses/remnantBosses'
import { DESCRIPTION_TAGS, ITEM_TAGS } from '@/features/items/constants'
import { remnantItems } from '@/features/items/data/remnantItems'
import { cn } from '@/lib/classnames'

type Item = {
  id: string
  name: string
}

interface Props {
  onChange: (value: string) => void
  onKeyDown?: () => void
  items: Item[]
  value: string
}

export function SearchTextAutocomplete({
  onChange,
  onKeyDown,
  items,
  value,
}: Props) {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null)

  // Ensures the item clear when clear filters pressed
  useEffect(() => {
    if (value === '') {
      setSelectedItem(null)
    }
  }, [value])

  useEffect(() => {
    onKeyDown && onKeyDown()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedItem])

  const filteredItems =
    value === ''
      ? items
      : items.filter((item) =>
          item.name.toLowerCase().includes(value.toLowerCase()),
        )

  return (
    <Combobox
      as="div"
      value={selectedItem}
      onChange={(item) => {
        if (item) onChange(item.name)
        setSelectedItem(item)
      }}
      className="w-full"
      nullable
    >
      <Combobox.Label className="block text-sm font-bold leading-6  text-green-500">
        Search Text
      </Combobox.Label>
      <div className="relative mt-2">
        <Combobox.Input
          className="w-full rounded-md border border-purple-600 bg-black py-1.5 pl-3 pr-10 text-sm text-gray-300 shadow-sm ring-1 ring-inset ring-purple-600 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:leading-6"
          onChange={(event) => onChange(event.target.value)}
          displayValue={(item: Item) => item?.name}
        />
        <Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <ChevronUpDownIcon
            className="h-5 w-5 text-gray-400"
            aria-hidden="true"
          />
        </Combobox.Button>

        {filteredItems.length > 0 && (
          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-gray-900 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {value.length > 0 &&
              !items.some(
                (item) => item.name.toLowerCase() === value.toLowerCase(),
              ) && (
                <Combobox.Option
                  value={{ id: null, name: value }}
                  className={({ active }) =>
                    cn(
                      'relative cursor-default select-none py-2 pl-3 pr-9',
                      active ? 'bg-purple-600 text-white' : 'text-gray-300',
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
                    active ? 'bg-purple-600 text-white' : 'text-gray-300',
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
                          active ? 'text-white' : 'text-purple-600',
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
        )}
      </div>
    </Combobox>
  )
}
