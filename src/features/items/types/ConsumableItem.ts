import { BuildItems } from '@prisma/client'

import { remnantItems } from '../data/remnantItems'
import { Item } from '.'
import { BaseItem } from './BaseItem'

interface BaseConsumableItem extends BaseItem {}

export class ConsumableItem extends BaseItem implements BaseConsumableItem {
  public category: BaseConsumableItem['category'] = 'consumable'

  constructor(props: BaseConsumableItem) {
    super(props)
  }

  public static isConsumableItem = (item?: Item): item is ConsumableItem => {
    if (!item) return false
    return item.category === 'consumable'
  }

  static toParams(items: Array<ConsumableItem | null>): string[] {
    return items.map((i) => `${i?.id ?? ''}`)
  }

  static fromParams(params: string): ConsumableItem[] | null {
    const itemIds = params.split(',')
    if (!itemIds) return null

    const items: ConsumableItem[] = []
    itemIds.forEach((itemId, index) => {
      const item = remnantItems.find((i) => i.id === itemId)
      if (!item) return
      if (!this.isConsumableItem(item)) return
      items[index] = item
    })

    if (items.length === 0) return null
    if (items.filter((i) => !this.isConsumableItem(i)).length > 0) return null

    return items
  }

  static fromDBValue(buildItems: BuildItems[]): Array<ConsumableItem | null> {
    if (!buildItems) return []

    let consumableItems: Array<ConsumableItem | null> = []
    for (const buildItem of buildItems) {
      const item = remnantItems.find((i) => i.id === buildItem.itemId)
      if (!item) continue
      if (item.category !== 'consumable') continue
      if (!this.isConsumableItem(item)) continue
      buildItem.index
        ? (consumableItems[buildItem.index] = item)
        : consumableItems.push(item)
    }
    return consumableItems
  }
}
