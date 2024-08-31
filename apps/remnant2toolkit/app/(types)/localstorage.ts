import { getArrayOfLength } from '@repo/utils';

import { type BossCategory } from '@/app/(data)/enemies/types';
import { type ItemTrackerCategory } from '@/app/(items)/item-tracker/_types';

export const LOCALSTORAGE_KEY = {
  BOSS_TRACKER: 'boss-tracker',
  ITEM_COMPARE: 'item-lookup-compare',
  ITEM_TRACKER: 'item-tracker',
  SORT_PREFERENCE: 'sorting-preference',
  ITEM_OWNERSHIP_PREFERENCE: 'item-ownership-preference',
};

export interface BossTrackerLocalStorage {
  discoveredBossIds: string[];
  collapsedBossCategories: Array<BossCategory>;
}

export interface ItemTrackerLocalStorage {
  discoveredItemIds: string[];
  collapsedCategories: Array<ItemTrackerCategory>;
}

export const DEFAULT_ITEM_COMPARE_LIST = getArrayOfLength(5).map(() => '');

export const SORTING_PREFERENCES = ['alphabetical', 'in-game'];
export type SortingPreference = (typeof SORTING_PREFERENCES)[number];

export type ItemOwnershipPreference = boolean;
