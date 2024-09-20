import { BaseButton } from '@repo/ui';

interface Props {
  onClick: () => void;
}

export function DetailedViewButton({ onClick }: Props) {
  return (
    <BaseButton
      outline
      onClick={onClick}
      aria-label="Show detailed view of build"
      className="lg:w-full"
    >
      Detailed View
    </BaseButton>
  );
}
