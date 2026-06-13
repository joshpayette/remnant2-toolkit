import { type Item } from '@/app/(items)/_types/item';
import { MutatorItem } from '@/app/(items)/_types/mutator-item';
import { WeaponItem } from '@/app/(items)/_types/weapon-item';
import { type ItemTrackerCategory } from '@/app/(items)/item-tracker/_types/item-tracker-category';

export function getFilteredItemsForCategory(
  items: Array<Item & { discovered: boolean }>,
  itemCategory: ItemTrackerCategory,
): Array<Item & { discovered: boolean }> {
  return items
    .filter((item) => {
      if (itemCategory === 'Long Gun') {
        return WeaponItem.isWeaponItem(item) && item.type === 'long gun';
      }
      if (itemCategory === 'Hand Gun') {
        return WeaponItem.isWeaponItem(item) && item.type === 'hand gun';
      }
      if (itemCategory === 'Melee') {
        return WeaponItem.isWeaponItem(item) && item.type === 'melee';
      }
      if (itemCategory === 'Mutator (Gun)') {
        return MutatorItem.isMutatorItem(item) && item.type === 'gun';
      }
      if (itemCategory === 'Mutator (Melee)') {
        return MutatorItem.isMutatorItem(item) && item.type === 'melee';
      }
      if (itemCategory === 'Relic Fragment') {
        return item.category.toLowerCase() === 'relicfragment';
      }
      return item.category.toLowerCase() === itemCategory.toLowerCase();
    })
    .sort((a, b) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });
}
