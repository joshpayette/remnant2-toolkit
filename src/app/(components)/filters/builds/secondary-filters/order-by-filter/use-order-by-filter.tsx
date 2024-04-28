import { useState } from 'react'

export type OrderBy = 'alphabetical' | 'most favorited' | 'newest'

export function useOrderByFilter(defaultOrderBy: OrderBy = 'most favorited') {
  const [orderBy, setOrderBy] = useState<OrderBy>(defaultOrderBy)
  const orderByOptions: Array<{ label: OrderBy; value: string }> = [
    { label: 'alphabetical', value: 'alphabetical' },
    { label: 'most favorited', value: 'most favorited' },
    { label: 'newest', value: 'newest' },
  ]
  function handleOrderByChange(orderBy: string) {
    setOrderBy(orderBy as OrderBy)
  }

  return {
    orderBy,
    orderByOptions,
    handleOrderByChange,
  }
}
