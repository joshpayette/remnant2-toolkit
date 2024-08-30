import { type DefaultFilter } from '@/app/(components)/filters/types';

export interface BossTrackerFilters {
  categories: string[] | [DefaultFilter];
  searchText: string | '';
}

export const BOSS_TRACKER_KEYS = {
  CATEGORIES: 'categories',
  SEARCHTEXT: 'searchText',
} as const satisfies Record<string, keyof BossTrackerFilters>;
