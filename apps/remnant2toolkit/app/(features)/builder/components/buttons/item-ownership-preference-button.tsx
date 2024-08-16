import { BaseButton } from '@repo/ui/base/button'

interface Props {
  onClick: () => void
}

export function ItemOwnershipPreferenceButton({ onClick }: Props) {
  return (
    <BaseButton
      outline
      onClick={onClick}
      aria-label="Toggle item ownership preference"
      className="sm:w-full"
    >
      Toggle Collected
    </BaseButton>
  )
}