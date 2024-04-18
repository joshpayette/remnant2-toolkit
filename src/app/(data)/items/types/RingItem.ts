import { BuildItems } from '@prisma/client'

import { Item } from '../../../../features/items/types'
import { ringItems } from '../ringItems'
import { BaseItem } from './BaseItem'

interface BaseRingItem extends BaseItem {}

export class RingItem extends BaseItem implements BaseRingItem {
  public category: BaseRingItem['category'] = 'ring'

  constructor(props: BaseRingItem) {
    super(props)
  }

  public static isRingItem = (item?: Item): item is RingItem => {
    if (!item) return false
    return item.category === 'ring'
  }

  static toParams(items: Array<RingItem | null>): string[] {
    return items.map((i) => `${i?.id ?? ''}`)
  }

  static fromParams(params: string): RingItem[] | null {
    const itemIds = params.split(',')
    if (!itemIds) return null

    const items: RingItem[] = []
    itemIds.forEach((itemId, index) => {
      const item = ringItems.find((i) => i.id === itemId)
      if (!item) return
      items[index] = item
    })

    if (items.length === 0) return null

    return items
  }

  static fromDBValue(buildItems: BuildItems[]): Array<RingItem | null> {
    if (!buildItems) return []

    let ringValues: Array<RingItem | null> = []
    for (const buildItem of buildItems) {
      const item = ringItems.find((i) => i.id === buildItem.itemId)
      if (!item) continue
      buildItem.index
        ? (ringValues[buildItem.index] = item)
        : ringValues.push(item)
    }
    return ringValues
  }
}
