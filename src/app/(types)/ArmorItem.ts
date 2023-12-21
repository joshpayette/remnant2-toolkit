import { BaseItem } from './BaseItem'

export interface BaseArmorItem {
  id: BaseItem['id']
  name: BaseItem['name']
  category: 'helm' | 'torso' | 'legs' | 'gloves'
  description: BaseItem['description']
  imagePath: BaseItem['imagePath']
  howToGet: BaseItem['howToGet']
  wikiLinks: BaseItem['wikiLinks']
  linkedItems: BaseItem['linkedItems']
  saveFileSlug: BaseItem['saveFileSlug']
  set?: string
  armor: number
  weight: number
  bleedResistance: number
  fireResistance: number
  shockResistance: number
  blightResistance: number
  toxinResistance: number
}

export class ArmorItem extends BaseItem implements BaseArmorItem {
  public id: BaseArmorItem['id'] = ''
  public name: BaseArmorItem['name'] = ''
  public category: BaseArmorItem['category'] = 'helm'
  public description: BaseArmorItem['description'] = ''
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
    super()
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

  public static isArmorItem = (item?: BaseItem): item is ArmorItem => {
    if (!item) return false
    return (
      item.category === 'helm' ||
      item.category === 'torso' ||
      item.category === 'legs' ||
      item.category === 'gloves'
    )
  }
}
