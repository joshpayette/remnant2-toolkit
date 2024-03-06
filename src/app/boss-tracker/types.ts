import { BossCategory } from '@/features/enemies/types'

export interface LocalStorage {
  discoveredBossIds: string[]
  collapsedBossCategories: Array<BossCategory>
}
