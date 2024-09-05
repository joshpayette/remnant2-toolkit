'use client';

import { PageHeader } from '@/app/_components/page-header';
import { MasonryItemList } from '@/app/(items)/_components/masonry-item-list';
import { type Item } from '@/app/(items)/_types/item';

export default function Page({
  params: { items, tagName },
}: {
  params: { items: Item[]; tagName: string };
}) {
  if (!items || items.length === 0) {
    return (
      <>
        <PageHeader title={`No items matching "${tagName}" were found`} />
      </>
    );
  }

  return (
    <>
      <MasonryItemList items={items} label={`"${tagName}" Items`} />
    </>
  );
}
