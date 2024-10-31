import { type BuildItems } from '@repo/db';

import { OPTIONAL_ITEM_SYMBOL } from '@/app/_constants/item-symbols';
import { weaponItems } from '@/app/(items)/_constants/weapon-items';
import { BaseItem } from '@/app/(items)/_types/base-item';
import { type Item } from '@/app/(items)/_types/item';

interface BaseWeaponItem extends BaseItem {
  type: 'long gun' | 'melee' | 'hand gun';
  isRusty?: boolean;
  accuracy?: number;
  ammo?: number;
  crit: number;
  damage: number;
  falloff?: number;
  ideal?: number;
  magazine?: number;
  rps?: number;
  stagger: number;
  weakspot: number;
}

export class WeaponItem extends BaseItem implements BaseWeaponItem {
  public category: BaseWeaponItem['category'] = 'weapon';
  public type: BaseWeaponItem['type'] = 'long gun';
  public isRusty?: BaseWeaponItem['isRusty'] = false;
  public damage: BaseWeaponItem['damage'] = 0;
  public accuracy?: BaseWeaponItem['accuracy'] = 0;
  public ammo?: BaseWeaponItem['ammo'] = 0;
  public crit: BaseWeaponItem['crit'] = 0;
  public falloff?: BaseWeaponItem['falloff'] = 0;
  public ideal?: BaseWeaponItem['ideal'] = 0;
  public magazine?: BaseWeaponItem['magazine'] = 0;
  public rps?: BaseWeaponItem['rps'] = 0;
  public stagger: BaseWeaponItem['stagger'] = 0;
  public weakspot: BaseWeaponItem['weakspot'] = 0;

  constructor(props: BaseWeaponItem) {
    super(props);
    this.type = props.type;
    this.isRusty = props.isRusty;
    this.accuracy = props.accuracy;
    this.ammo = props.ammo;
    this.crit = props.crit;
    this.damage = props.damage;
    this.falloff = props.falloff;
    this.ideal = props.ideal;
    this.magazine = props.magazine;
    this.rps = props.rps;
    this.stagger = props.stagger;
    this.weakspot = props.weakspot;
  }

  public static isWeaponItem = (item?: Item): item is WeaponItem => {
    if (!item) return false;
    return item.category === 'weapon';
  };

  static toParams(items: Array<WeaponItem | null>): string[] {
    return items.map((i) => {
      if (!i || !i.id) return '';
      return i.optional ? `${i.id}${OPTIONAL_ITEM_SYMBOL}` : i.id;
    });
  }

  static fromParams(params: string): WeaponItem[] | null {
    const itemIds = params.split(',');
    if (!itemIds) return null;

    const items: WeaponItem[] = [];
    itemIds.forEach((itemId, index) => {
      const optional = itemId.includes(OPTIONAL_ITEM_SYMBOL);
      itemId = itemId.replace(OPTIONAL_ITEM_SYMBOL, '');

      const item = weaponItems.find((i) => i.id === itemId);
      if (!item) return;
      items[index] = optional ? { ...item, optional } : item;
    });

    if (items.length === 0) return null;

    return items;
  }

  static fromDBValue(
    buildItems: Array<BuildItems & { isOwned?: boolean }>,
  ): Array<(WeaponItem & { isOwned?: boolean }) | null> {
    if (!buildItems) return [];

    const weaponValues: Array<(WeaponItem & { isOwned?: boolean }) | null> = [];
    for (const buildItem of buildItems) {
      const item = weaponItems.find((i) => i.id === buildItem.itemId);
      if (!item) continue;
      buildItem.index
        ? (weaponValues[buildItem.index] = {
            ...item,
            optional: buildItem.optional,
            isOwned: buildItem.isOwned,
          })
        : weaponValues.push({
            ...item,
            optional: buildItem.optional,
            isOwned: buildItem.isOwned,
          });
    }

    return weaponValues;
  }
}
