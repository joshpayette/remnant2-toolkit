import { BuildItems } from '@prisma/client'

import { Item } from '../../../../features/items/types'
import { archetypeItems } from '../archetype-items'
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
      const item = archetypeItems.find((i) => i.id === itemId)
      if (!item) return
      items[index] = item
    })

    if (items.length === 0) return null

    return items
  }

  static fromDBValue(buildItems: BuildItems[]): Array<ArchetypeItem | null> {
    if (!buildItems) return []

    let archetypeValues: Array<ArchetypeItem | null> = []
    for (const buildItem of buildItems) {
      const item = archetypeItems.find((i) => i.id === buildItem.itemId)
      if (!item) continue
      if (item.category !== 'archetype') continue
      buildItem.index
        ? (archetypeValues[buildItem.index] = item)
        : archetypeValues.push(item)
    }
    return archetypeValues
  }
}
