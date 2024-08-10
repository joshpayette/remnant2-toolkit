import { BaseButton } from '@repo/ui/base/button'
import { Skeleton } from '@repo/ui/skeleton'

export function LoadingButton() {
  return (
    <BaseButton
      color="cyan"
      disabled
      aria-label="Save button loading..."
      className="h-[36px] w-[106px] sm:w-full"
    >
      <Skeleton className="h-full w-full" />
    </BaseButton>
  )
}
