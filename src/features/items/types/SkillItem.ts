import { BuildItems } from '@prisma/client'

import { allItems } from '../data/allItems'
import { Item } from '.'
import { BaseItem } from './BaseItem'

interface BaseSkillItem extends BaseItem {}

export class SkillItem extends BaseItem implements BaseSkillItem {
  public category: BaseSkillItem['category'] = 'skill'

  constructor(props: BaseSkillItem) {
    super(props)
  }

  public static isSkillItem = (item?: Item): item is SkillItem => {
    if (!item) return false
    return item.category === 'skill'
  }

  static toParams(items: Array<SkillItem | null>): string[] {
    return items.map((i) => `${i?.id ?? ''}`)
  }

  static fromParams(params: string): SkillItem[] | null {
    const itemIds = params.split(',')
    if (!itemIds) return null

    const items: SkillItem[] = []
    itemIds.forEach((itemId, index) => {
      const item = allItems.find((i) => i.id === itemId)
      if (!item) return
      if (!this.isSkillItem(item)) return
      items[index] = item
    })

    if (items.length === 0) return null
    if (items.filter((i) => !this.isSkillItem(i)).length > 0) return null

    return items
  }

  static fromDBValue(buildItems: BuildItems[]): Array<SkillItem | null> {
    if (!buildItems) return []

    let skillItems: Array<SkillItem | null> = []
    for (const buildItem of buildItems) {
      const item = allItems.find((i) => i.id === buildItem.itemId)
      if (!item) continue
      if (item.category !== 'skill') continue
      if (!this.isSkillItem(item)) continue
      buildItem.index
        ? (skillItems[buildItem.index] = item)
        : skillItems.push(item)
    }
    return skillItems
  }
}
