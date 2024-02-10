import { BuildItems } from '@prisma/client'
import { remnantItems } from '../data/remnantItems'
import { ReleaseKey } from '.'

/**
 * Used to link items, such as guns to their mods,
 * archtypes to skills, etc.
 */
export type LinkedItems = Partial<{
  archetype: { name: string }
  skills: Array<{ name: string }>
  weapon: { name: string }
  mod: { name: string }
  traits: Array<{ name: string; amount: number }>
  perks: Array<{ name: string }>
}>

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

export type ItemTag =
  | 'All Damage'
  | 'Charged Melee Damage'
  | 'Charged Melee'
  | 'Charged Shot'
  | 'Concoction'
  | 'Critical Chance'
  | 'Critical Hit'
  | 'Damage Reduction'
  | 'Elemental Damage'
  | 'Encumbrance'
  | 'Firearm Swap Speed'
  | 'Grey Health'
  | 'Hardcore'
  | 'Heal'
  | 'Healing Effectivness'
  | 'Health'
  | 'Heat Generation'
  | 'Lifesteal'
  | 'Magazine Capacity'
  | 'Melee Attack Speed'
  | 'Melee Charge Speed'
  | 'Melee Critical Chance'
  | 'Melee Critical Hit'
  | 'Melee Damage'
  | 'Melee Special Ability'
  | 'Melee Speed'
  | 'Mod Cast Speed'
  | 'Mod Cooldown'
  | 'Mod Cost'
  | 'Mod Damage'
  | 'Mod Duration'
  | 'Mod Power'
  | 'Movement Speed'
  | 'Neutral Backdash'
  | 'Neutral Dodge'
  | 'Perfect Dodge'
  | 'Perfect Neutral Evade'
  | 'Projectile Speed'
  | 'Range'
  | 'Ranged Damage'
  | 'Rate of Fire'
  | 'Recoil'
  | 'Reduce Skill Cooldown'
  | 'Relic Use Speed'
  | 'Reload Speed'
  | 'Skill Cast Speed'
  | 'Skill Damage'
  | 'Skill Duration'
  | 'Spread'
  | 'Stagger'
  | 'Stamina'
  | 'Status Duration'
  | 'Status Effect'
  | 'Summon'
  | 'Weakspot Critical Chance'
  | 'Weakspot Damage'
  | 'Weakspot Hit'
  | 'Weapon Damage'

export interface GenericItemProps {
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

export class GenericItem implements GenericItemProps {
  public id: GenericItemProps['id'] = ''
  public name: GenericItemProps['name'] = ''
  public category: GenericItemProps['category'] = 'skill'
  public tags?: GenericItemProps['tags'] = []
  public dlc?: GenericItemProps['dlc'] = 'base'
  public description?: GenericItemProps['description'] = ''
  public cooldown?: GenericItemProps['cooldown'] = -1
  public imagePath: GenericItemProps['imagePath'] = ''
  public howToGet?: GenericItemProps['howToGet'] = ''
  public wikiLinks?: GenericItemProps['wikiLinks'] = []
  public linkedItems?: GenericItemProps['linkedItems'] = {}
  public saveFileSlug?: GenericItemProps['saveFileSlug'] = ''
  public health?: GenericItemProps['health'] = 0
  public healthPercent?: GenericItemProps['healthPercent'] = 0
  public healthCap?: GenericItemProps['healthCap'] = 1 // no cap
  public stamina?: GenericItemProps['stamina'] = 0
  public staminaPercent?: GenericItemProps['staminaPercent'] = 0
  public armor?: GenericItemProps['armor'] = 0
  public armorPercent?: GenericItemProps['armorPercent'] = 0
  public weight?: GenericItemProps['weight'] = 0
  public weightPercent?: GenericItemProps['weightPercent'] = 0
  public weightThreshold?: GenericItemProps['weightThreshold'] = 0
  public bleedResistance?: GenericItemProps['bleedResistance'] = 0
  public bleedResistancePercent?: GenericItemProps['bleedResistancePercent'] = 0
  public fireResistance?: GenericItemProps['fireResistance'] = 0
  public fireResistancePercent?: GenericItemProps['fireResistancePercent'] = 0
  public shockResistance?: GenericItemProps['shockResistance'] = 0
  public shockResistancePercent?: GenericItemProps['shockResistancePercent'] = 0
  public blightResistance?: GenericItemProps['blightResistance'] = 0
  public blightResistancePercent?: GenericItemProps['blightResistancePercent'] = 0
  public toxinResistance?: GenericItemProps['toxinResistance'] = 0
  public toxinResistancePercent?: GenericItemProps['toxinResistancePercent'] = 0

  constructor(props: GenericItemProps) {
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

  public static isGenericItem = (item?: GenericItem): item is GenericItem => {
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

  static toParamsFromArray(items: Array<GenericItem | null>): string[] {
    return items.map((i) => `${i?.id ?? ''}`)
  }

  static toParamsFromSingle(item: GenericItem): string {
    if (!item) return ''
    const validItem = remnantItems.find((ri) => ri.id === item.id)
    if (!validItem) return ''

    return `${item.id}`
  }

  static fromDBValueSingle(
    buildItems: BuildItems[],
    category: ItemCategory,
  ): GenericItem | null {
    if (!buildItems) return null

    let genericItem: GenericItem | null = null
    for (const buildItem of buildItems) {
      const item = remnantItems.find((i) => i.id === buildItem.itemId)
      if (!item) continue
      if (item.category !== category) continue
      genericItem = item
    }
    return genericItem
  }

  static fromDBValueArray(
    buildItems: BuildItems[],
    category: ItemCategory,
  ): Array<GenericItem | null> {
    if (!buildItems) return []

    let genericItems: Array<GenericItem | null> = []
    for (const buildItem of buildItems) {
      const item = remnantItems.find((i) => i.id === buildItem.itemId)
      if (!item) continue
      if (item.category !== category) continue
      buildItem.index
        ? (genericItems[buildItem.index] = item)
        : genericItems.push(item)
    }
    return genericItems
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
