import { BuildItems } from '@prisma/client'

import { relicItems } from '../relicItems'
import { BaseItem } from './BaseItem'

interface BaseRelicItem extends BaseItem {}

export class RelicItem extends BaseItem implements BaseRelicItem {
  public category: BaseRelicItem['category'] = 'relic'

  constructor(props: BaseRelicItem) {
    super(props)
  }

  public static isRelicItem = (item?: BaseItem): item is RelicItem => {
    if (!item) return false
    return item.category === 'relic'
  }

  static toParams(item: RelicItem): string {
    if (!item) return ''
    const validItem = relicItems.find((ri) => ri.id === item.id)
    if (!validItem) return ''
    return `${item.id}`
  }

  static fromParams(params: string): RelicItem | null {
    const itemIds = params.split(',')
    if (!itemIds) return null

    const item = relicItems.find((i) => i.id === itemIds[0])
    if (!item) return null

    return item
  }

  static fromDBValue(buildItems: BuildItems[]): RelicItem | null {
    if (!buildItems) return null

    let relicValues: RelicItem | null = null
    for (const buildItem of buildItems) {
      const item = relicItems.find((i) => i.id === buildItem.itemId)
      if (!item) continue
      relicValues = item
    }
    return relicValues
  }
}
