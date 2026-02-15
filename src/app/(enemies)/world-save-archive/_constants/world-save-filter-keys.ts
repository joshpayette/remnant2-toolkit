import { type WorldSaveFilters } from '@/app/(enemies)/world-save-archive/_types';

/** The keys used in the URL for the filters */
export const WORLD_SAVE_FILTER_KEYS = {
  BOSSNAME: 'bossName',
  BOSSAFFIXES: 'bossAffixes',
  RELEASES: 'releases',
} as const satisfies Record<string, keyof WorldSaveFilters>;
