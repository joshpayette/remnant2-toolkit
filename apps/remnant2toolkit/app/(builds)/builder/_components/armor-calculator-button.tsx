import { BaseButton } from '@repo/ui';

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
