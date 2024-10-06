'use client';

import { useState } from 'react';

import { ItemCard } from '@/app/(items)/_components/item-card';
import { ItemInfoDialog } from '@/app/(items)/_components/item-info-dialog';
import { type Item } from '@/app/(items)/_types/item';

interface Props {
  allowItemCompare?: boolean;
  label?: string;
  items: Item[];
}

export function ItemListGrid({
  allowItemCompare = false,
  items,
  label,
}: Props) {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const infoOpen = selectedItem !== null;

  function handleMoreInfoClick(item: Item) {
    setSelectedItem(item);
  }

  if (items.length === 0) return null;

  return (
    <>
      <ItemInfoDialog
        item={selectedItem}
        open={infoOpen}
        onClose={() => setSelectedItem(null)}
      />
      <div className="flex w-full flex-col items-center justify-center overflow-auto p-4">
        {label && (
          <h3 className="text-primary-500 mb-4 text-2xl font-bold">{label}</h3>
        )}

        <div className="mt-12 grid w-full grid-cols-1 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {items.map((item, index) => (
            <ItemCard
              key={index}
              allowItemCompare={allowItemCompare}
              data={item}
              onMoreInfoClick={handleMoreInfoClick}
            />
          ))}
        </div>
      </div>
    </>
  );
}
