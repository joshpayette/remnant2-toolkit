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
        'rounded bg-green-500 p-2 text-sm font-bold text-black hover:bg-green-700 hover:text-white',
        !areFiltersApplied && 'animate-pulse ',
      )}
      onClick={() => onClick(filters)}
    >
      Apply Filters
    </button>
  )
}
