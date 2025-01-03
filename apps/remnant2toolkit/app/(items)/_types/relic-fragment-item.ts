import { type BuildItems } from '@repo/db';

import { OPTIONAL_ITEM_SYMBOL } from '@/app/_constants/item-symbols';
import { relicFragmentItems } from '@/app/(items)/_constants/relic-fragment-items';
import { BaseItem } from '@/app/(items)/_types/base-item';
import { type Item } from '@/app/(items)/_types/item';

interface BaseRelicFragmentItem extends BaseItem {
  color?: 'red' | 'blue' | 'yellow' | 'legendary';
  index?: number;
}

export class RelicFragmentItem
  extends BaseItem
  implements BaseRelicFragmentItem
{
  public category: BaseRelicFragmentItem['category'] = 'relicfragment';
  public color?: BaseRelicFragmentItem['color'];
  public index?: BaseRelicFragmentItem['index'];

  constructor(props: BaseRelicFragmentItem) {
    super(props);
    this.color = props.color;
    this.index = props.index;
  }

  public static isRelicFragmentItem = (
    item?: Item,
  ): item is RelicFragmentItem => {
    if (!item) return false;
    return item.category === 'relicfragment';
  };

  static toParams(items: Array<RelicFragmentItem | null>): string[] {
    return items.map((i) => {
      if (!i || !i.id) return '';
      return i.optional ? `${i.id}${OPTIONAL_ITEM_SYMBOL}` : i.id;
    });
  }

  static fromParams(params: string): RelicFragmentItem[] | null {
    const itemIds = params.split(',');
    if (!itemIds) return null;

    const items: RelicFragmentItem[] = [];
    itemIds.forEach((itemId, index) => {
      const optional = itemId.includes(OPTIONAL_ITEM_SYMBOL);
      itemId = itemId.replace(OPTIONAL_ITEM_SYMBOL, '');

      const item = relicFragmentItems.find((i) => i.id === itemId);
      if (!item) return;
      items[index] = optional
        ? { ...item, index, optional }
        : { ...item, index };
    });

    if (items.length === 0) return null;

    return items;
  }

  static fromDBValue(
    buildItems: Array<BuildItems & { isOwned?: boolean }>,
  ): Array<(RelicFragmentItem & { isOwned?: boolean }) | null> {
    if (!buildItems) return [];

    const relicFragmentValues: Array<
      (RelicFragmentItem & { isOwned?: boolean }) | null
    > = [];
    for (const buildItem of buildItems) {
      const item = relicFragmentItems.find((i) => i.id === buildItem.itemId);
      if (!item) continue;
      buildItem.index
        ? (relicFragmentValues[buildItem.index] = {
            ...item,
            optional: buildItem.optional,
            isOwned: buildItem.isOwned,
            index: buildItem.index,
          })
        : relicFragmentValues.push({
            ...item,
            optional: buildItem.optional,
            isOwned: buildItem.isOwned,
          });
    }

    return relicFragmentValues;
  }
}
