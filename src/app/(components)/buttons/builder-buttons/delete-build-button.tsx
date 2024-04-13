import { Button } from '@/app/(components)/base/button'

interface Props {
  onClick: () => void
}

export function DeleteBuildButton({ onClick }: Props) {
  return (
    <Button
      color="red"
      aria-label="Delete build."
      onClick={onClick}
      className="sm:w-full"
    >
      Delete Build
    </Button>
  )
}
