import { CsvItem } from '../types'
import { GenericItem } from '../types/GenericItem'

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
