import { BaseButton } from '@/app/(components)/_base/button'
import { cn } from '@/app/(utils)/classnames'

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
    <BaseButton
      color="cyan"
      className={cn(!areFiltersApplied && 'animate-pulse ')}
      aria-label="Apply Filters"
      onClick={() => onClick(filters)}
    >
      Apply Filters
    </BaseButton>
  )
}
