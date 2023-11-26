import FilterCheckbox from './FilterCheckbox'
import type { Filters } from './types'

interface TrackerFiltersProps {
  filters: Filters
  onUndiscoveredClick: () => void
  onDiscoveredClick: () => void
}

export default function TrackerFilters({
  filters,
  onUndiscoveredClick,
  onDiscoveredClick,
}: TrackerFiltersProps) {
  return (
    <div className="rounded border border-purple-700  p-4">
      <fieldset>
        <legend className="text-base font-semibold leading-6 text-white">
          Filters
        </legend>
        <div className="grid grid-cols-1 md:grid-cols-2">
          <div className="mt-4 divide-y divide-purple-400 border-b border-t border-purple-400">
            <FilterCheckbox
              key="filter-type-undiscovered"
              label={`Show undiscovered items`}
              id={`filter-type-undiscovered`}
              checked={filters.undiscovered}
              onChange={onUndiscoveredClick}
            />
            <FilterCheckbox
              key="filter-type-discovered"
              label={`Show discovered items`}
              id={`filter-type-discovered`}
              checked={filters.discovered}
              onChange={onUndiscoveredClick}
            />
          </div>
        </div>
      </fieldset>
    </div>
  )
}
