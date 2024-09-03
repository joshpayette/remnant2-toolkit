import { ALL_TRACKABLE_ITEMS } from '@/app/(items)/item-tracker/_constants';

export function getDiscoveredCount(discoveredItemIds: string[]) {
  return ALL_TRACKABLE_ITEMS.reduce((acc, item) => {
    if (discoveredItemIds.includes(item.id)) return acc + 1;
    return acc;
  }, 0);
}
