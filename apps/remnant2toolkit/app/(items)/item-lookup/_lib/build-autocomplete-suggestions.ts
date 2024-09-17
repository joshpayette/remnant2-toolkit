import { ITEM_TOKENS } from '@/app/(builds)/_constants/tokens';
import { allItems } from '@/app/(items)/_constants/all-items';

export function buildAutocompleteSuggestions(): Array<{
  id: string;
  name: string;
}> {
  let items = allItems
    // Remove relic fragments
    .filter((item) => item.category !== 'relicfragment')
    .map((item) => ({
      id: item.id,
      name: item.name,
    }));

  // add item tags
  items = ITEM_TOKENS.map((tag) => ({
    id: tag as string,
    name: tag as string,
  })).concat(items);

  items = items.sort((a, b) => a.name.localeCompare(b.name));

  // remove duplicates
  items = items.filter(
    (item, index, self) =>
      index === self.findIndex((i) => i.name === item.name),
  );

  return items;
}
