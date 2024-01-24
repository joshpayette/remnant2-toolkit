import { Fragment } from 'react'
import { cn } from '../../../lib/utils'
import { Listbox, Transition } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/24/solid'

interface Props {
  filter: string
  onFilterChange: (filter: string) => void
  options: string[]
  label?: string
}

export default function BuildListFilters({
  filter,
  onFilterChange,
  label = 'Filter',
  options,
}: Props) {
  return (
    <Listbox value={filter} onChange={onFilterChange}>
      {({ open }) => (
        <>
          <Listbox.Label className="mr-2 block text-left text-sm font-medium leading-6 text-green-500">
            {label}
          </Listbox.Label>
          <div className="relative">
            <Listbox.Button className="relative w-full min-w-[150px] cursor-default rounded-md bg-white py-1.5 pl-3 pr-10 text-left text-sm text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-600 sm:text-sm sm:leading-6">
              <span className="block truncate">{filter}</span>
              <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                <ChevronUpDownIcon
                  className="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                {options.map((option) => (
                  <Listbox.Option
                    key={option}
                    className={({ active }) =>
                      cn(
                        active ? 'bg-purple-600 text-white' : 'text-gray-900',
                        'relative cursor-default select-none py-2 pl-3 pr-9',
                      )
                    }
                    value={option}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={cn(
                            selected ? 'font-semibold' : 'font-normal',
                            'block truncate text-sm',
                          )}
                        >
                          {option}
                        </span>

                        {selected ? (
                          <span
                            className={cn(
                              active ? 'text-white' : 'text-purple-600',
                              'absolute inset-y-0 right-0 flex items-center pr-4',
                            )}
                          >
                            <CheckIcon className="h-5 w-5" aria-hidden="true" />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  )
}
