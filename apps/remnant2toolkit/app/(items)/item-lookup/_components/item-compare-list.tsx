'use client';

import { cn } from '@repo/ui';
import { useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';

import {
  DEFAULT_ITEM_COMPARE_LIST,
  LOCALSTORAGE_KEY,
} from '@/app/_types/localstorage';
import { ItemCard } from '@/app/(items)/_components/item-card';
import { ItemInfoDialog } from '@/app/(items)/_components/item-info-dialog';
import { allItems } from '@/app/(items)/_constants/all-items';
import { type Item } from '@/app/(items)/_types/item';

export function ItemCompareList() {
  const [itemsToCompare, _setItemsToCompare] = useLocalStorage<string[]>(
    LOCALSTORAGE_KEY.ITEM_COMPARE,
    DEFAULT_ITEM_COMPARE_LIST,
    { initializeWithValue: false },
  );

  const areAnyItemsBeingCompared = itemsToCompare.some(
    (itemId) => itemId !== '',
  );

  const [selectedItem, setSelectedItem] = useState<Item | null>(null);
  const infoOpen = selectedItem !== null;

  function handleMoreInfoClick(item: Item) {
    setSelectedItem(item);
  }

  if (!areAnyItemsBeingCompared) {
    return null;
  }

  return (
    <div className="mt-2 flex w-full items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-y-2">
        <ItemInfoDialog
          item={selectedItem}
          open={infoOpen}
          onClose={() => setSelectedItem(null)}
        />

        <h2 className="text-primary-500 mt-4 text-center text-2xl font-bold">
          Item Comparison
        </h2>
        <div className="grid w-full grid-cols-1 gap-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {itemsToCompare.map((itemId, index) => {
            if (itemId === '') {
              return <EmptyItemCard key={index} />;
            }

            const item = allItems.find((item) => item.id === itemId);
            if (!item) {
              return <EmptyItemCard key={index} />;
            }
            return (
              <ItemCard
                key={index}
                data={item}
                onMoreInfoClick={handleMoreInfoClick}
                allowItemCompare={true}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

function EmptyItemCard() {
  return (
    <div
      className={cn(
        'bg-background-solid col-span-1 flex h-full min-h-[300px] flex-col items-center justify-start rounded-lg border-4 border-dashed border-gray-500 text-center shadow',
      )}
    >
      <p className="mt-8 p-4 text-2xl font-semibold text-gray-700">
        No item to compare.
      </p>
    </div>
  );
}
