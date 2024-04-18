import { cn } from '@/lib/classnames'

import { ApplyFiltersButton } from '../../../app/(components)/buttons/filter-buttons/apply-filters-button'
import { ClearFiltersButton } from '../../../app/(components)/buttons/filter-buttons/clear-filters-button'

interface Props<T> {
  areFiltersApplied: boolean
  areAnyFiltersActive: boolean
  children: React.ReactNode
  filters: T
  onClearFilters: () => void
  onApplyFilters?: (filters: T) => void
}
export function FiltersContainer<T>({
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
        'relative mb-8 h-full max-h-fit w-full transform overflow-y-auto border-2 border-secondary-500 bg-black px-4 pb-4 pt-4 text-left shadow-lg shadow-secondary-500/50',
        areAnyFiltersActive &&
          'border-accent1-300 shadow-xl shadow-accent1-600',
      )}
    >
      <div className="grid-cols-full grid gap-x-8 bg-black sm:grid-cols-6">
        {children}
        <div className="col-span-full flex items-center justify-end pt-2">
          <div className="col-span-full flex w-full items-center justify-center">
            {areAnyFiltersActive ? (
              <ClearFiltersButton onClick={onClearFilters} />
            ) : null}
            {onApplyFilters ? (
              <div className="ml-4">
                <ApplyFiltersButton
                  areFiltersApplied={areFiltersApplied}
                  filters={filters}
                  onClick={onApplyFilters}
                />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}
