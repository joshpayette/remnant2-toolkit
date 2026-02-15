import { type Item } from '@/app/(items)/_types/item';

export function getCategoryProgressStats({
  filteredItems,
  discoveredItemIds,
}: {
  filteredItems: Item[];
  discoveredItemIds: string[];
}) {
  const undiscoveredCount = filteredItems.reduce(
    (acc, item) => (discoveredItemIds.includes(item.id) ? acc : acc + 1),
    0,
  );
  const filteredItemsCount = filteredItems.length;
  const discoveredCount = filteredItemsCount - undiscoveredCount;

  return {
    discoveredCount,
    undiscoveredCount,
    filteredItemsCount,
  };
}
