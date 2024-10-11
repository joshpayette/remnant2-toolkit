import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export type OrderBy =
  | 'alphabetical'
  | 'most favorited'
  | 'most viewed'
  | 'newest'
  | 'percentage owned';

export function useOrderByFilter(defaultOrderBy: OrderBy = 'most favorited') {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const paramOrderBy = searchParams.get('orderBy');

  const [orderBy, setOrderBy] = useState<OrderBy>(
    paramOrderBy ? (paramOrderBy as OrderBy) : defaultOrderBy,
  );
  const orderByOptions: Array<{ label: string; value: OrderBy }> = [
    { label: 'alphabetical', value: 'alphabetical' },
    { label: 'most favorited', value: 'most favorited' },
    { label: 'most viewed', value: 'most viewed' },
    { label: 'newest', value: 'newest' },
    { label: 'percentage owned', value: 'percentage owned' },
  ];
  function handleOrderByChange(orderBy: OrderBy) {
    setOrderBy(orderBy as OrderBy);
    const params = new URLSearchParams(searchParams.toString());
    params.set('orderBy', orderBy);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }

  return {
    orderBy,
    orderByOptions,
    handleOrderByChange,
  };
}
