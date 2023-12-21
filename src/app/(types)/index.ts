import { TraitItem } from './TraitItem'
import { BaseItem } from './BaseItem'
import { WeaponItem } from './WeaponItem'
import { ArmorItem } from './ArmorItem'
import { MutatorItem } from './MutatorItem'


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
    helm: ArmorItem | null
    torso: ArmorItem | null
    legs: ArmorItem | null
    gloves: ArmorItem | null
    relic: BaseItem | null
    amulet: BaseItem | null
    weapon: WeaponItem[]
    ring: BaseItem[]
    archtype: BaseItem[]
    skill: BaseItem[]
    concoction: BaseItem[]
    consumable: BaseItem[]
    mod: BaseItem[]
    mutator: MutatorItem[]
    relicfragment: BaseItem[]
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
