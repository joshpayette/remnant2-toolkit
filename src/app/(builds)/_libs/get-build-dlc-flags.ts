import { type ReleaseKey } from '@/app/_types/releases';
import { buildStateToBuildItems } from '@/app/(builds)/_libs/build-state-to-build-items';
import { type BuildState } from '@/app/(builds)/_types/build-state';
import { allItems } from '@/app/(items)/_constants/all-items';

const ITEM_ID_TO_DLC = new Map<string, ReleaseKey>(
  allItems.map((item) => [item.id, item.dlc]),
);

export type BuildDlcFlags = {
  hasBaseItems: boolean;
  hasDlc1Items: boolean;
  hasDlc2Items: boolean;
  hasDlc3Items: boolean;
};

/**
 * Computes which DLC buckets a set of build items draw from, for the
 * denormalized `Build.hasXItems` columns:
 * A build "requires" a DLC if ANY of its items belongs to
 * it. Items not found set no flag (treated as neutral)
 */
export function getDlcFlagsFromItemIds(itemIds: string[]): BuildDlcFlags {
  const flags: BuildDlcFlags = {
    hasBaseItems: false,
    hasDlc1Items: false,
    hasDlc2Items: false,
    hasDlc3Items: false,
  };

  for (const itemId of itemIds) {
    if (!itemId) continue;
    const dlc = ITEM_ID_TO_DLC.get(itemId);
    if (dlc === 'base') flags.hasBaseItems = true;
    else if (dlc === 'dlc1') flags.hasDlc1Items = true;
    else if (dlc === 'dlc2') flags.hasDlc2Items = true;
    else if (dlc === 'dlc3') flags.hasDlc3Items = true;
  }

  return flags;
}

/** Convenience wrapper that derives the flags directly from a build state. */
export function getBuildDlcFlags(buildState: BuildState): BuildDlcFlags {
  return getDlcFlagsFromItemIds(
    buildStateToBuildItems(buildState).map((item) => item.itemId),
  );
}
