import { cn } from '@/lib/classnames'
import ClearFiltersButton from './ClearFiltersButton'

interface Props<T> {
  areAnyFiltersActive: boolean
  areFiltersApplied: boolean
  children: React.ReactNode
  filters: T
  onApplyFilters: (filters: T) => void
  onClearFilters: () => void
}

export default function FiltersContainer<T>({
  areAnyFiltersActive,
  areFiltersApplied,
  children,
  filters,
  onApplyFilters,
  onClearFilters,
}: Props<T>) {
  return (
    <div
      className={cn(
        'relative h-full max-h-fit w-full transform overflow-y-auto border-2 border-purple-500 bg-black px-4 pb-4 pt-4 text-left shadow-lg shadow-purple-500/50 sm:my-8 sm:p-6',
        areAnyFiltersActive &&
          'border-yellow-500 shadow-xl shadow-yellow-500/50',
      )}
    >
      <div className="grid-cols-full grid gap-x-8 gap-y-4 divide-y divide-green-800 bg-black sm:grid-cols-4">
        {children}
        <div className="col-span-full flex items-center justify-end pt-2">
          {areAnyFiltersActive && (
            <div className="col-span-full mr-4 flex items-center justify-end">
              <ClearFiltersButton onClick={onClearFilters} />
            </div>
          )}
          <button
            className={cn(
              'rounded bg-green-500 p-2 text-sm font-bold text-black hover:bg-green-700 hover:text-white',
              !areFiltersApplied && 'animate-pulse ',
            )}
            onClick={() => onApplyFilters(filters)}
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  )
}
