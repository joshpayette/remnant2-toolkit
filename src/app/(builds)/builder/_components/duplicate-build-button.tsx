import { BaseButton } from '@/ui/base/button';

interface Props {
  onClick: () => void;
}

export function DuplicateBuildButton({ onClick }: Props) {
  return (
    <BaseButton
      outline
      aria-label="Duplicate build to create a new build based on this one."
      onClick={onClick}
      className="lg:w-full"
    >
      Duplicate Build
    </BaseButton>
  );
}
