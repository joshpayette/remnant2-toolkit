import { type CheerioAPI } from 'cheerio';

import { type RelicFragmentItem } from '@/app/(data)/items/types/RelicFragmentItem';

/**
 * Relic Fragments are a single table on a page
 */
export function relicfragmentDataParse(
  $: CheerioAPI,
  item: RelicFragmentItem,
): {
  description: string;
} {
  const $tbody = $('table.wikitable tbody');

  let description = '';

  // Loop through each TR
  // The first TD is the item name, the second TD is the max percentage
  const $trItems = $tbody.find('tr');
  // remove the first row as it's the header
  $trItems.splice(0, 1);

  for (let i = 0; i < $trItems.length; i++) {
    const $tr = $trItems.eq(i);
    const itemName = $tr
      .find('td:nth-child(1)')
      .text()
      .trim()
      .replaceAll('[sic]', '');
    const itemValue = $tr
      .find('td:nth-child(2)')
      .text()
      .trim()
      .replaceAll('[sic]', '');

    if (!itemName || !itemValue) {
      console.error('Failed to parse relic fragment data');
      return {
        description: '',
      };
    }
    if (itemName !== item.name) {
      continue;
    }

    description = `${itemName}, ${itemValue} at max level.`;

    return {
      description,
    };
  }

  return {
    description,
  };
}
