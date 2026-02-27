import { BaseButton } from '@/ui/base/button';

interface Props {
  onClick: () => void;
}

export function ArmorCalculatorButton({ onClick }: Props) {
  return (
    <BaseButton
      color="violet"
      aria-label="Get optimal armor values for this build."
      onClick={onClick}
      className="lg:w-full"
    >
      Armor Calculator
    </BaseButton>
  );
}
