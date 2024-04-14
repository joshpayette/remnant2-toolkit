import { BaseButton } from '@/app/(components)/_base/button'

interface Props {
  onClick: () => void
}

export function ArmorCalculatorButton({ onClick }: Props) {
  return (
    <BaseButton
      color="violet"
      aria-label="Get optimal armor values for this build."
      onClick={onClick}
      className="sm:w-full"
    >
      Armor Calculator
    </BaseButton>
  )
}
