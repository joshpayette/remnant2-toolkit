import { BaseButton } from '@repo/ui';

interface Props {
  onClick: () => void;
}

export function NewLinkedBuildButton({ onClick }: Props) {
  return (
    <BaseButton
      color="cyan"
      aria-label="Link build to other builds"
      onClick={onClick}
      className="lg:w-full"
    >
      New Linked Build
    </BaseButton>
  );
}
