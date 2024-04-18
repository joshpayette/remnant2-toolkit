import { BuildItems } from '@prisma/client'

import { Item } from '../../../../features/items/types'
import { relicFragmentItems } from '../relicFragmentItems'
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
      const item = relicFragmentItems.find((i) => i.id === itemId)
      if (!item) return
      items[index] = item
    })

    if (items.length === 0) return null

    return items
  }

  static fromDBValue(
    buildItems: BuildItems[],
  ): Array<RelicFragmentItem | null> {
    if (!buildItems) return []

    let relicFragmentValues: Array<RelicFragmentItem | null> = []
    for (const buildItem of buildItems) {
      const item = relicFragmentItems.find((i) => i.id === buildItem.itemId)
      if (!item) continue
      buildItem.index
        ? (relicFragmentValues[buildItem.index] = item)
        : relicFragmentValues.push(item)
    }
    return relicFragmentValues
  }
}
