import { ItemTag, LinkedItems, ReleaseKey } from '.'

type ItemCategory =
  | 'helm'
  | 'torso'
  | 'legs'
  | 'gloves'
  | 'relic'
  | 'amulet'
  | 'weapon'
  | 'archetype'
  | 'concoction'
  | 'consumable'
  | 'mod'
  | 'mutator'
  | 'relicfragment'
  | 'ring'
  | 'skill'
  | 'trait'
  | 'perk'

export interface BaseItemProps {
  id: string
  name: string
  category: ItemCategory
  tags?: ItemTag[]
  dlc?: ReleaseKey
  imagePath: string
  saveFileSlug?: string
  description?: string
  cooldown?: number
  howToGet?: string
  wikiLinks?: string[]
  linkedItems?: LinkedItems
  health?: number
  healthPercent?: number
  healthCap?: number
  stamina?: number
  staminaPercent?: number
  armor?: number
  armorPercent?: number
  weight?: number
  weightPercent?: number
  weightThreshold?: number
  bleedResistance?: number
  bleedResistancePercent?: number
  fireResistance?: number
  fireResistancePercent?: number
  shockResistance?: number
  shockResistancePercent?: number
  blightResistance?: number
  blightResistancePercent?: number
  toxinResistance?: number
  toxinResistancePercent?: number
}

export class BaseItem implements BaseItemProps {
  public id: BaseItemProps['id'] = ''
  public name: BaseItemProps['name'] = ''
  public category: BaseItemProps['category'] = 'skill'
  public tags?: BaseItemProps['tags'] = []
  public dlc?: BaseItemProps['dlc'] = 'base'
  public description?: BaseItemProps['description'] = ''
  public cooldown?: BaseItemProps['cooldown'] = -1
  public imagePath: BaseItemProps['imagePath'] = ''
  public howToGet?: BaseItemProps['howToGet'] = ''
  public wikiLinks?: BaseItemProps['wikiLinks'] = []
  public linkedItems?: BaseItemProps['linkedItems'] = {}
  public saveFileSlug?: BaseItemProps['saveFileSlug'] = ''
  public health?: BaseItemProps['health'] = 0
  public healthPercent?: BaseItemProps['healthPercent'] = 0
  public healthCap?: BaseItemProps['healthCap'] = 1 // no cap
  public stamina?: BaseItemProps['stamina'] = 0
  public staminaPercent?: BaseItemProps['staminaPercent'] = 0
  public armor?: BaseItemProps['armor'] = 0
  public armorPercent?: BaseItemProps['armorPercent'] = 0
  public weight?: BaseItemProps['weight'] = 0
  public weightPercent?: BaseItemProps['weightPercent'] = 0
  public weightThreshold?: BaseItemProps['weightThreshold'] = 0
  public bleedResistance?: BaseItemProps['bleedResistance'] = 0
  public bleedResistancePercent?: BaseItemProps['bleedResistancePercent'] = 0
  public fireResistance?: BaseItemProps['fireResistance'] = 0
  public fireResistancePercent?: BaseItemProps['fireResistancePercent'] = 0
  public shockResistance?: BaseItemProps['shockResistance'] = 0
  public shockResistancePercent?: BaseItemProps['shockResistancePercent'] = 0
  public blightResistance?: BaseItemProps['blightResistance'] = 0
  public blightResistancePercent?: BaseItemProps['blightResistancePercent'] = 0
  public toxinResistance?: BaseItemProps['toxinResistance'] = 0
  public toxinResistancePercent?: BaseItemProps['toxinResistancePercent'] = 0

  constructor(props: BaseItemProps) {
    this.id = props.id
    this.name = props.name
    this.category = props.category
    this.dlc = props.dlc
    this.description = props.description
    this.cooldown = props.cooldown
    this.imagePath = props.imagePath
    this.howToGet = props.howToGet
    this.wikiLinks = props.wikiLinks
    this.linkedItems = props.linkedItems
    this.saveFileSlug = props.saveFileSlug
    this.health = props.health
    this.healthPercent = props.healthPercent
    this.healthCap = props.healthCap
    this.stamina = props.stamina
    this.staminaPercent = props.staminaPercent
    this.armor = props.armor
    this.armorPercent = props.armorPercent
    this.weight = props.weight
    this.weightPercent = props.weightPercent
    this.weightThreshold = props.weightThreshold
    this.bleedResistance = props.bleedResistance
    this.bleedResistancePercent = props.bleedResistancePercent
    this.fireResistance = props.fireResistance
    this.fireResistancePercent = props.fireResistancePercent
    this.shockResistance = props.shockResistance
    this.shockResistancePercent = props.shockResistancePercent
    this.blightResistance = props.blightResistance
    this.blightResistancePercent = props.blightResistancePercent
    this.toxinResistance = props.toxinResistance
    this.toxinResistancePercent = props.toxinResistancePercent
  }

  public static isBaseItem = (item?: BaseItem): item is BaseItem => {
    if (!item) return false
    return (
      item.category !== 'trait' &&
      item.category !== 'weapon' &&
      item.category !== 'helm' &&
      item.category !== 'torso' &&
      item.category !== 'legs' &&
      item.category !== 'gloves' &&
      item.category !== 'mutator' &&
      item.category !== 'mod' &&
      item.category !== 'perk'
    )
  }

  // static toParamsFromArray(items: Array<BaseItem | null>): string[] {
  //   return items.map((i) => `${i?.id ?? ''}`)
  // }

  // static toParamsFromSingle(item: BaseItem): string {
  //   if (!item) return ''
  //   const validItem = remnantItems.find((ri) => ri.id === item.id)
  //   if (!validItem) return ''

  //   return `${item.id}`
  // }

  // static fromDBValueSingle(
  //   buildItems: BuildItems[],
  //   category: ItemCategory,
  // ): BaseItem | null {
  //   if (!buildItems) return null

  //   let BaseItem: BaseItem | null = null
  //   for (const buildItem of buildItems) {
  //     const item = remnantItems.find((i) => i.id === buildItem.itemId)
  //     if (!item) continue
  //     if (item.category !== category) continue
  //     BaseItem = item
  //   }
  //   return BaseItem
  // }

  // static fromDBValueArray(
  //   buildItems: BuildItems[],
  //   category: ItemCategory,
  // ): Array<BaseItem | null> {
  //   if (!buildItems) return []

  //   let BaseItems: Array<BaseItem | null> = []
  //   for (const buildItem of buildItems) {
  //     const item = remnantItems.find((i) => i.id === buildItem.itemId)
  //     if (!item) continue
  //     if (item.category !== category) continue
  //     buildItem.index
  //       ? (BaseItems[buildItem.index] = item)
  //       : BaseItems.push(item)
  //   }
  //   return BaseItems
  // }

  // static fromParamsSingle(params: string): BaseItem | null {
  //   const itemIds = params.split(',')
  //   if (!itemIds) return null

  //   const item = remnantItems.find((i) => i.id === itemIds[0])
  //   if (!item) return null

  //   if (!this.isBaseItem(item)) return null
  //   return item
  // }

  // static fromParamsArray(params: string): BaseItem[] | null {
  //   const itemIds = params.split(',')
  //   if (!itemIds) return null

  //   const items: BaseItem[] = []
  //   itemIds.forEach((itemId, index) => {
  //     const item = remnantItems.find((i) => i.id === itemId)
  //     if (!item) return
  //     items[index] = item
  //   })

  //   if (items.length === 0) return null

  //   return items
  // }
}
