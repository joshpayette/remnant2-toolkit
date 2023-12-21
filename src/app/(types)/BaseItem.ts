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

  abstract toParams(items: any[]): string[]

  abstract fromParams(params: string): any[]
}
