import { remnantItems } from '../../(data)'

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

export interface GenericItemProps {
  id: string
  name: string
  category: ItemCategory
  imagePath: string
  saveFileSlug?: string
  description?: string
  howToGet?: string
  wikiLinks?: string[]
  linkedItems?: LinkedItems
}

export class GenericItem implements GenericItemProps {
  public id: GenericItemProps['id'] = ''
  public name: GenericItemProps['name'] = ''
  public category: GenericItemProps['category'] = 'skill'
  public description?: GenericItemProps['description'] = ''
  public imagePath: GenericItemProps['imagePath'] = ''
  public howToGet?: GenericItemProps['howToGet'] = ''
  public wikiLinks?: GenericItemProps['wikiLinks'] = []
  public linkedItems?: GenericItemProps['linkedItems'] = {}
  public saveFileSlug?: GenericItemProps['saveFileSlug'] = ''

  constructor(props: GenericItemProps) {
    this.id = props.id
    this.name = props.name
    this.category = props.category
    this.description = props.description
    this.imagePath = props.imagePath
    this.howToGet = props.howToGet
    this.wikiLinks = props.wikiLinks
    this.linkedItems = props.linkedItems
    this.saveFileSlug = props.saveFileSlug
  }

  public static isGenericItem = (item?: GenericItem): item is GenericItem => {
    if (!item) return false
    return (
      item.category !== 'skill' &&
      item.category !== 'trait' &&
      item.category !== 'weapon' &&
      item.category !== 'helm' &&
      item.category !== 'torso' &&
      item.category !== 'legs' &&
      item.category !== 'gloves' &&
      item.category !== 'mutator'
    )
  }

  static toParamsFromArray(items: GenericItem[]): string[] {
    return items.map((i) => `${i?.id ?? ''}`)
  }

  static toParamsFromSingle(item: GenericItem): string {
    if (!item) return ''
    const validItem = remnantItems.find((ri) => ri.id === item.id)
    if (!validItem) return ''

    return `${item.id}`
  }

  static toDBValue(itemOrItems: GenericItem | GenericItem[]): string {
    if (Array.isArray(itemOrItems)) {
      return this.toParamsFromArray(itemOrItems).join(',')
    } else {
      return this.toParamsFromSingle(itemOrItems)
    }
  }

  static fromDBValueSingle(params: string): GenericItem | null {
    return this.fromParamsSingle(params)
  }

  static fromDBValueArray(value: string): GenericItem[] {
    return this.fromParamsArray(value) ?? []
  }

  static fromParamsSingle(params: string): GenericItem | null {
    const itemIds = params.split(',')
    if (!itemIds) return null

    const item = remnantItems.find((i) => i.id === itemIds[0])
    if (!item) return null

    if (!this.isGenericItem(item)) return null
    return item
  }

  static fromParamsArray(params: string): GenericItem[] | null {
    const itemIds = params.split(',')
    if (!itemIds) return null

    const items: GenericItem[] = []
    itemIds.forEach((itemId, index) => {
      const item = remnantItems.find((i) => i.id === itemId)
      if (!item) return
      items[index] = item
    })

    if (items.length === 0) return null

    return items
  }
}
