import { TraitItem } from './TraitItem'
import { GenericItem } from './GenericItem'
import { WeaponItem } from './WeaponItem'
import { ArmorItem } from './ArmorItem'
import { MutatorItem } from './MutatorItem'

/**
 * The minimum information that should be
 * written in a CSV export for each item
 */
export interface CsvItem {
  name: string
  category: GenericItem['category']
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
    relic: GenericItem | null
    amulet: GenericItem | null
    weapon: WeaponItem[]
    ring: GenericItem[]
    archtype: GenericItem[]
    skill: GenericItem[]
    concoction: GenericItem[]
    consumable: GenericItem[]
    mod: GenericItem[]
    mutator: MutatorItem[]
    relicfragment: GenericItem[]
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
