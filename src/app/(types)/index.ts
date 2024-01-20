import { GenericItem } from './items/GenericItem'
import { ArmorItem } from './items/ArmorItem'
import { WeaponItem } from './items/WeaponItem'
import { MutatorItem } from './items/MutatorItem'
import { TraitItem } from './items/TraitItem'
import { ModItem } from './items/ModItem'

export type Item =
  | GenericItem
  | ArmorItem
  | WeaponItem
  | ModItem
  | MutatorItem
  | TraitItem

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

export const DLC_TO_NAME = {
  base: 'Base Game',
  dlc1: 'The Awakened King',
} as const

export type DLCKey = keyof typeof DLC_TO_NAME
export type DLCName = (typeof DLC_TO_NAME)[DLCKey]

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

export type ErrorResponse = {
  errors?: any[]
}
// type guard for ErrorResponse
export function isErrorResponse(response: any): response is ErrorResponse {
  return (response as ErrorResponse).errors !== undefined
}
