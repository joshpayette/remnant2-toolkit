import { TraitItem } from './TraitItem'
import { GenericItem } from './GenericItem'
import { WeaponItem } from './WeaponItem'
import { ArmorItem } from './ArmorItem'
import { MutatorItem } from './MutatorItem'
import { z } from 'zod'
import { MAX_BUILD_DESCRIPTION_LENGTH } from '../(lib)/constants'

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
