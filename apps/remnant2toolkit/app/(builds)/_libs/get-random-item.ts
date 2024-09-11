import { getItemListForSlot } from '@/app/(builds)/_libs/get-item-list-for-slot';
import { type BuildState } from '@/app/(builds)/_types/build-state';
import { type ItemCategory } from '@/app/(builds)/_types/item-category';
import { type Item } from '@/app/(items)/_types/item';

export function getRandomItem(
  buildState: BuildState,
  selectedItem: {
    category: ItemCategory | null;
    index?: number; // Used for slots that can have multiple items, such as rings
  },
  itemList?: Item[],
): Item | null {
  const items = itemList || getItemListForSlot(buildState, selectedItem);
  const randomIndex = Math.floor(Math.random() * items.length);
  const randomItem = items[randomIndex];
  return randomItem || null;
}
