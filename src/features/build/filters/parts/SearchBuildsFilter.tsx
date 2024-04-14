import { Input } from '@/app/(components)/form-fields/input'
import { cn } from '@/lib/classnames'

interface Props {
  searchText: string
  showLabel?: boolean
  onApplyFilters: () => void
  onChange: (searchQuery: string) => void
}

export function SearchBuildsFilter({
  searchText,
  showLabel = false,
  onApplyFilters,
  onChange,
}: Props) {
  return (
    <div className="flex w-full flex-col items-start justify-start gap-x-4 gap-y-2">
      <div
        className={cn(
          'flex w-full items-center justify-start text-left text-sm font-bold text-primary-500',
          !showLabel && 'sr-only',
        )}
      >
        By Build Name, Builder Name, or Description
      </div>

      <div className="relative flex w-full flex-row items-center shadow-sm">
        <Input
          onKeyDown={onApplyFilters}
          onChange={(e) => onChange(e.target.value)}
          onClear={() => onChange('')}
          value={searchText}
        />
      </div>
    </div>
  )
}
