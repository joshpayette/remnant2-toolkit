import { type BuildItems } from '@repo/db';

import { archetypeItems } from '@/app/(data)/items/archetype-items';
import { OPTIONAL_ITEM_SYMBOL } from '@/app/(data)/items/constants';
import { type Item } from '@/app/(data)/items/types';
import { BaseItem } from '@/app/(data)/items/types/BaseItem';

interface BaseArchetypeItem extends BaseItem {}

export class ArchetypeItem extends BaseItem implements BaseArchetypeItem {
  public category: BaseArchetypeItem['category'] = 'archetype';

  constructor(props: BaseArchetypeItem) {
    super(props);
  }

  public static isArchetypeItem = (item?: Item): item is ArchetypeItem => {
    if (!item) return false;
    return item.category === 'archetype';
  };

  static toParams(items: Array<ArchetypeItem | null>): string[] {
    return items.map((i) => {
      if (!i || !i.id) return '';
      return i.optional ? `${i.id}${OPTIONAL_ITEM_SYMBOL}` : i.id;
    });
  }

  static fromParams(params: string): ArchetypeItem[] | null {
    const itemIds = params.split(',');
    if (!itemIds) return null;

    const items: ArchetypeItem[] = [];
    itemIds.forEach((itemId, index) => {
      const optional = itemId.includes(OPTIONAL_ITEM_SYMBOL);
      itemId = itemId.replace(OPTIONAL_ITEM_SYMBOL, '');

      const item = archetypeItems.find((i) => i.id === itemId);
      if (!item) return;
      items[index] = optional ? { ...item, optional: true } : { ...item };
    });

    if (items.length === 0) return null;
    return items;
  }

  static fromDBValue(
    buildItems: Array<BuildItems & { isOwned?: boolean }>,
  ): Array<(ArchetypeItem & { isOwned?: boolean }) | null> {
    if (!buildItems) return [];

    const archetypeValues: Array<
      (ArchetypeItem & { isOwned?: boolean }) | null
    > = [];
    for (const buildItem of buildItems) {
      const item = archetypeItems.find((i) => i.id === buildItem.itemId);
      if (!item) continue;
      if (item.category !== 'archetype') continue;
      buildItem.index
        ? (archetypeValues[buildItem.index] = {
            ...item,
            optional: buildItem.optional,
            isOwned: buildItem.isOwned,
          })
        : archetypeValues.push({
            ...item,
            optional: buildItem.optional,
            isOwned: buildItem.isOwned,
          });
    }

    return archetypeValues;
  }
}
