import { type CsvItem, type Item } from '@/app/(types)/main'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

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
 * Converts an array of objects to a CSV file and starts the download
 */
export function toCsv<T extends {}>(data: T[], filename: string) {
  let csvContent = 'data:text/csv;charset=utf-8,'
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
export function itemToCsvItem(item: Item): CsvItem {
  return {
    name: item.name,
    category: item.category,
    description: item.description?.replaceAll(',', ' ') || '',
    howToGet: item.howToGet?.replaceAll(',', ' ') || '',
    wikiLinks: item.wikiLinks?.join('; ') || '',
  }
}

/**
 * Removes dangling comma from the end of a string
 */
export function trimTrailingComma(string: string): string {
  return string.replace(/,\s*$/, '')
}
