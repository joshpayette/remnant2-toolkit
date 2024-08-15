import { BuildItems } from '@repo/db'

import { OPTIONAL_ITEM_SYMBOL } from '@/app/(data)/items/constants'
import { relicItems } from '@/app/(data)/items/relic-items'
import { BaseItem } from '@/app/(data)/items/types/BaseItem'

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

    if (item.optional) return `${item.id}${OPTIONAL_ITEM_SYMBOL}`
    return `${item.id}`
  }

  static fromParams(params: string): RelicItem | null {
    const itemIds = params.split(',')
    if (!itemIds || !itemIds[0]) return null

    const optional = itemIds[0].includes(OPTIONAL_ITEM_SYMBOL)
    const itemId = itemIds[0].replace(OPTIONAL_ITEM_SYMBOL, '')

    const item = relicItems.find((i) => i.id === itemId)
    if (!item) return null

    return optional ? { ...item, optional } : item
  }

  static fromDBValue(
    buildItems: Array<BuildItems & { isOwned?: boolean }>,
  ): (RelicItem & { isOwned?: boolean }) | null {
    if (!buildItems) return null

    let relicValues: (RelicItem & { isOwned?: boolean }) | null = null
    for (const buildItem of buildItems) {
      const item = relicItems.find((i) => i.id === buildItem.itemId)
      if (!item) continue
      relicValues = {
        ...item,
        optional: buildItem.optional,
        isOwned: buildItem.isOwned,
      }
    }
    return relicValues
  }
}
