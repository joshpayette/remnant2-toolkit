import { BaseButton } from '@repo/ui/base/button'

interface Props {
  onClick: () => void
}

export function RandomBuildButton({ onClick }: Props) {
  return (
    <BaseButton
      outline
      aria-label="Randomly generate a build."
      onClick={onClick}
      className="sm:w-full"
    >
      Random Build
    </BaseButton>
  )
}
