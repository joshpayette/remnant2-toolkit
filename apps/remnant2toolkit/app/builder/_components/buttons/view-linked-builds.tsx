import { BaseButton } from '@repo/ui';

interface Props {
  onClick: () => void;
}

export function ViewLinkedBuildButton({ onClick }: Props) {
  return (
    <BaseButton
      outline
      aria-label="View all linked builds for this build."
      onClick={onClick}
      className="sm:w-full"
    >
      Linked Builds
    </BaseButton>
  );
}
