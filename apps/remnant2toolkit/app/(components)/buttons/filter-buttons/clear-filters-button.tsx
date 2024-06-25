import { BaseButton } from '@repo/ui/base/button'

interface Props {
  onClick: () => void
}

export function ClearFiltersButton({ onClick }: Props) {
  return (
    <BaseButton
      color="red"
      className="flex w-auto items-center justify-center gap-1"
      aria-label="Clear Filters"
      onClick={onClick}
    >
      Clear Filters
    </BaseButton>
  )
}
