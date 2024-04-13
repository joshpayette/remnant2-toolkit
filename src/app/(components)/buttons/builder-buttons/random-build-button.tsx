import { Button } from '@/app/(components)/base/button'

interface Props {
  onClick: () => void
}

export function RandomBuildButton({ onClick }: Props) {
  return (
    <Button
      outline
      aria-label="Randomly generate a build."
      onClick={onClick}
      className="sm:w-full"
    >
      Random Build
    </Button>
  )
}
