import FilterCheckbox from './Checkbox'
import type { Filters } from '../types'
import { remnantItemTypes } from '@/data/items'

interface FiltersProps {
  filters: Filters
  onFiltersChange: (newFilters: Filters) => void
}

export default function Filters({ filters, onFiltersChange }: FiltersProps) {
  return (
    <div className="max-w-md rounded border border-purple-700 p-4">
      <fieldset>
        <legend className="text-base font-semibold leading-6 text-white">
          Filters
        </legend>
        <div className="grid grid-cols-1 gap-5">
          <div className="mt-4 divide-y divide-purple-400 border-b border-t border-purple-400">
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
            <FilterCheckbox
              key="filter-type-discovered"
              label={`Show discovered items`}
              id={`filter-type-discovered`}
              checked={filters.discovered}
              onChange={() =>
                onFiltersChange({ ...filters, discovered: !filters.discovered })
              }
            />
          </div>
          <div className="grid grid-cols-2 gap-10">
            {remnantItemTypes.map((type) => (
              <div
                key={`filter-type-${type}`}
                className="border-b border-purple-400"
              >
                <FilterCheckbox
                  label={`Show ${type} items`}
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
        </div>
      </fieldset>
    </div>
  )
}
