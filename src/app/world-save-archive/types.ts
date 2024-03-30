import { BOSS_AFFIXES, BOSSES } from '@/app/world-save-archive/constants'
import { ReleaseKey } from '@/features/items/types'

export type BossAffix = keyof typeof BOSS_AFFIXES
export type BossAffixName = (typeof BOSS_AFFIXES)[number]['name']

export type BossName = (typeof BOSSES)[number]['name']

export interface WorldSave {
  bossName: BossName
  bossAffixes: BossAffixName[]
  release: ReleaseKey
}

export interface SearchFilters {
  affixes: BossAffixName[]
  bossName: BossName | 'All'
}

export type FilteredSave = WorldSave & { imagePath: string }
