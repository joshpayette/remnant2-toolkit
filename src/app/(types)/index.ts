import { type TraitItem } from './TraitItem'
import { type BaseItem } from './BaseItem'
import { type WeaponItem } from './WeaponItem'
import { type ArmorItem } from './ArmorItem'
import { type MutatorItem } from './MutatorItem'

/**
 * All the items in the game
 */
export type Item = BaseItem | WeaponItem | ArmorItem | TraitItem | MutatorItem

/**
 * The minimum information that should be
 * written in a CSV export for each item
 */
export interface CsvItem {
  name: string
  category: BaseItem['category']
  description: string
  howToGet: string
  wikiLinks: string
}

/**
 * The build tool UI state
 */
export interface BuildState {
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

/**
 * The information provided by the metadata for
 * each featured-build page
 */
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
