import { Button } from '@/app/(components)/_base/button'

interface Props {
  onClick: () => void
}

export function LoadoutManagementButton({ onClick }: Props) {
  return (
    <Button
      color="violet"
      aria-label="Loadout Builds"
      onClick={onClick}
      className="sm:w-full"
    >
      Add To Loadout
    </Button>
  )
}
