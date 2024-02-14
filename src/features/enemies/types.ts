export interface Enemy {
  id: string
  name: string
  imagePath?: string
  category: 'enemy' | 'boss' | 'world boss' | 'aberration'
  location: 'losomn' | `n'erud` | 'yaesha' | 'labyrinth' | 'root earth'
  dungeon?: string
  wikiLinks: string[]
  bleedResistance?: number
  fireResistance?: number
  shockResistance?: number
  acidResistance?: number
  meleeResistance?: number
  notes?: string
}
