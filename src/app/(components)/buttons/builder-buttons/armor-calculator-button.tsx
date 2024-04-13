import { Button } from '@/app/(components)/base/button'

interface Props {
  onClick: () => void
}

export function ArmorCalculatorButton({ onClick }: Props) {
  return (
    <Button
      color="violet"
      aria-label="Get optimal armor values for this build."
      onClick={onClick}
      className="sm:w-full"
    >
      Armor Calculator
    </Button>
  )
}
