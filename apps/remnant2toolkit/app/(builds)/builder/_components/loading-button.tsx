import { BaseButton, Skeleton } from '@repo/ui';

export function LoadingButton() {
  return (
    <BaseButton
      color="cyan"
      disabled
      aria-label="Save button loading..."
      className="h-[36px] w-[106px] lg:w-full"
    >
      <Skeleton className="h-full w-full" />
    </BaseButton>
  );
}
