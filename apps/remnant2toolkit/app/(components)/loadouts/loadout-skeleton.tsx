import { Skeleton } from '@/app/(components)/skeleton'
import { getArrayOfLength } from '@/app/(utils)/get-array-of-length'

export function LoadoutSkeleton() {
  return getArrayOfLength(8).map((_, index) => (
    <Skeleton className="h-[440px] w-[295px]" key={index} />
  ))
}
