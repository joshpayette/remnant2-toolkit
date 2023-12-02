import FilterCheckbox from './Checkbox'
import { Fragment } from 'react'

export type Filters = {
  undiscovered: boolean
  discovered: boolean
}

interface FiltersProps {
  filters: Filters
  onFiltersChange: (newFilters: Filters) => void
}

export default function TrackerFilters({
  filters,
  onFiltersChange,
}: FiltersProps) {
  return (
    <div className="z-40 mx-auto max-h-full w-full max-w-lg overflow-x-scroll rounded border border-green-700 bg-black p-4">
      <Fragment>
        <div className="py-2 text-left text-lg font-medium text-white">
          <h3>Filters</h3>
        </div>
        <div className="grid grid-cols-1 gap-1 md:grid-cols-2 md:gap-4">
          <div className="border-b border-green-500">
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
          <div className="border-b border-green-500">
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
        </div>
      </Fragment>
    </div>
  )
}
