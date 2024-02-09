export type BossCategory = 'world boss' | 'boss' | 'aberration'

export interface Boss {
  name: string
  imagePath: string
  category: BossCategory
  location: 'Labyrinth' | 'Losomn' | 'Nerud' | 'Root Earth' | 'Yaesha'
  dungeon: string
  wikiLinks: string[]
  id: string
}
