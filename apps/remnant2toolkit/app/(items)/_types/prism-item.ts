import { type BuildItems } from '@repo/db';

import { OPTIONAL_ITEM_SYMBOL } from '@/app/_constants/optional-item-symbol';
import { prismItems } from '@/app/(items)/_constants/prism-items';
import { type Item } from '@/app/(items)/_types/item';

import { BaseItem } from './base-item';

interface BasePrismItem extends BaseItem {}

export class PrismItem extends BaseItem implements BasePrismItem {
  public category: BasePrismItem['category'] = 'prism';

  constructor(props: BasePrismItem) {
    super(props);
  }

  public static isPrismItem = (item?: Item): item is PrismItem => {
    if (!item) return false;
    return item.category === 'prism';
  };

  static toParams(item: PrismItem): string {
    if (!item) return '';
    const validItem = prismItems.find((ri) => ri.id === item.id);
    if (!validItem) return '';

    if (item.optional) return `${item.id}${OPTIONAL_ITEM_SYMBOL}`;
    return `${item.id}`;
  }

  static fromParams(params: string): PrismItem | null {
    const itemIds = params.split(',');
    if (!itemIds || !itemIds[0]) return null;

    const optional = itemIds[0].includes(OPTIONAL_ITEM_SYMBOL);
    const itemId = itemIds[0].replace(OPTIONAL_ITEM_SYMBOL, '');

    const item = prismItems.find((i) => i.id === itemId);
    if (!item) return null;

    return optional ? { ...item, optional } : item;
  }

  static fromDBValue(
    buildItems: Array<BuildItems & { isOwned?: boolean }>,
  ): (PrismItem & { isOwned?: boolean }) | null {
    if (!buildItems) return null;

    let prismItem: (PrismItem & { isOwned?: boolean }) | null = null;
    for (const buildItem of buildItems) {
      const item = prismItems.find((i) => i.id === buildItem.itemId);
      if (!item) continue;
      prismItem = {
        ...item,
        optional: buildItem.optional,
        isOwned: buildItem.isOwned,
      };
    }
    return prismItem;
  }
}
