'use client';

import { ToCsvButton } from '@/app/_components/to-csv-button';
import { allItems } from '@/app/(items)/_constants/all-items';
import { MutatorItem } from '@/app/(items)/_types/mutator-item';
import { itemToCsvItem } from '@/app/(items)/_utils/item-to-csv-item';
import { ItemCompareList } from '@/app/(items)/item-lookup/_components/item-compare-list';
import { ItemList } from '@/app/(items)/item-lookup/_components/item-list';
import { ItemLookupFilters } from '@/app/(items)/item-lookup/_components/item-lookup-filters';

const csvItems = allItems
  // Modify the data for use. Adds a discovered flag,
  // modifies the description for mutators
  .map((item) => {
    let csvItem = itemToCsvItem(item);

    // For mutators, we need to combine the description
    // and the max level bonus
    if (MutatorItem.isMutatorItem(item)) {
      const description = item.description;
      const maxLevelBonus = item.maxLevelBonus;
      csvItem = itemToCsvItem({
        ...item,
        description: `${description}. At Max Level: ${maxLevelBonus}`,
      });
    }

    return csvItem;
  })
  // sort items by category then name alphabetically
  .sort((a, b) => {
    if (a.category < b.category) return -1;
    if (a.category > b.category) return 1;
    if (a.name < b.name) return -1;
    if (a.name > b.name) return 1;
    return 0;
  });

export function ItemLookupContainer() {
  return (
    <div className="flex w-full flex-col items-center">
      <ItemLookupFilters />
      <ItemCompareList />
      <ItemList />
      <div className="mt-6 flex w-full flex-col items-center justify-center">
        <div className="max-w-[200px]">
          <hr className="border-primary-500 mb-4 w-full border-t" />
          <ToCsvButton data={csvItems} filename="remnant2toolkit_iteminfo" />
        </div>
      </div>
    </div>
  );
}
