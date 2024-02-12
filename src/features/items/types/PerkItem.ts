import { BuildItems } from '@prisma/client'

import { remnantItems } from '../data/remnantItems'
import { Item } from '.'
import { BaseItem } from './BaseItem'

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
    return items.map((i) => `${i?.id ?? ''}`)
  }

  static fromParams(params: string): PerkItem[] | null {
    const itemIds = params.split(',')
    if (!itemIds) return null

    const items: PerkItem[] = []
    itemIds.forEach((itemId, index) => {
      const item = remnantItems.find((i) => i.id === itemId)
      if (!item) return
      if (!this.isPerkItem(item)) return
      items[index] = item
    })

    if (items.length === 0) return null
    if (items.filter((i) => !this.isPerkItem(i)).length > 0) return null

    return items
  }

  static fromDBValue(buildItems: BuildItems[]): Array<PerkItem | null> {
    if (!buildItems) return []

    let perkItems: Array<PerkItem | null> = []
    for (const buildItem of buildItems) {
      const item = remnantItems.find((i) => i.id === buildItem.itemId)
      if (!item) continue
      if (item.category !== 'perk') continue
      if (!this.isPerkItem(item)) continue
      buildItem.index
        ? (perkItems[buildItem.index] = item)
        : perkItems.push(item)
    }
    return perkItems
  }
}
