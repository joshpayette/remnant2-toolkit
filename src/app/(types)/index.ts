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
  saveFileSlug?: string
  description?: string
  howToGet?: string
  wikiLinks?: string[]
  imagePath: string
  linkedItems?: LinkedItems
}

export interface ArmorItem extends BaseItem {
  category: 'helm' | 'torso' | 'legs' | 'gloves'
  set?: string
  armor: number
  weight: number
  bleedResistance: number
  fireResistance: number
  shockResistance: number
  blightResistance: number
  toxinResistance: number
}

export const isArmorItem = (item: Item): item is ArmorItem =>
  item.category === 'helm' ||
  item.category === 'torso' ||
  item.category === 'legs' ||
  item.category === 'gloves'

export interface WeaponItem extends BaseItem {
  category: 'weapon'
  type: 'long gun' | 'melee' | 'hand gun'
}

export const isWeaponItem = (item: Item): item is WeaponItem =>
  item.category === 'weapon'

export interface TraitItem extends BaseItem {
  category: 'trait'
  amount: number
}

export const isTraitItem = (item: Item): item is TraitItem =>
  item.category === 'trait'

export interface MutatorItem extends BaseItem {
  category: 'mutator'
  maxLevelBonus: string
  type: 'gun' | 'melee'
}

export const isMutatorItem = (item: Item): item is MutatorItem =>
  item.category === 'mutator'

export type Item = BaseItem | WeaponItem | ArmorItem | TraitItem | MutatorItem

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

export interface PageInfo {
  title: string
  creator?: string | string[]
  description: string
  slug: string
  url: string
  ogImageUrl: string
  classes?: string[]
  tags?: string[]
}
