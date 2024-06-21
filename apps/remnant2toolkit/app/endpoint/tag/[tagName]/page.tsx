'use client'

import { MasonryItemList } from '@/app/(components)/masonry-item-list'
import { PageHeader } from '@/app/(components)/page-header'
import { Item } from '@/app/(data)/items/types'

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
