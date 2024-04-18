import { getArrayOfLength } from '@/features/build/lib/getArrayOfLength'
import { Skeleton } from '@/features/ui/Skeleton'

export function LoadoutSkeleton() {
  return getArrayOfLength(8).map((_, index) => (
    <Skeleton className="h-[440px] w-[295px]" key={index} />
  ))
}
