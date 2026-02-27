import { BaseButton } from '@/ui/base/button';

interface Props {
  onClick: () => void;
}

export function ShareBuildButton({ onClick }: Props) {
  return (
    <BaseButton
      color="violet"
      aria-label="Share build with others."
      onClick={onClick}
      className="lg:w-full"
    >
      Share Build
    </BaseButton>
  );
}
