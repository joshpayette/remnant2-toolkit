import { BaseButton } from '@/ui/base/button';

interface Props {
  onClick: () => void;
}

export function AddToCollectionButton({ onClick }: Props) {
  return (
    <BaseButton
      onClick={onClick}
      aria-label="Add to collection"
      className="lg:w-full"
      color="violet"
    >
      Add to Collection
    </BaseButton>
  );
}
