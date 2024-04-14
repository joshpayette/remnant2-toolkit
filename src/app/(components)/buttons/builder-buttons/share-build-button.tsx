import { BaseButton } from '@/app/(components)/_base/button'

interface Props {
  onClick: () => void
}

export function ShareBuildButton({ onClick }: Props) {
  return (
    <BaseButton
      color="violet"
      aria-label="Share build with others."
      onClick={onClick}
      className="sm:w-full"
    >
      Share Build
    </BaseButton>
  )
}
