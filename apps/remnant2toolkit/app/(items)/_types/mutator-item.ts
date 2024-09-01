import { type BuildItems } from '@repo/db';

import { OPTIONAL_ITEM_SYMBOL } from '@/app/_constants/optional-item-symbol';
import { mutatorItems } from '@/app/(items)/_constants/mutator-items';
import { BaseItem } from '@/app/(items)/_types/base-item';
import { type Item } from '@/app/(items)/_types/item';

interface BaseMutatorItem extends BaseItem {
  maxLevelBonus: string;
  type: 'gun' | 'melee';
}

export class MutatorItem extends BaseItem implements BaseMutatorItem {
  public category: BaseMutatorItem['category'] = 'mutator';
  public type: BaseMutatorItem['type'] = 'gun';
  public maxLevelBonus: BaseMutatorItem['maxLevelBonus'] = '';

  constructor(props: BaseMutatorItem) {
    super(props);
    this.type = props.type;
    this.maxLevelBonus = props.maxLevelBonus;
  }

  public static isMutatorItem = (item?: Item): item is MutatorItem => {
    if (!item) return false;
    return item.category === 'mutator';
  };

  static toParams(items: Array<MutatorItem | null>): string[] {
    return items.map((i) => {
      if (!i || !i.id) return '';
      return i.optional ? `${i.id}${OPTIONAL_ITEM_SYMBOL}` : i.id;
    });
  }

  static fromParams(params: string): MutatorItem[] | null {
    const itemIds = params.split(',');
    if (!itemIds) return null;

    const items: MutatorItem[] = [];
    itemIds.forEach((itemId, index) => {
      const optional = itemId.includes(OPTIONAL_ITEM_SYMBOL);
      itemId = itemId.replace(OPTIONAL_ITEM_SYMBOL, '');

      const item = mutatorItems.find((i) => i.id === itemId);
      if (!item) return;
      items[index] = optional ? { ...item, optional } : item;
    });

    if (items.length === 0) return null;

    return items;
  }

  static fromDBValue(
    buildItems: Array<BuildItems & { isOwned?: boolean }>,
  ): Array<(MutatorItem & { isOwned?: boolean }) | null> {
    if (!buildItems) return [];

    const mutatorValues: Array<(MutatorItem & { isOwned?: boolean }) | null> =
      [];
    for (const buildItem of buildItems) {
      const item = mutatorItems.find((i) => i.id === buildItem.itemId);
      if (!item) continue;
      buildItem.index
        ? (mutatorValues[buildItem.index] = {
            ...item,
            optional: buildItem.optional,
            isOwned: buildItem.isOwned,
          })
        : mutatorValues.push({
            ...item,
            optional: buildItem.optional,
            isOwned: buildItem.isOwned,
          });
    }

    return mutatorValues;
  }
}
