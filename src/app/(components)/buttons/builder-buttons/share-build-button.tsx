import { Button } from '@/app/(components)/_base/button'

interface Props {
  onClick: () => void
}

export function ShareBuildButton({ onClick }: Props) {
  return (
    <Button
      color="violet"
      aria-label="Share build with others."
      onClick={onClick}
      className="sm:w-full"
    >
      Share Build
    </Button>
  )
}
