import { Build } from '@prisma/client'
import { GenericItem } from './items/GenericItem'
import { ArmorItem } from './items/ArmorItem'
import { WeaponItem } from './items/WeaponItem'
import { MutatorItem } from './items/MutatorItem'
import { TraitItem } from './items/TraitItem'

export type Item =
  | GenericItem
  | ArmorItem
  | WeaponItem
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

/**
 * Additional fields not stored in the db, but computed for the buildState
 */
export interface ExtendedBuild extends Build {
  createdByDisplayName: string
  reported: boolean
  upvoted: boolean
  totalUpvotes: number
}

export const DLC_TO_NAME = {
  basegame: 'Base Game',
  dlc1: 'The Awakened King',
} as const

export type DLCKey = keyof typeof DLC_TO_NAME
export type DLCName = (typeof DLC_TO_NAME)[DLCKey]

export type ErrorResponse = {
  errors?: any[]
}
// type guard for ErrorResponse
export function isErrorResponse(response: any): response is ErrorResponse {
  return (response as ErrorResponse).errors !== undefined
}
