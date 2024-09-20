import { BaseButton } from '@repo/ui';

interface Props {
  onClick: () => void;
}

export function EditLinkedBuildButton({ onClick }: Props) {
  return (
    <BaseButton
      color="cyan"
      aria-label="Link build to other builds"
      onClick={onClick}
      className="lg:w-full"
    >
      Edit Linked Build
    </BaseButton>
  );
}
