import { BuildItems } from '@prisma/client'

import { allItems } from '../data/allItems'
import { Item } from '.'
import { BaseItem } from './BaseItem'

interface BaseArmorItem extends BaseItem {
  set?: string
}

export class ArmorItem extends BaseItem implements BaseArmorItem {
  public set?: BaseArmorItem['set']

  constructor(props: BaseArmorItem) {
    super(props)
    this.set = props.set
  }

  public static isArmorItem = (item?: Item): item is ArmorItem => {
    if (!item) return false
    return (
      item.category === 'helm' ||
      item.category === 'torso' ||
      item.category === 'legs' ||
      item.category === 'gloves'
    )
  }

  static fromDBValue(
    buildItems: BuildItems[],
    category: 'helm' | 'gloves' | 'torso' | 'legs',
  ): ArmorItem | null {
    if (!buildItems) return null

    let armorItem: ArmorItem | null = null
    for (const buildItem of buildItems) {
      const item = allItems.find((i) => i.id === buildItem.itemId)
      if (!item) continue
      if (item.category !== category) continue
      if (!this.isArmorItem(item)) continue
      armorItem = item
    }
    return armorItem
  }

  static toParams(item: ArmorItem): string {
    return `${item?.id ?? ''}`
  }

  static fromParams(params: string): ArmorItem | null {
    const itemIds = params.split(',')
    if (!itemIds) return null

    const item = allItems.find((i) => i.id === itemIds[0])
    if (!item) return null
    if (!this.isArmorItem(item)) return null
    return item
  }
}
