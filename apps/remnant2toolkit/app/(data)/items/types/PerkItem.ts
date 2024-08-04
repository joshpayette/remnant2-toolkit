import { BuildItems } from '@repo/db'

import { OPTIONAL_ITEM_SYMBOL } from '@/app/(data)/items/constants'
import { perkItems } from '@/app/(data)/items/perk-items'
import { Item } from '@/app/(data)/items/types'
import { BaseItem } from '@/app/(data)/items/types/BaseItem'

interface BasePerkItem extends BaseItem {
  type: 'prime' | 'damage' | 'team' | 'utility' | 'relic'
}

export class PerkItem extends BaseItem implements BasePerkItem {
  public category: BasePerkItem['category'] = 'perk'
  public type: BasePerkItem['type'] = 'prime'

  constructor(props: BasePerkItem) {
    super(props)
    this.type = props.type
  }

  public static isPerkItem = (item?: Item): item is PerkItem => {
    if (!item) return false
    return item.category === 'perk'
  }

  static toParams(items: Array<PerkItem | null>): string[] {
    return items.map((i) => {
      if (!i || !i.id) return ''
      return i.optional ? `${i.id}${OPTIONAL_ITEM_SYMBOL}` : i.id
    })
  }

  static fromParams(params: string): PerkItem[] | null {
    const itemIds = params.split(',')
    if (!itemIds) return null

    const items: PerkItem[] = []
    itemIds.forEach((itemId, index) => {
      const optional = itemId.includes(OPTIONAL_ITEM_SYMBOL)
      itemId = itemId.replace(OPTIONAL_ITEM_SYMBOL, '')

      const item = perkItems.find((i) => i.id === itemId)
      if (!item) return
      items[index] = optional ? { ...item, optional } : item
    })

    if (items.length === 0) return null

    return items
  }

  static fromDBValue(buildItems: BuildItems[]): Array<PerkItem | null> {
    if (!buildItems) return []

    const perkValues: Array<PerkItem | null> = []
    for (const buildItem of buildItems) {
      const item = perkItems.find((i) => i.id === buildItem.itemId)
      if (!item) continue
      if (item.category !== 'perk') continue
      buildItem.index
        ? (perkValues[buildItem.index] = {
            ...item,
            optional: buildItem.optional,
          })
        : perkValues.push({
            ...item,
            optional: buildItem.optional,
          })
    }
    return perkValues
  }
}
