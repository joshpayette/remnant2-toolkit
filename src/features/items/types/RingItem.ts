import { BuildItems } from '@prisma/client'

import { remnantItems } from '../data/remnantItems'
import { Item } from '.'
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
      const item = remnantItems.find((i) => i.id === itemId)
      if (!item) return
      if (!this.isRingItem(item)) return
      items[index] = item
    })

    if (items.length === 0) return null
    if (items.filter((i) => !this.isRingItem(i)).length > 0) return null

    return items
  }

  static fromDBValue(buildItems: BuildItems[]): Array<RingItem | null> {
    if (!buildItems) return []

    let ringItems: Array<RingItem | null> = []
    for (const buildItem of buildItems) {
      const item = remnantItems.find((i) => i.id === buildItem.itemId)
      if (!item) continue
      if (item.category !== 'ring') continue
      if (!this.isRingItem(item)) continue
      buildItem.index
        ? (ringItems[buildItem.index] = item)
        : ringItems.push(item)
    }
    return ringItems
  }
}
