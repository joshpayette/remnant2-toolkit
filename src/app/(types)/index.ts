import { TraitItem } from './TraitItem'
import { GenericItem } from './GenericItem'
import { WeaponItem } from './WeaponItem'
import { ArmorItem } from './ArmorItem'
import { MutatorItem } from './MutatorItem'
import { z } from 'zod'

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
export const buildStateSchema = z.object({
  name: z.string(),
  items: z.object({
    helm: z.any(),
    torso: z.any(),
    legs: z.any(),
    gloves: z.any(),
    relic: z.any(),
    amulet: z.any(),
    weapon: z.array(z.any()),
    ring: z.array(z.any()),
    archtype: z.array(z.any()),
    skill: z.array(z.any()),
    concoction: z.array(z.any()),
    consumable: z.array(z.any()),
    mod: z.array(z.any()),
    mutator: z.array(z.any()),
    relicfragment: z.array(z.any()),
    trait: z.array(z.any()),
  }),
})

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
