import { type BuildItems } from '@repo/db';

import { OPTIONAL_ITEM_SYMBOL } from '@/app/_constants/optional-item-symbol';
import { fusionItems } from '@/app/(items)/_constants/fusion-items';
import { relicFragmentItems } from '@/app/(items)/_constants/relic-fragment-items';
import { BaseItem } from '@/app/(items)/_types/base-item';
import { type Item } from '@/app/(items)/_types/item';
import { type RelicFragmentItem } from '@/app/(items)/_types/relic-fragment-item';

interface BaseFusionItem extends BaseItem {
  fragmentIds: string[];
  index?: number;
}

export class FusionItem extends BaseItem implements BaseFusionItem {
  public category: BaseFusionItem['category'] = 'fusion';
  public index?: BaseFusionItem['index'];
  public fragmentIds: BaseFusionItem['fragmentIds'];

  constructor(props: BaseFusionItem) {
    super(props);
    this.index = props.index;
    this.fragmentIds = props.fragmentIds;
  }

  public static isFusionItem = (item?: Item): item is FusionItem => {
    if (!item) return false;
    return item.category === 'fusion';
  };

  static toParams(items: Array<FusionItem | null>): string[] {
    return items.map((i) => {
      if (!i || !i.id) return '';
      return i.optional ? `${i.id}${OPTIONAL_ITEM_SYMBOL}` : i.id;
    });
  }

  static fromParams(params: string): FusionItem[] | null {
    const itemIds = params.split(',');
    if (!itemIds) return null;

    const items: FusionItem[] = [];
    itemIds.forEach((itemId, index) => {
      // if the itemId ends with `-#`, it's specifying an index
      let specifiedIndex = index;
      if (itemId.includes('-')) {
        const [id, indexStr] = itemId.split('-');
        itemId = id as string;
        specifiedIndex = parseInt(indexStr as string, 10);
      }

      const optional = itemId.includes(OPTIONAL_ITEM_SYMBOL);
      itemId = itemId.replace(OPTIONAL_ITEM_SYMBOL, '');

      const item = fusionItems.find((i) => i.id === itemId);
      if (!item) return;
      items[index] = optional
        ? { ...item, index: specifiedIndex, optional }
        : { ...item, index: specifiedIndex };
    });

    if (items.length === 0) return null;

    return items;
  }

  static fromDBValue(
    buildItems: Array<BuildItems & { isOwned?: boolean }>,
  ): Array<(FusionItem & { isOwned?: boolean }) | null> {
    if (!buildItems) return [];

    const fusionValues: Array<(FusionItem & { isOwned?: boolean }) | null> = [];
    for (const buildItem of buildItems) {
      const item = fusionItems.find((i) => i.id === buildItem.itemId);
      if (!item) continue;

      buildItem.index
        ? (fusionValues[buildItem.index] = {
            ...item,
            optional: buildItem.optional,
            isOwned: buildItem.isOwned,
            index: buildItem.index,
          })
        : fusionValues.push({
            ...item,
            optional: buildItem.optional,
            isOwned: buildItem.isOwned,
          });
    }

    return fusionValues;
  }

  static getFragmentInfo(fusion: FusionItem): RelicFragmentItem[] {
    return fusion.fragmentIds.map((fragmentId) => {
      const fragment = relicFragmentItems.find((i) => i.id === fragmentId);
      if (!fragment) {
        throw new Error(`Fragment with id ${fragmentId} not found`);
      }
      return fragment;
    });
  }
}
