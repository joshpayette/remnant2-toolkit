import { BuildItems } from '@repo/db'

import { amuletItems } from '@/app/(data)/items/amulet-items'
import { OPTIONAL_ITEM_SYMBOL } from '@/app/(data)/items/constants'
import { Item } from '@/app/(data)/items/types'

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
    const validItem = amuletItems.find((ri) => ri.id === item.id)
    if (!validItem) return ''

    if (item.optional) return `${item.id}${OPTIONAL_ITEM_SYMBOL}`
    return `${item.id}`
  }

  static fromParams(params: string): AmuletItem | null {
    const itemIds = params.split(',')
    if (!itemIds || !itemIds[0]) return null

    const optional = itemIds[0].includes(OPTIONAL_ITEM_SYMBOL)
    const itemId = itemIds[0].replace(OPTIONAL_ITEM_SYMBOL, '')

    const item = amuletItems.find((i) => i.id === itemId)
    if (!item) return null

    return optional ? { ...item, optional } : item
  }

  static fromDBValue(buildItems: BuildItems[]): AmuletItem | null {
    if (!buildItems) return null

    let amuletItem: AmuletItem | null = null
    for (const buildItem of buildItems) {
      const item = amuletItems.find((i) => i.id === buildItem.itemId)
      if (!item) continue
      amuletItem = {
        ...item,
        optional: buildItem.optional,
      }
    }
    return amuletItem
  }
}
