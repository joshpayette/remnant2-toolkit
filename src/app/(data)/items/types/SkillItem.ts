import { BuildItems } from '@prisma/client'

import { Item } from '../../../../features/items/types'
import { skillItems } from '../skillItems'
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
      const item = skillItems.find((i) => i.id === itemId)
      if (!item) return
      items[index] = item
    })

    if (items.length === 0) return null

    return items
  }

  static fromDBValue(buildItems: BuildItems[]): Array<SkillItem | null> {
    if (!buildItems) return []

    let skillValues: Array<SkillItem | null> = []
    for (const buildItem of buildItems) {
      const item = skillItems.find((i) => i.id === buildItem.itemId)
      if (!item) continue
      buildItem.index
        ? (skillValues[buildItem.index] = item)
        : skillValues.push(item)
    }
    return skillValues
  }
}
