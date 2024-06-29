import { getArrayOfLength } from '@repo/utils/get-array-of-length'

import { Skeleton } from '@/app/(components)/skeleton'

export function LoadoutSkeleton() {
  return getArrayOfLength(8).map((_, index) => (
    <Skeleton className="h-[440px] w-[295px]" key={index} />
  ))
}
