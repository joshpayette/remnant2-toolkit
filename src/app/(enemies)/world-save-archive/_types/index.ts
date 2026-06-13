import { type DefaultFilter } from '@/app/_types/default-filter';
import { type ReleaseKey } from '@/app/_types/releases';
import { type ALL_BOSS_AFFIXES } from '@/app/(enemies)/world-save-archive/_constants/all-boss-affixes';
import { type ALL_BOSSES } from '@/app/(enemies)/world-save-archive/_constants/all-bosses';

export type BossAffix = keyof typeof ALL_BOSS_AFFIXES;
export type BossAffixName = (typeof ALL_BOSS_AFFIXES)[number]['name'];

export type BossName = (typeof ALL_BOSSES)[number]['name'];

export interface WorldSaveFilters {
  bossName: string | DefaultFilter;
  bossAffixes: string[] | [DefaultFilter];
  releases: string[] | [DefaultFilter];
}

export interface WorldSave {
  bossName: BossName;
  bossAffixes: BossAffixName[];
  release: ReleaseKey;
  isCursed: boolean | undefined;
}

export type FilteredWorldSave = WorldSave & { imagePath: string };
