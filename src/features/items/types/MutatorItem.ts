import { BuildItems } from '@prisma/client'
import { remnantItems } from '../data/remnantItems'
import { GenericItem } from './GenericItem'

export interface BaseMutatorItem extends GenericItem {
  maxLevelBonus: string
  type: 'gun' | 'melee'
}

export class MutatorItem extends GenericItem implements BaseMutatorItem {
  public category: BaseMutatorItem['category'] = 'mutator'
  public type: BaseMutatorItem['type'] = 'gun'
  public maxLevelBonus: BaseMutatorItem['maxLevelBonus'] = ''

  constructor(props: BaseMutatorItem) {
    super(props)
    this.type = props.type
    this.maxLevelBonus = props.maxLevelBonus
  }

  public static isMutatorItem = (item?: GenericItem): item is MutatorItem => {
    if (!item) return false
    return item.category === 'mutator'
  }

  static toParams(items: Array<MutatorItem | null>): string[] {
    return items.map((i) => `${i?.id ?? ''}`)
  }

  static fromParams(params: string): MutatorItem[] | null {
    const itemIds = params.split(',')
    if (!itemIds) return null

    const items: MutatorItem[] = []
    itemIds.forEach((itemId, index) => {
      const item = remnantItems.find((i) => i.id === itemId)
      if (!item) return
      if (!this.isMutatorItem(item)) return
      items[index] = item
    })

    if (items.length === 0) return null
    if (items.filter((i) => !this.isMutatorItem(i)).length > 0) return null

    return items
  }

  static fromDBValue(buildItems: BuildItems[]): Array<MutatorItem | null> {
    if (!buildItems) return []

    let mutatorItems: Array<MutatorItem | null> = []
    for (const buildItem of buildItems) {
      const item = remnantItems.find((i) => i.id === buildItem.itemId)
      if (!item) continue
      if (item.category !== 'mutator') continue
      if (!this.isMutatorItem(item)) continue
      buildItem.index
        ? (mutatorItems[buildItem.index] = item)
        : mutatorItems.push(item)
    }
    return mutatorItems
  }
}
