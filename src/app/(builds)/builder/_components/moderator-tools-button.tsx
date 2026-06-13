import { BaseButton } from '@/components/ui';

interface Props {
  onClick: () => void;
}

export function ModeratorToolsButton({ onClick }: Props) {
  return (
    <BaseButton
      color="orange"
      aria-label="Moderator Tools"
      onClick={onClick}
      className="lg:w-full"
    >
      Moderator Tools
    </BaseButton>
  );
}
