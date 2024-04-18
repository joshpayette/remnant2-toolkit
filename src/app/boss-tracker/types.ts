import { BossCategory } from '@/app/(data)/enemies/types'

export interface LocalStorage {
  discoveredBossIds: string[]
  collapsedBossCategories: Array<BossCategory>
}

export interface BossTrackerFilterFields {
  searchText: string
  selectedBossCategories: BossCategory[]
}
