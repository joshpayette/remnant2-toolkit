import { BuildItems } from '@prisma/client'

import { allItems } from '../data/allItems'
import { Item } from '.'
import { BaseItem } from './BaseItem'

interface BaseArchetypeItem extends BaseItem {}

export class ArchetypeItem extends BaseItem implements BaseArchetypeItem {
  public category: BaseArchetypeItem['category'] = 'archetype'

  constructor(props: BaseArchetypeItem) {
    super(props)
  }

  public static isArchetypeItem = (item?: Item): item is ArchetypeItem => {
    if (!item) return false
    return item.category === 'archetype'
  }

  static toParams(items: Array<ArchetypeItem | null>): string[] {
    return items.map((i) => `${i?.id ?? ''}`)
  }

  static fromParams(params: string): ArchetypeItem[] | null {
    const itemIds = params.split(',')
    if (!itemIds) return null

    const items: ArchetypeItem[] = []
    itemIds.forEach((itemId, index) => {
      const item = allItems.find((i) => i.id === itemId)
      if (!item) return
      if (!this.isArchetypeItem(item)) return
      items[index] = item
    })

    if (items.length === 0) return null
    if (items.filter((i) => !this.isArchetypeItem(i)).length > 0) return null

    return items
  }

  static fromDBValue(buildItems: BuildItems[]): Array<ArchetypeItem | null> {
    if (!buildItems) return []

    let archetypeItems: Array<ArchetypeItem | null> = []
    for (const buildItem of buildItems) {
      const item = allItems.find((i) => i.id === buildItem.itemId)
      if (!item) continue
      if (item.category !== 'archetype') continue
      if (!this.isArchetypeItem(item)) continue
      buildItem.index
        ? (archetypeItems[buildItem.index] = item)
        : archetypeItems.push(item)
    }
    return archetypeItems
  }
}
