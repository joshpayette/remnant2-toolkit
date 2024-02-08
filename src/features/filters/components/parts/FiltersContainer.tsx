import { cn } from '@/lib/classnames'
import ClearFiltersButton from './ClearFiltersButton'
import ApplyFiltersButton from './ApplyFiltersButton'

interface Props<T> {
  areFiltersApplied: boolean
  areAnyFiltersActive: boolean
  children: React.ReactNode
  filters: T
  onClearFilters: () => void
  onApplyFilters: (filters: T) => void
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
            <div className="col-span-full flex items-center justify-end">
              <ClearFiltersButton onClick={onClearFilters} />
            </div>
          )}
          <div className="ml-4">
            <ApplyFiltersButton
              areFiltersApplied={areFiltersApplied}
              filters={filters}
              onClick={onApplyFilters}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
