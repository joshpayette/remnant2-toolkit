import { BuildItems } from '@prisma/client'
import { remnantItems } from '../../(data)'
import { GenericItem } from './GenericItem'

export interface BaseArmorItem extends GenericItem {
  set?: string
  armor: number
  weight: number
  bleedResistance: number
  fireResistance: number
  shockResistance: number
  blightResistance: number
  toxinResistance: number
}

export class ArmorItem implements BaseArmorItem {
  public id: BaseArmorItem['id'] = ''
  public name: BaseArmorItem['name'] = ''
  public category: BaseArmorItem['category'] = 'helm'
  public description: BaseArmorItem['description'] = ''
  public dlc: BaseArmorItem['dlc'] = 'base'
  public imagePath: BaseArmorItem['imagePath'] = ''
  public howToGet: BaseArmorItem['howToGet'] = ''
  public wikiLinks: BaseArmorItem['wikiLinks'] = []
  public linkedItems: BaseArmorItem['linkedItems'] = {}
  public saveFileSlug: BaseArmorItem['saveFileSlug'] = ''
  public set: BaseArmorItem['set']
  public armor: BaseArmorItem['armor'] = 0
  public weight: BaseArmorItem['weight'] = 0
  public bleedResistance: BaseArmorItem['bleedResistance'] = 0
  public fireResistance: BaseArmorItem['fireResistance'] = 0
  public shockResistance: BaseArmorItem['shockResistance'] = 0
  public blightResistance: BaseArmorItem['blightResistance'] = 0
  public toxinResistance: BaseArmorItem['toxinResistance'] = 0

  constructor(props: BaseArmorItem) {
    this.id = props.id
    this.name = props.name
    this.description = props.description
    this.imagePath = props.imagePath
    this.howToGet = props.howToGet
    this.wikiLinks = props.wikiLinks
    this.linkedItems = props.linkedItems
    this.saveFileSlug = props.saveFileSlug
    this.set = props.set
    this.armor = props.armor
    this.weight = props.weight
    this.bleedResistance = props.bleedResistance
    this.fireResistance = props.fireResistance
    this.shockResistance = props.shockResistance
    this.blightResistance = props.blightResistance
    this.toxinResistance = props.toxinResistance
  }

  public static isArmorItem = (item?: GenericItem): item is ArmorItem => {
    if (!item) return false
    return (
      item.category === 'helm' ||
      item.category === 'torso' ||
      item.category === 'legs' ||
      item.category === 'gloves'
    )
  }

  static fromDBValue(
    buildItems: BuildItems[],
    category: 'helm' | 'gloves' | 'torso' | 'legs',
  ): ArmorItem | null {
    if (!buildItems) return null

    let armorItem: ArmorItem | null = null
    for (const buildItem of buildItems) {
      const item = remnantItems.find((i) => i.id === buildItem.itemId)
      if (!item) continue
      if (item.category !== category) continue
      if (!this.isArmorItem(item)) continue
      armorItem = item
    }
    return armorItem
  }

  static toParams(item: ArmorItem): string {
    return `${item?.id ?? ''}`
  }

  static fromParams(params: string): ArmorItem | null {
    const itemIds = params.split(',')
    if (!itemIds) return null

    const item = remnantItems.find((i) => i.id === itemIds[0])
    if (!item) return null
    if (!this.isArmorItem(item)) return null
    return item
  }
}
