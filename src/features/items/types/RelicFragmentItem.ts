import { BuildItems } from '@prisma/client'

import { allItems } from '../data/allItems'
import { Item } from '.'
import { BaseItem } from './BaseItem'

interface BaseRelicFragmentItem extends BaseItem {}

export class RelicFragmentItem
  extends BaseItem
  implements BaseRelicFragmentItem
{
  public category: BaseRelicFragmentItem['category'] = 'relicfragment'

  constructor(props: BaseRelicFragmentItem) {
    super(props)
  }

  public static isRelicFragmentItem = (
    item?: Item,
  ): item is RelicFragmentItem => {
    if (!item) return false
    return item.category === 'relicfragment'
  }

  static toParams(items: Array<RelicFragmentItem | null>): string[] {
    return items.map((i) => `${i?.id ?? ''}`)
  }

  static fromParams(params: string): RelicFragmentItem[] | null {
    const itemIds = params.split(',')
    if (!itemIds) return null

    const items: RelicFragmentItem[] = []
    itemIds.forEach((itemId, index) => {
      const item = allItems.find((i) => i.id === itemId)
      if (!item) return
      if (!this.isRelicFragmentItem(item)) return
      items[index] = item
    })

    if (items.length === 0) return null
    if (items.filter((i) => !this.isRelicFragmentItem(i)).length > 0)
      return null

    return items
  }

  static fromDBValue(
    buildItems: BuildItems[],
  ): Array<RelicFragmentItem | null> {
    if (!buildItems) return []

    let relicFragmentItems: Array<RelicFragmentItem | null> = []
    for (const buildItem of buildItems) {
      const item = allItems.find((i) => i.id === buildItem.itemId)
      if (!item) continue
      if (item.category !== 'relicfragment') continue
      if (!this.isRelicFragmentItem(item)) continue
      buildItem.index
        ? (relicFragmentItems[buildItem.index] = item)
        : relicFragmentItems.push(item)
    }
    return relicFragmentItems
  }
}
