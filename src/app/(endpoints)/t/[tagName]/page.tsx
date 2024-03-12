'use client'

import { MasonryItemList } from '@/features/items/components/MasonryItemList'
import { Item } from '@/features/items/types'
import { PageHeader } from '@/features/ui/PageHeader'

export default function Page({
  params: { items, tagName },
}: {
  params: { items: Item[]; tagName: string }
}) {
  if (!items || items.length === 0) {
    return (
      <>
        <PageHeader title={`No items matching "${tagName}" were found`} />
      </>
    )
  }

  return (
    <>
      <MasonryItemList items={items} label={`"${tagName}" Items`} />
    </>
  )
}
