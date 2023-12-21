import { remnantItems } from '../(data)'

/**
 * Used to link items, such as guns to their mods,
 * archtypes to skills, etc.
 */
type LinkedItems = Partial<{
  archtype: { name: string }
  skills: Array<{ name: string }>
  weapon: { name: string }
  mod: { name: string }
  trait: { name: string }
}>

type ItemCategory =
  | 'helm'
  | 'torso'
  | 'legs'
  | 'gloves'
  | 'relic'
  | 'amulet'
  | 'weapon'
  | 'archtype'
  | 'concoction'
  | 'consumable'
  | 'mod'
  | 'mutator'
  | 'relicfragment'
  | 'ring'
  | 'skill'
  | 'trait'

export abstract class BaseItem {
  abstract id: string
  abstract name: string
  abstract category: ItemCategory
  abstract saveFileSlug?: string
  abstract description?: string
  abstract howToGet?: string
  abstract wikiLinks?: string[]
  abstract imagePath?: string
  abstract linkedItems?: LinkedItems

  public static isBaseItem = (item: BaseItem): item is BaseItem =>
    item.category !== 'skill' &&
    item.category !== 'trait' &&
    item.category !== 'weapon' &&
    item.category !== 'helm' &&
    item.category !== 'torso' &&
    item.category !== 'legs' &&
    item.category !== 'gloves' &&
    item.category !== 'mutator'

  static toParams(items: BaseItem[]): string[] {
    return items.map((i) => `${i.id}`)
  }

  static fromParamsSingle<T extends BaseItem>(params: string): T | null {
    const itemIds = params.split(',')
    if (!itemIds) return null

    const item = remnantItems.find((i) => i.id === itemIds[0])
    if (!item) return null

    return item as T
  }

  static fromParamsArray<T extends BaseItem>(params: string): T[] | null {
    const itemIds = params.split(',')
    if (!itemIds) return null

    const items: BaseItem[] = []
    itemIds.forEach((itemId) => {
      const item = remnantItems.find((i) => i.id === itemId)
      if (!item) return
      items.push(item)
    })

    if (items.length === 0) return null
    return items as T[]
  }
}
