'use client';;
import { use } from "react";

import { PageHeader } from '@/app/_components/page-header';
import { ItemListGrid } from '@/app/(items)/_components/item-list-grid';
import { type Item } from '@/app/(items)/_types/item';

export default function Page(
  props: {
    params: Promise<{ items: Item[]; tagName: string }>;
  }
) {
  const params = use(props.params);

  const {
    items,
    tagName
  } = params;

  if (!items || items.length === 0) {
    return (
      <>
        <PageHeader title={`No items matching "${tagName}" were found`} />
      </>
    );
  }

  return (
    <>
      <ItemListGrid items={items} label={`"${tagName}" Items`} />
    </>
  );
}
