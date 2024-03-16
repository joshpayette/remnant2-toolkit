import { BuildItems } from '@prisma/client'

import { allItems } from '../data/allItems'
import { Item } from '.'
import { BaseItem } from './BaseItem'

interface BaseAmuletItem extends BaseItem {}

export class AmuletItem extends BaseItem implements BaseAmuletItem {
  public category: BaseAmuletItem['category'] = 'amulet'

  constructor(props: BaseAmuletItem) {
    super(props)
  }

  public static isAmuletItem = (item?: Item): item is AmuletItem => {
    if (!item) return false
    return item.category === 'amulet'
  }

  static toParams(item: AmuletItem): string {
    if (!item) return ''
    const validItem = allItems.find((ri) => ri.id === item.id)
    if (!validItem) return ''
    return `${item.id}`
  }

  static fromParams(params: string): AmuletItem | null {
    const itemIds = params.split(',')
    if (!itemIds) return null

    const item = allItems.find((i) => i.id === itemIds[0])
    if (!item) return null

    if (!this.isAmuletItem(item)) return null
    return item
  }

  static fromDBValue(buildItems: BuildItems[]): AmuletItem | null {
    if (!buildItems) return null

    let amuletItem: AmuletItem | null = null
    for (const buildItem of buildItems) {
      const item = allItems.find((i) => i.id === buildItem.itemId)
      if (!item) continue
      if (!AmuletItem.isAmuletItem(item)) continue
      amuletItem = item
    }
    return amuletItem
  }
}
