import { BuildItems } from '@repo/db'

import { OPTIONAL_ITEM_SYMBOL } from '@/app/(data)/items/constants'
import { Item } from '@/app/(data)/items/types'

import { skillItems } from '../skill-items'
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
    return items.map((i) => {
      if (!i || !i.id) return ''
      return i.optional ? `${i.id}${OPTIONAL_ITEM_SYMBOL}` : i.id
    })
  }

  static fromParams(params: string): SkillItem[] | null {
    const itemIds = params.split(',')
    if (!itemIds) return null

    const items: SkillItem[] = []
    itemIds.forEach((itemId, index) => {
      const optional = itemId.includes(OPTIONAL_ITEM_SYMBOL)
      itemId = itemId.replace(OPTIONAL_ITEM_SYMBOL, '')

      const item = skillItems.find((i) => i.id === itemId)
      if (!item) return
      items[index] = optional ? { ...item, optional } : item
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
        ? (skillValues[buildItem.index] = {
            ...item,
            optional: buildItem.optional,
          })
        : skillValues.push({
            ...item,
            optional: buildItem.optional,
          })
    }
    return skillValues
  }
}
