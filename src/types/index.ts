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
  [key in 'mod' | 'mutator' | 'trait' | 'skill']: {
    name: string
  }
}>

interface BaseItem {
  id: string
  name: string
  category: ItemCategory
  description?: string
  howToGet?: string
  wikiLinks?: string[]
  imagePath: string
}

export interface WeaponItem extends BaseItem {
  category: 'weapon'
  type: 'long gun' | 'melee' | 'hand gun'
  linkedItems: LinkedItems
  // if it has a permanent mod slot
  hasMod?: boolean
  // if it has a permanent mutator slot
  hasMutator?: boolean
}

export type Item = BaseItem | WeaponItem

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
    trait: Item[]
  }
}
