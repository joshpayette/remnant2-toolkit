import { type DefaultFilter } from '@/app/_types/default-filter';
import { type ReleaseKey } from '@/app/(data)/releases/types';
import {
  type ALL_BOSS_AFFIXES,
  type ALL_BOSSES,
} from '@/app/(data)/world-saves/constants';

export interface WorldSaveFilters {
  bossName: string | DefaultFilter;
  bossAffixes: string[] | [DefaultFilter];
  releases: string[] | [DefaultFilter];
}

/** The keys used in the URL for the filters */
export const WORLD_SAVE_FILTER_KEYS = {
  BOSSNAME: 'bossName',
  BOSSAFFIXES: 'bossAffixes',
  RELEASES: 'releases',
} as const satisfies Record<string, keyof WorldSaveFilters>;

export type BossAffix = keyof typeof ALL_BOSS_AFFIXES;
export type BossAffixName = (typeof ALL_BOSS_AFFIXES)[number]['name'];

export type BossName = (typeof ALL_BOSSES)[number]['name'];

export interface WorldSave {
  bossName: BossName;
  bossAffixes: BossAffixName[];
  release: ReleaseKey;
  isCursed: boolean | undefined;
}

export type FilteredWorldSave = WorldSave & { imagePath: string };
