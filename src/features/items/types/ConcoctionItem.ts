import { BuildItems } from '@prisma/client'

import { allItems } from '../data/allItems'
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
      const item = allItems.find((i) => i.id === itemId)
      if (!item) return
      if (!this.isConcoctionItem(item)) return
      items[index] = item
    })

    if (items.length === 0) return null
    if (items.filter((i) => !this.isConcoctionItem(i)).length > 0) return null

    return items
  }

  static fromDBValue(buildItems: BuildItems[]): Array<ConcoctionItem | null> {
    if (!buildItems) return []

    let concoctionItems: Array<ConcoctionItem | null> = []
    for (const buildItem of buildItems) {
      const item = allItems.find((i) => i.id === buildItem.itemId)
      if (!item) continue
      if (item.category !== 'concoction') continue
      if (!this.isConcoctionItem(item)) continue
      buildItem.index
        ? (concoctionItems[buildItem.index] = item)
        : concoctionItems.push(item)
    }

    return concoctionItems
  }
}
