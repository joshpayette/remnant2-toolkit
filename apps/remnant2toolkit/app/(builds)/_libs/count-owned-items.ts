import { type BuildState } from '@/app/(builds)/_types/build-state';

export function countOwnedItems(items: BuildState['items']): string {
  // Filter out skills and perks
  const { skill: _skill, perk: _perk, ...filteredItems } = items;

  const itemsArray = Object.values(filteredItems)
    .flat()
    .filter((item) => item !== null && item.id !== '');
  if (!itemsArray) return '---';

  const ownedItemsCount = itemsArray.reduce((acc, item) => {
    if (!item) return acc;
    return item.isOwned ? acc + 1 : acc;
  }, 0);
  const totalItemsCount = itemsArray.length;
  const ownedPercentage = Math.round((ownedItemsCount / totalItemsCount) * 100);

  return `${ownedItemsCount} / ${totalItemsCount} (${ownedPercentage}%)`;
}
