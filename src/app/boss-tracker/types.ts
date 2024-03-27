import { BossCategory } from '@/features/enemies/types'

export interface LocalStorage {
  discoveredBossIds: string[]
  collapsedBossCategories: Array<BossCategory>
}

export interface BossTrackerFilterFields {
  searchText: string
  selectedBossCategories: BossCategory[]
}
