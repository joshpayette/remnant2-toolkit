import { BaseButton } from '@/app/(components)/_base/button'

interface Props {
  onClick: () => void
}

export function LoadoutManagementButton({ onClick }: Props) {
  return (
    <BaseButton
      color="violet"
      aria-label="Loadout Builds"
      onClick={onClick}
      className="sm:w-full"
    >
      Add To Loadout
    </BaseButton>
  )
}
