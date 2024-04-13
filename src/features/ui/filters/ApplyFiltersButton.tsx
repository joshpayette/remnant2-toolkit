import { Button } from '@/app/(components)/base/button'
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
    <Button
      color="cyan"
      className={cn(!areFiltersApplied && 'animate-pulse ')}
      aria-label="Apply Filters"
      onClick={() => onClick(filters)}
    >
      Apply Filters
    </Button>
  )
}
