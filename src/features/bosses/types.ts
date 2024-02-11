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

export function isBoss(obj: any): obj is Boss {
  return (
    obj.category === 'world boss' ||
    obj.category === 'boss' ||
    obj.category === 'aberration'
  )
}
