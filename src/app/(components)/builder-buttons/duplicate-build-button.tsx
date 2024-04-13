import { Button } from '@/app/(components)/base/button'

interface Props {
  onClick: () => void
}

export function DuplicateBuildButton({ onClick }: Props) {
  return (
    <Button
      outline
      aria-label="Duplicate build to create a new build based on this one."
      onClick={onClick}
      className="sm:w-full"
    >
      Duplicate Build
    </Button>
  )
}
