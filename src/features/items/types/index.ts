import { RELEASE_TO_NAME } from '../constants'
import { ArmorItem } from './ArmorItem'
import { GenericItem } from './GenericItem'
import { ModItem } from './ModItem'
import { MutatorItem } from './MutatorItem'
import { PerkItem } from './PerkItem'
import { TraitItem } from './TraitItem'
import { WeaponItem } from './WeaponItem'

export type Item =
  | GenericItem
  | ArmorItem
  | WeaponItem
  | ModItem
  | MutatorItem
  | TraitItem
  | PerkItem

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

export type Archtype =
  | 'alchemist'
  | 'archon'
  | 'challenger'
  | 'engineer'
  | 'explorer'
  | 'gunslinger'
  | 'handler'
  | 'hunter'
  | 'invader'
  | 'medic'
  | 'ritualist'
  | 'summoner'

export type Modifier = {
  type: string
  token: string
  color: string
  description: string
}

export type ReleaseKey = keyof typeof RELEASE_TO_NAME
export type ReleaseName = (typeof RELEASE_TO_NAME)[ReleaseKey]
