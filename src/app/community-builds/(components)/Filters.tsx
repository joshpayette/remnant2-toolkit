import { cn } from '@/app/(lib)/utils'
import { SearchFilters } from '../search/page'

interface Props {
  defaultFilters: SearchFilters
  filters: SearchFilters
  onUpdate: (filters: SearchFilters) => void
}

export default function Filters({ defaultFilters, filters, onUpdate }: Props) {
  function clearFilters() {
    onUpdate(defaultFilters)
  }

  const areAnyFiltersActive = () => {
    if (filters.ownedItemsOnly !== defaultFilters.ownedItemsOnly) {
      return true
    }
    return false
  }

  return (
    <div
      className={cn(
        'relative h-full max-h-fit transform overflow-y-auto border-2 border-green-500 bg-black px-4 pb-4 pt-4 text-left shadow-lg shadow-green-500/50 sm:my-8 sm:p-6',
        areAnyFiltersActive() &&
          'border-yellow-500 shadow-xl shadow-yellow-500/50',
      )}
    >
      <div className="grid-cols-full grid gap-x-8 gap-y-4 divide-y divide-green-800 bg-black sm:grid-cols-4">
        {areAnyFiltersActive() && (
          <div className="col-span-full flex items-center justify-end">
            <button
              className="flex w-auto items-center justify-center gap-1 rounded-md border border-green-400  bg-green-500 bg-gradient-to-b p-2 text-sm font-bold text-white drop-shadow-md hover:bg-green-700"
              onClick={clearFilters}
            >
              Clear Filters
            </button>
          </div>
        )}
        <div className="col-span-full pt-2">
          <div className="flex w-full flex-col items-start justify-start gap-x-4 gap-y-2">
            <span className="flex items-start justify-start text-left text-sm font-bold text-green-500">
              By Collection
            </span>
            <div className="grid grid-cols-2 text-left">
              <Checkbox
                label="Limit to items you own"
                name={`filter-owned-items`}
                checked={filters.ownedItemsOnly}
                onChange={() =>
                  onUpdate({
                    ...filters,
                    ownedItemsOnly: !filters.ownedItemsOnly,
                  })
                }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function Checkbox({
  checked,
  label,
  name,
  onChange,
}: {
  checked: boolean
  label: string
  name: string
  onChange: () => void
}) {
  return (
    <div className="relative flex items-start">
      <div className="flex h-6 items-center">
        <input
          id={`${name}`}
          aria-describedby={`${name}-description`}
          name={`${name}`}
          type="checkbox"
          className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-600"
          checked={checked}
          onChange={onChange}
        />
      </div>
      <div className="ml-3 text-sm leading-6">
        <label htmlFor={`${name}`} className="font-medium text-gray-400">
          {label}
        </label>
      </div>
    </div>
  )
}
