import { type BuildItems } from '@repo/db';

import { OPTIONAL_ITEM_SYMBOL } from '@/app/_constants/item-symbols';
import { ringItems } from '@/app/(items)/_constants/ring-items';
import { BaseItem } from '@/app/(items)/_types/base-item';
import { type Item } from '@/app/(items)/_types/item';

interface BaseRingItem extends BaseItem {}

export class RingItem extends BaseItem implements BaseRingItem {
  public category: BaseRingItem['category'] = 'ring';

  constructor(props: BaseRingItem) {
    super(props);
  }

  public static isRingItem = (item?: Item): item is RingItem => {
    if (!item) return false;
    return item.category === 'ring';
  };

  static toParams(items: Array<RingItem | null>): string[] {
    return items.map((i) => {
      if (!i || !i.id) return '';
      return i.optional ? `${i.id}${OPTIONAL_ITEM_SYMBOL}` : i.id;
    });
  }

  static fromParams(params: string): RingItem[] | null {
    const itemIds = params.split(',');
    if (!itemIds) return null;

    const items: RingItem[] = [];
    itemIds.forEach((itemId, index) => {
      const optional = itemId.includes(OPTIONAL_ITEM_SYMBOL);
      itemId = itemId.replace(OPTIONAL_ITEM_SYMBOL, '');

      const item = ringItems.find((i) => i.id === itemId);
      if (!item) return;
      items[index] = optional ? { ...item, optional } : item;
    });

    if (items.length === 0) return null;

    return items;
  }

  static fromDBValue(
    buildItems: Array<BuildItems & { isOwned?: boolean }>,
  ): Array<(RingItem & { isOwned?: boolean }) | null> {
    if (!buildItems) return [];

    const ringValues: Array<(RingItem & { isOwned?: boolean }) | null> = [];
    for (const buildItem of buildItems) {
      const item = ringItems.find((i) => i.id === buildItem.itemId);
      if (!item) continue;
      buildItem.index
        ? (ringValues[buildItem.index] = {
            ...item,
            optional: buildItem.optional,
            isOwned: buildItem.isOwned,
          })
        : ringValues.push({
            ...item,
            optional: buildItem.optional,
            isOwned: buildItem.isOwned,
          });
    }

    return ringValues;
  }
}
