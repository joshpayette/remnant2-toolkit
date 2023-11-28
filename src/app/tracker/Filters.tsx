import FilterCheckbox from './Checkbox'
import type { Filters } from './types'
import { remnantItemTypes } from '@/data/items'
import { cn } from '@/lib/utils'
import { Disclosure } from '@headlessui/react'
import { ChevronUpIcon } from '@heroicons/react/20/solid'
import { Fragment } from 'react'

interface FiltersProps {
  filters: Filters
  onFiltersChange: (newFilters: Filters) => void
}

export default function Filters({ filters, onFiltersChange }: FiltersProps) {
  return (
    <div className="fixed bottom-0 left-0 z-40 mx-auto max-h-full w-full max-w-4xl overflow-x-scroll rounded border border-purple-700 bg-black p-4">
      <Disclosure>
        {({ open }) => (
          <Fragment>
            <Disclosure.Button className="flex w-full justify-between rounded-lg bg-purple-500 px-4 py-2 text-left text-sm font-medium text-white hover:bg-purple-700 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75">
              <span>Filters</span>
              <ChevronUpIcon
                className={cn(
                  'h-5 w-5 text-white',
                  open ? 'rotate-180 transform' : '',
                )}
              />
            </Disclosure.Button>
            <Disclosure.Panel className="grid grid-cols-1 gap-1 md:grid-cols-2 md:gap-4">
              <div className="border-b border-purple-500">
                <FilterCheckbox
                  key="filter-type-undiscovered"
                  label={`Show undiscovered items`}
                  id={`filter-type-undiscovered`}
                  checked={filters.undiscovered}
                  onChange={() =>
                    onFiltersChange({
                      ...filters,
                      undiscovered: !filters.undiscovered,
                    })
                  }
                />
              </div>
              <div className="border-b border-purple-500">
                <FilterCheckbox
                  key="filter-type-discovered"
                  label={`Show discovered items`}
                  id={`filter-type-discovered`}
                  checked={filters.discovered}
                  onChange={() =>
                    onFiltersChange({
                      ...filters,
                      discovered: !filters.discovered,
                    })
                  }
                />
              </div>
              <div className="grid grid-cols-1 gap-1 md:col-span-3 md:grid-cols-4 md:gap-4">
                {remnantItemTypes.map((type) => (
                  <div
                    key={`filter-type-${type}`}
                    className="border-b border-purple-400"
                  >
                    <FilterCheckbox
                      label={`${type}`}
                      id={`filter-type-${type}`}
                      checked={filters[type]}
                      onChange={() =>
                        onFiltersChange({
                          ...filters,
                          [type]: !filters[type],
                        })
                      }
                    />
                  </div>
                ))}
              </div>
            </Disclosure.Panel>
          </Fragment>
        )}
      </Disclosure>
    </div>
  )
}
