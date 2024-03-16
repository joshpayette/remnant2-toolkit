import { BuildItems } from '@prisma/client'

import { concoctionItems } from '../data/concoctionItems'
import { Item } from '.'
import { BaseItem } from './BaseItem'

interface BaseConcoctionItem extends BaseItem {}

export class ConcoctionItem extends BaseItem implements BaseConcoctionItem {
  public category: BaseConcoctionItem['category'] = 'concoction'

  constructor(props: BaseConcoctionItem) {
    super(props)
  }

  public static isConcoctionItem = (item?: Item): item is ConcoctionItem => {
    if (!item) return false
    return item.category === 'concoction'
  }

  static toParams(items: Array<ConcoctionItem | null>): string[] {
    return items.map((i) => `${i?.id ?? ''}`)
  }

  static fromParams(params: string): ConcoctionItem[] | null {
    const itemIds = params.split(',')
    if (!itemIds) return null

    const items: ConcoctionItem[] = []
    itemIds.forEach((itemId, index) => {
      const item = concoctionItems.find((i) => i.id === itemId)
      if (!item) return
      items[index] = item
    })

    if (items.length === 0) return null

    return items
  }

  static fromDBValue(buildItems: BuildItems[]): Array<ConcoctionItem | null> {
    if (!buildItems) return []

    let concoctionValues: Array<ConcoctionItem | null> = []
    for (const buildItem of buildItems) {
      const item = concoctionItems.find((i) => i.id === buildItem.itemId)
      if (!item) continue
      if (item.category !== 'concoction') continue
      buildItem.index
        ? (concoctionValues[buildItem.index] = item)
        : concoctionValues.push(item)
    }

    return concoctionValues
  }
}
