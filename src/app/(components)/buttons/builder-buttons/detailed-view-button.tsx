import { Button } from '@/app/(components)/base/button'

interface Props {
  onClick: () => void
}

export function DetailedViewButton({ onClick }: Props) {
  return (
    <Button
      outline
      onClick={onClick}
      aria-label="Show detailed view of build"
      className="sm:w-full"
    >
      Detailed View
    </Button>
  )
}
