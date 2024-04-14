import { Button } from '@/app/(components)/_base/button'

interface Props {
  onClick: () => void
}

export function EditBuildButton({ onClick }: Props) {
  return (
    <Button
      color="cyan"
      aria-label="Edit build."
      onClick={onClick}
      className="sm:w-full"
    >
      Edit Build
    </Button>
  )
}
