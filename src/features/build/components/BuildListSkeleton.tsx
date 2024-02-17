import { Skeleton } from '@/features/ui/Skeleton'

import { getArrayOfLength } from '../lib/getArrayOfLength'

interface Props {
  itemsPerPage: number
}

export function BuildListSkeleton({ itemsPerPage }: Props) {
  return getArrayOfLength(itemsPerPage).map((_, index) => (
    <div key={index} className="h-full w-full">
      <Skeleton key={index} className="h-[357px] w-full" />
    </div>
  ))
}
