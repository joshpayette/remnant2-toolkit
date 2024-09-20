import { BaseButton } from '@repo/ui';

interface Props {
  onClick: () => void;
}

export function ItemOwnershipPreferenceButton({ onClick }: Props) {
  return (
    <BaseButton
      outline
      onClick={onClick}
      aria-label="Toggle item ownership preference"
      className="lg:w-full"
    >
      Toggle Collected
    </BaseButton>
  );
}
