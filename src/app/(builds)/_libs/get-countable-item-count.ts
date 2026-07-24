import { EXCLUDED_CATEGORIES_FOR_OWNERSHIP } from '@/app/(builds)/_features/filters/_libs/queries/build-feed-query-parts';
import { buildStateToBuildItems } from '@/app/(builds)/_libs/build-state-to-build-items';
import { type BuildState } from '@/app/(builds)/_types/build-state';

type CountableBuildItem = {
  itemId: string;
  category?: string | null;
  index?: number | null;
};

/**
 * Counts a build's "ownable" items, denormalized onto `Build.countableItemCount`:
 * skip empty slots, skip rows with no category, skip the excluded categories,
 * and skip the special relic-fragment slot at index 8 (legendary gem).
 */
export function getCountableItemCountFromBuildItems(
  buildItems: CountableBuildItem[],
): number {
  let count = 0;
  for (const item of buildItems) {
    if (!item.itemId) continue;
    if (!item.category) continue;
    if (EXCLUDED_CATEGORIES_FOR_OWNERSHIP.includes(item.category)) continue;
    if (item.category === 'relicfragment' && item.index === 8) continue;
    count++;
  }
  return count;
}

/** Convenience wrapper that derives the count directly from a build state. */
export function getCountableItemCount(buildState: BuildState): number {
  return getCountableItemCountFromBuildItems(
    buildStateToBuildItems(buildState),
  );
}
