import { ReleaseKey } from '../items/types'

export type EnemyCategory =
  | 'add'
  | 'enemy'
  | 'boss'
  | 'world boss'
  | 'aberration'

export type EnemyLocation =
  | 'losomn'
  | `n'erud`
  | 'yaesha'
  | 'labyrinth'
  | 'root earth'

export interface Enemy {
  id: string
  name: string
  imagePath?: string
  dlc?: ReleaseKey
  category: EnemyCategory
  location: EnemyLocation
  dungeon?: string
  wikiLinks: string[]
  bleedResistance?: number | 'immune'
  fireResistance?: number | 'immune'
  shockResistance?: number | 'immune'
  acidResistance?: number | 'immune'
  meleeResistance?: number | 'immune'
  notes?: string
}
