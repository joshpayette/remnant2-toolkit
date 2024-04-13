import { Button } from '@/app/(components)/base/button'
import { Skeleton } from '@/features/ui/Skeleton'

export function LoadingButton() {
  return (
    <Button
      color="primary"
      disabled
      aria-label="Save button loading..."
      className="h-[36px] w-[106px] sm:w-full"
    >
      <Skeleton className="h-full w-full" />
    </Button>
  )
}
