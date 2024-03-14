import { BuildItems } from '@prisma/client'

import { remnantItems } from '../data/remnantItems'
import { Item } from '.'
import { BaseItem } from './BaseItem'

interface BaseWeaponItem extends BaseItem {
  type: 'long gun' | 'melee' | 'hand gun'
  accuracy: number
  ammo: number
  crit: number
  damage: number
  falloff: number
  ideal: number
  magazine?: number
  rps?: number
  stagger: number
  weakspot: number
}

export class WeaponItem extends BaseItem implements BaseWeaponItem {
  public category: BaseWeaponItem['category'] = 'weapon'
  public type: BaseWeaponItem['type'] = 'long gun'
  public damage: BaseWeaponItem['damage'] = 0
  public accuracy: BaseWeaponItem['accuracy'] = 0
  public ammo: BaseWeaponItem['ammo'] = 0
  public crit: BaseWeaponItem['crit'] = 0
  public falloff: BaseWeaponItem['falloff'] = 0
  public ideal: BaseWeaponItem['ideal'] = 0
  public magazine?: BaseWeaponItem['magazine'] = 0
  public rps?: BaseWeaponItem['rps'] = 0
  public stagger: BaseWeaponItem['stagger'] = 0
  public weakspot: BaseWeaponItem['weakspot'] = 0

  constructor(props: BaseWeaponItem) {
    super(props)
    this.type = props.type
    this.accuracy = props.accuracy
    this.ammo = props.ammo
    this.crit = props.crit
    this.damage = props.damage
    this.falloff = props.falloff
    this.ideal = props.ideal
    this.magazine = props.magazine
    this.rps = props.rps
    this.stagger = props.stagger
    this.weakspot = props.weakspot
  }

  public static isWeaponItem = (item?: Item): item is WeaponItem => {
    if (!item) return false
    return item.category === 'weapon'
  }

  static toParams(items: Array<WeaponItem | null>): string[] {
    return items.map((i) => `${i?.id ?? ''}`)
  }

  static fromParams(params: string): WeaponItem[] | null {
    const itemIds = params.split(',')
    if (!itemIds) return null

    const items: WeaponItem[] = []
    itemIds.forEach((itemId, index) => {
      const item = remnantItems.find((i) => i.id === itemId)
      if (!item) return
      if (!this.isWeaponItem(item)) return
      items[index] = item
    })

    if (items.length === 0) return null
    if (items.filter((i) => !this.isWeaponItem(i)).length > 0) return null

    return items
  }

  static fromDBValue(buildItems: BuildItems[]): Array<WeaponItem | null> {
    if (!buildItems) return []

    let weaponItems: Array<WeaponItem | null> = []
    for (const buildItem of buildItems) {
      const item = remnantItems.find((i) => i.id === buildItem.itemId)
      if (!item) continue
      if (item.category !== 'weapon') continue
      if (!this.isWeaponItem(item)) continue
      buildItem.index
        ? (weaponItems[buildItem.index] = item)
        : weaponItems.push(item)
    }
    return weaponItems
  }
}
