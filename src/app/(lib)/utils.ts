import { BuildState, type CsvItem } from '@/app/(types)'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'
import { GenericItem } from '../(types)/GenericItem'

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

/**
 * Determines how many concoction slots the build has
 */
export function getConcoctionSlotCount(buildState: BuildState): number {
  // Start at 0 since we already rendered the first concoction
  let concoctionCount = 0

  // Add 3 concoctions if primary is alchemist
  // or if the primary skill is an alchemist skill
  const isPrimaryAlchemist =
    buildState.items.archtype[0]?.name?.toLowerCase() === 'alchemist'
  const isPrimarySkillAlchemist =
    buildState.items.skill[0]?.linkedItems?.archtype?.name === 'Alchemist'
  if (isPrimaryAlchemist || isPrimarySkillAlchemist) concoctionCount += 3

  // Add 1 concoction if they are wearing Feastmaster's Signet
  const hasFeastmastersSignet = buildState.items.ring.some(
    (ring) => ring.name === "Feastmaster's Signet",
  )
  if (hasFeastmastersSignet) concoctionCount += 1

  // Add 2 concoctionc if they are wearing Brewmasters Cork
  const hasBrewmastersCork =
    buildState.items.amulet?.name === 'Brewmasters Cork'

  if (hasBrewmastersCork) concoctionCount += 2

  return concoctionCount
}
