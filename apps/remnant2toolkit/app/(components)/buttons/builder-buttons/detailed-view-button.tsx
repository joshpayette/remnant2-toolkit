import { BaseButton } from '@repo/ui/base/button'

interface Props {
  onClick: () => void
}

export function DetailedViewButton({ onClick }: Props) {
  return (
    <BaseButton
      outline
      onClick={onClick}
      aria-label="Show detailed view of build"
      className="sm:w-full"
    >
      Detailed View
    </BaseButton>
  )
}
