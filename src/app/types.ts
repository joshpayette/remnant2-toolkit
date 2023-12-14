export type ItemCategory =
  | 'helm'
  | 'torso'
  | 'legs'
  | 'gloves'
  | 'relic'
  | 'amulet'
  | 'weapon'
  | 'archtype'
  | 'concoction'
  | 'consumable'
  | 'mod'
  | 'mutator'
  | 'relicfragment'
  | 'ring'
  | 'skill'
  | 'trait'

// Used to link items,
// such as mods to guns,
// skills to archtypes, etc.
type LinkedItems = Partial<{
  archtype: { name: string }
  skills: Array<{ name: string }>
  weapon: { name: string }
  mod: { name: string }
  trait: { name: string }
}>

interface BaseItem {
  id: string
  name: string
  category: ItemCategory
  description?: string
  howToGet?: string
  wikiLinks?: string[]
  imagePath: string
  linkedItems?: LinkedItems
}

export interface WeaponItem extends BaseItem {
  category: 'weapon'
  type: 'long gun' | 'melee' | 'hand gun'
}

export interface TraitItem extends BaseItem {
  category: 'trait'
  amount: number
}

export type Item = BaseItem | WeaponItem

export interface CsvItem {
  name: string
  category: ItemCategory
  description: string
  howToGet: string
  wikiLinks: string
}

// Used for the build page
export interface Build {
  name: string
  items: {
    helm: Item | null
    torso: Item | null
    legs: Item | null
    gloves: Item | null
    relic: Item | null
    amulet: Item | null
    weapon: WeaponItem[]
    ring: Item[]
    archtype: Item[]
    skill: Item[]
    concoction: Item[]
    consumable: Item[]
    mod: Item[]
    mutator: Item[]
    relicfragment: Item[]
    trait: TraitItem[]
  }
}
