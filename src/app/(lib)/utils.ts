import { type CsvItem, Item } from '@/app/(types)'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { GenericItem } from '../(types)/items/GenericItem'
import { BuildState, ExtendedBuild } from '../builder/types'
import { badWordFilter } from './badword-filter'
import {
  DEFAULT_TRAIT_AMOUNT,
  MAX_BUILD_DESCRIPTION_LENGTH,
} from '../(data)/constants'
import { Build } from '@prisma/client'
import { ArmorItem } from '../(types)/items/ArmorItem'
import { WeaponItem } from '../(types)/items/WeaponItem'
import { MutatorItem } from '../(types)/items/MutatorItem'
import { TraitItem } from '../(types)/items/TraitItem'
import { remnantItemCategories, remnantItems } from '../(data)'

/**
 * capitalizes the first letter of a string
 */
export function capitalize(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

/**
 * shadcn utility function combining clsx and tailwind-merge
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

/**
 * Generates an array of the specified length
 */
export function getArrayOfLength(length: number): number[] {
  return Array.from(Array(length).keys())
}

/**
 * Removes bad characters from filename
 */
export function cleanFilename(filename: string): string {
  return filename.replace(/[^\w\s]/gi, '')
}

/**
 * Converts an array of objects to a CSV file and starts the download
 */
export function toCsv<T extends {}>(data: T[], filename: string) {
  let csvContent = 'data:text/csv;charset=utf-8,'
  if (!data[0]) return []
  // Add header row with keys
  csvContent += Object.keys(data[0]).join(',') + '\n'
  // Add data rows with values
  csvContent += data
    .filter((item) => item !== undefined)
    .map((item) => Object.values(item).join(','))
    .join('\n')

  const encodedUri = encodeURI(csvContent)
  const link = document.createElement('a')
  link.setAttribute('href', encodedUri)
  link.setAttribute('download', `${filename}.csv`)
  document.body.appendChild(link) // Required for FF
  link.click()
}

/**
 * Converts an Item to a CSV item for export
 */
export function itemToCsvItem(item: GenericItem): CsvItem {
  function cleanString(string: string): string {
    return (
      string
        // replace commas with spaces
        .replaceAll(',', ' ')
        // replace line breaks with spaces
        .replace(/(?:\r\n|\r|\n)/g, ' ')
    )
  }

  return {
    name: item.name,
    category: item.category,
    description: cleanString(item.description || ''),
    howToGet: cleanString(item.howToGet || ''),
    wikiLinks: item.wikiLinks?.join('; ') || '',
  }
}

/**
 * Removes dangling comma from the end of a string
 */
export function trimTrailingComma(string: string): string {
  return string.replace(/,\s*$/, '')
}
