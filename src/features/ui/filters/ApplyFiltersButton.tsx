import { cn } from '@/lib/classnames'

interface Props<T> {
  areFiltersApplied: boolean
  filters: T
  onClick: (newData: T) => void
}

export function ApplyFiltersButton<T>({
  areFiltersApplied,
  filters,
  onClick,
}: Props<T>) {
  return (
    <button
      className={cn(
        'bg-primary-500 hover:bg-primary-300 rounded p-2 text-sm font-bold text-black',
        !areFiltersApplied && 'animate-pulse ',
      )}
      aria-label="Apply Filters"
      onClick={() => onClick(filters)}
    >
      Apply Filters
    </button>
  )
}
