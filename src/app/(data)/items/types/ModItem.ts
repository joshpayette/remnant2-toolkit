import { BuildItems } from '@prisma/client'

import { Item } from '../../../../features/items/types'
import { modItems } from '../modItems'
import { BaseItem } from './BaseItem'

interface BaseModItem extends BaseItem {}

export class ModItem extends BaseItem implements BaseModItem {
  public category: BaseModItem['category'] = 'mod'

  constructor(props: BaseModItem) {
    super(props)
  }

  public static isModItem = (item?: Item): item is ModItem => {
    if (!item) return false
    return item.category === 'mod'
  }

  static toParams(items: Array<ModItem | null>): string[] {
    return items.map((i) => `${i?.id ?? ''}`)
  }

  static fromParams(params: string): ModItem[] | null {
    const itemIds = params.split(',')
    if (!itemIds) return null

    const items: ModItem[] = []
    itemIds.forEach((itemId, index) => {
      const item = modItems.find((i) => i.id === itemId)
      if (!item) return
      items[index] = item
    })

    if (items.length === 0) return null

    return items
  }

  static fromDBValue(buildItems: BuildItems[]): Array<ModItem | null> {
    if (!buildItems) return []

    let modValues: Array<ModItem | null> = []
    for (const buildItem of buildItems) {
      const item = modItems.find((i) => i.id === buildItem.itemId)
      if (!item) continue
      buildItem.index
        ? (modValues[buildItem.index] = item)
        : modValues.push(item)
    }
    return modValues
  }
}
