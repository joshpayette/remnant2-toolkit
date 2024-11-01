import { type BuildItems } from '@repo/db';

import { OPTIONAL_ITEM_SYMBOL } from '@/app/_constants/item-symbols';
import { pylonItems } from '@/app/(items)/_constants/pylon-items';
import { BaseItem } from '@/app/(items)/_types/base-item';
import { type Item } from '@/app/(items)/_types/item';

interface BasePylonItem extends BaseItem {}

export class PylonItem extends BaseItem implements BasePylonItem {
  public category: BasePylonItem['category'] = 'pylon';

  constructor(props: BasePylonItem) {
    super(props);
  }

  public static isRingItem = (item?: Item): item is PylonItem => {
    if (!item) return false;
    return item.category === 'pylon';
  };

  static toParams(items: Array<PylonItem | null>): string[] {
    return items.map((i) => {
      if (!i || !i.id) return '';
      return i.optional ? `${i.id}${OPTIONAL_ITEM_SYMBOL}` : i.id;
    });
  }

  static fromParams(params: string): PylonItem[] | null {
    const itemIds = params.split(',');
    if (!itemIds) return null;

    const items: PylonItem[] = [];
    itemIds.forEach((itemId, index) => {
      const optional = itemId.includes(OPTIONAL_ITEM_SYMBOL);
      itemId = itemId.replace(OPTIONAL_ITEM_SYMBOL, '');

      const item = pylonItems.find((i) => i.id === itemId);
      if (!item) return;
      items[index] = optional ? { ...item, optional } : item;
    });

    if (items.length === 0) return null;

    return items;
  }

  static fromDBValue(
    buildItems: Array<BuildItems & { isOwned?: boolean }>,
  ): Array<(PylonItem & { isOwned?: boolean }) | null> {
    if (!buildItems) return [];

    const ringValues: Array<(PylonItem & { isOwned?: boolean }) | null> = [];
    for (const buildItem of buildItems) {
      const item = pylonItems.find((i) => i.id === buildItem.itemId);
      if (!item) continue;
      buildItem.index
        ? (ringValues[buildItem.index] = {
            ...item,
            optional: buildItem.optional,
          })
        : ringValues.push({
            ...item,
            optional: buildItem.optional,
          });
    }

    return ringValues;
  }
}
