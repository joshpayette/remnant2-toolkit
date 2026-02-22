import { Skeleton } from '@/ui';
import { getArrayOfLength } from '@/utils';

export function LoadoutSkeleton() {
  return getArrayOfLength(8).map((_, index) => (
    <Skeleton className="h-[440px] w-[295px]" key={index} />
  ));
}
