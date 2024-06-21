import { Item } from '@/app/(data)/items/types'
import { CsvItem } from '@/app/(types)/csv'

/**
 * Converts an Item to a CSV item for export
 */
export function itemToCsvItem(item: Item): CsvItem {
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
    id: item.id,
    name: item.name,
    category: item.category,
    description: cleanString(item.description || ''),
    wikiLinks: item.wikiLinks?.join('; ') || '',
  }
}
