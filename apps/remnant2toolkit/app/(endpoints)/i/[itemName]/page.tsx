'use client';

import { BaseButton } from '@repo/ui';
import { useState } from 'react';

import { ItemInfoDialog } from '@/app/(items)/_components/item-info-dialog';
import { type Item } from '@/app/(items)/_types/item';

export default function Page({ params: { item } }: { params: { item: Item } }) {
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
