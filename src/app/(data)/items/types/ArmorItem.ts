import { BuildItems } from '@prisma/client'

import { Item } from '../../../../features/items/types'
import { armorItems } from '../armor-items'
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
      const item = armorItems.find((i) => i.id === buildItem.itemId)
      if (!item) continue
      if (item.category !== category) continue
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

    const item = armorItems.find((i) => i.id === itemIds[0])
    if (!item) return null
    return item
  }
}
