import { BuildItems } from '@prisma/client'

import { Item } from '../../../../features/items/types'
import { consumableItems } from '../consumable-items'
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
      const item = consumableItems.find((i) => i.id === itemId)
      if (!item) return
      items[index] = item
    })

    if (items.length === 0) return null

    return items
  }

  static fromDBValue(buildItems: BuildItems[]): Array<ConsumableItem | null> {
    if (!buildItems) return []

    let consumableValues: Array<ConsumableItem | null> = []
    for (const buildItem of buildItems) {
      const item = consumableItems.find((i) => i.id === buildItem.itemId)
      if (!item) continue
      if (item.category !== 'consumable') continue
      buildItem.index
        ? (consumableValues[buildItem.index] = item)
        : consumableValues.push(item)
    }
    return consumableValues
  }
}
