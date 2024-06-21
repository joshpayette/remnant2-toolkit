import { BuildItems } from '@repo/db'

import { OPTIONAL_ITEM_SYMBOL } from '@/app/(data)/items/constants'
import { Item } from '@/app/(data)/items/types'

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
      armorItem = {
        ...item,
        optional: buildItem.optional,
      }
    }
    return armorItem
  }

  static toParams(item: ArmorItem): string {
    if (!item) return ''

    const validItem = armorItems.find((ri) => ri.id === item.id)
    if (!validItem) return ''

    if (item.optional) return `${item.id}${OPTIONAL_ITEM_SYMBOL}`
    return `${item.id}`
  }

  static fromParams(params: string): ArmorItem | null {
    const itemIds = params.split(',')
    if (!itemIds) return null

    const optional = itemIds[0].includes(OPTIONAL_ITEM_SYMBOL)
    const itemId = itemIds[0].replace(OPTIONAL_ITEM_SYMBOL, '')

    const item = armorItems.find((i) => i.id === itemId)
    if (!item) return null

    return optional ? { ...item, optional } : item
  }
}
