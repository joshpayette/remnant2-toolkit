'use client';

import { useState, use } from 'react';

import { ItemInfoDialog } from '@/app/(items)/_components/item-info-dialog';
import { type Item } from '@/app/(items)/_types/item';
import { BaseButton } from '@/components/ui';

export default function Page(props: { params: Promise<{ item: Item }> }) {
  const params = use(props.params);

  const {
    item
  } = params;

  const [open, setOpen] = useState(true);

  return (
    <>
      <ItemInfoDialog open={open} onClose={() => setOpen(false)} item={item} />
      <BaseButton
        color="cyan"
        onClick={() => setOpen(true)}
        aria-label={`Open info for ${item.name}`}
      >
        Open Info for {item.name}
      </BaseButton>
    </>
  );
}
