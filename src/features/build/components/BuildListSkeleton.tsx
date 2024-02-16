import { Skeleton } from '@/features/ui/Skeleton'

import { getArrayOfLength } from '../lib/getArrayOfLength'

interface Props {
  itemsPerPage: number
}

export function BuildListSkeleton({ itemsPerPage }: Props) {
  return getArrayOfLength(itemsPerPage).map((_, index) => (
    <Skeleton key={index} className="h-[350px] w-full" />
  ))
}
