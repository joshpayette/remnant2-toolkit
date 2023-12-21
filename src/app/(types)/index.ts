import { Build } from '@prisma/client'
import { TraitItem } from './TraitItem'
import { BaseItem } from './BaseItem'

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
  category: BaseItem['category']
  description: string
  howToGet: string
  wikiLinks: string
}

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
