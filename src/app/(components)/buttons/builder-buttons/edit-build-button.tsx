import { BaseButton } from '@/app/(components)/_base/button'

interface Props {
  onClick: () => void
}

export function EditBuildButton({ onClick }: Props) {
  return (
    <BaseButton
      color="cyan"
      aria-label="Edit build."
      onClick={onClick}
      className="sm:w-full"
    >
      Edit Build
    </BaseButton>
  )
}
