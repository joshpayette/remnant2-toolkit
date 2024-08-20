import { ItemCategory } from '@/app/(features)/builds/types/item-category';

/**
 * The minimum information that should be
 * written in a CSV export for each item
 */
export interface CsvItem {
  id: string;
  name: string;
  category: ItemCategory;
  description: string;
  wikiLinks: string;
}
