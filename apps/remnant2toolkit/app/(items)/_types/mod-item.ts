import { type BuildItems } from '@repo/db';

import { OPTIONAL_ITEM_SYMBOL } from '@/app/_constants/item-symbols';
import { modItems } from '@/app/(items)/_constants/mod-items';
import { BaseItem } from '@/app/(items)/_types/base-item';
import { type Item } from '@/app/(items)/_types/item';

interface BaseModItem extends BaseItem {}

export class ModItem extends BaseItem implements BaseModItem {
  public category: BaseModItem['category'] = 'mod';

  constructor(props: BaseModItem) {
    super(props);
  }

  public static isModItem = (item?: Item): item is ModItem => {
    if (!item) return false;
    return item.category === 'mod';
  };

  static toParams(items: Array<ModItem | null>): string[] {
    return items.map((i) => {
      if (!i || !i.id) return '';
      return i.optional ? `${i.id}${OPTIONAL_ITEM_SYMBOL}` : i.id;
    });
  }

  static fromParams(params: string): ModItem[] | null {
    const itemIds = params.split(',');
    if (!itemIds) return null;

    const items: ModItem[] = [];
    itemIds.forEach((itemId, index) => {
      const optional = itemId.includes(OPTIONAL_ITEM_SYMBOL);
      itemId = itemId.replace(OPTIONAL_ITEM_SYMBOL, '');

      const item = modItems.find((i) => i.id === itemId);
      if (!item) return;
      items[index] = optional ? { ...item, optional } : item;
    });

    if (items.length === 0) return null;

    return items;
  }

  static fromDBValue(
    buildItems: Array<BuildItems & { isOwned?: boolean }>,
  ): Array<(ModItem & { isOwned?: boolean }) | null> {
    if (!buildItems) return [];

    const modValues: Array<(ModItem & { isOwned?: boolean }) | null> = [];
    for (const buildItem of buildItems) {
      const item = modItems.find((i) => i.id === buildItem.itemId);
      if (!item) continue;
      buildItem.index
        ? (modValues[buildItem.index] = {
            ...item,
            optional: buildItem.optional,
            isOwned: buildItem.isOwned,
          })
        : modValues.push({
            ...item,
            optional: buildItem.optional,
            isOwned: buildItem.isOwned,
          });
    }

    return modValues;
  }
}
