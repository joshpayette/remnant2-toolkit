import { type Item } from '@/app/(items)/_types/item';
import { getDiscoveredCount } from '@/app/(items)/item-tracker/_utils/get-discovered-count';

export function getTrackerProgressLabel({
  discoveredItemIds,
  items,
  percentOnly = false,
}: {
  discoveredItemIds: string[];
  items: Item[];
  percentOnly?: boolean;
}) {
  const totalItems = items.length;
  const discoveredCount = getDiscoveredCount(discoveredItemIds);
  const discoveredPercent = parseFloat(
    ((discoveredCount / totalItems) * 100).toFixed(2),
  );

  return percentOnly
    ? `${discoveredPercent}%`
    : `${discoveredCount}/${totalItems} (${discoveredPercent}%)`;
}
