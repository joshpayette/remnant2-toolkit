import { BossCategory } from '@/app/(data)/enemies/types'

export interface BossTrackerLocalStorage {
  discoveredBossIds: string[]
  collapsedBossCategories: Array<BossCategory>
}

export interface BossTrackerCategory {
  category: BossCategory
  label: string
}
