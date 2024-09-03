import { type Item } from '@/app/(items)/_types/item';
import { getCategoryProgressStats } from '@/app/(items)/item-tracker/_utils/get-category-progress-stats';

export function getCategoryProgressLabel({
  filteredItems,
  discoveredItemIds,
}: {
  filteredItems: Item[];
  discoveredItemIds: string[];
}) {
  const { discoveredCount, undiscoveredCount, filteredItemsCount } =
    getCategoryProgressStats({ filteredItems, discoveredItemIds });
  return `${((discoveredCount / filteredItemsCount) * 100).toFixed(
    2,
  )}% (${undiscoveredCount} undiscovered)`;
}
