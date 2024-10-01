import { useState } from 'react';

export type OrderBy =
  | 'alphabetical'
  | 'most favorited'
  | 'most viewed'
  | 'newest'
  | 'percentage owned';

export function useOrderByFilter(defaultOrderBy: OrderBy = 'most favorited') {
  const [orderBy, setOrderBy] = useState<OrderBy>(defaultOrderBy);
  const orderByOptions: Array<{ label: string; value: OrderBy }> = [
    { label: 'alphabetical', value: 'alphabetical' },
    { label: 'most favorited', value: 'most favorited' },
    { label: 'most viewed', value: 'most viewed' },
    { label: 'newest', value: 'newest' },
    { label: 'percentage owned', value: 'percentage owned' },
  ];
  function handleOrderByChange(orderBy: OrderBy) {
    setOrderBy(orderBy as OrderBy);
  }

  return {
    orderBy,
    orderByOptions,
    handleOrderByChange,
  };
}
