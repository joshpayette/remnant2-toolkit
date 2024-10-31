import { type BuildItems } from '@repo/db';

import { OPTIONAL_ITEM_SYMBOL } from '@/app/_constants/item-symbols';
import { concoctionItems } from '@/app/(items)/_constants/concoction-items';
import { BaseItem } from '@/app/(items)/_types/base-item';
import { type Item } from '@/app/(items)/_types/item';

interface BaseConcoctionItem extends BaseItem {}

export class ConcoctionItem extends BaseItem implements BaseConcoctionItem {
  public category: BaseConcoctionItem['category'] = 'concoction';

  constructor(props: BaseConcoctionItem) {
    super(props);
  }

  public static isConcoctionItem = (item?: Item): item is ConcoctionItem => {
    if (!item) return false;
    return item.category === 'concoction';
  };

  static toParams(items: Array<ConcoctionItem | null>): string[] {
    return items.map((i) => {
      if (!i || !i.id) return '';
      return i.optional ? `${i.id}${OPTIONAL_ITEM_SYMBOL}` : i.id;
    });
  }

  static fromParams(params: string): ConcoctionItem[] | null {
    const itemIds = params.split(',');
    if (!itemIds) return null;

    const items: ConcoctionItem[] = [];
    itemIds.forEach((itemId, index) => {
      const optional = itemId.includes(OPTIONAL_ITEM_SYMBOL);
      itemId = itemId.replace(OPTIONAL_ITEM_SYMBOL, '');

      const item = concoctionItems.find((i) => i.id === itemId);
      if (!item) return;
      items[index] = optional ? { ...item, optional } : item;
    });

    if (items.length === 0) return null;

    return items;
  }

  static fromDBValue(
    buildItems: Array<BuildItems & { isOwned?: boolean }>,
  ): Array<(ConcoctionItem & { isOwned?: boolean }) | null> {
    if (!buildItems) return [];

    const concoctionValues: Array<
      (ConcoctionItem & { isOwned?: boolean }) | null
    > = [];
    for (const buildItem of buildItems) {
      const item = concoctionItems.find((i) => i.id === buildItem.itemId);
      if (!item) continue;
      if (item.category !== 'concoction') continue;
      buildItem.index
        ? (concoctionValues[buildItem.index] = {
            ...item,
            optional: buildItem.optional,
            isOwned: buildItem.isOwned,
          })
        : concoctionValues.push({
            ...item,
            optional: buildItem.optional,
            isOwned: buildItem.isOwned,
          });
    }

    return concoctionValues;
  }
}
