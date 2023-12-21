import { BaseItem } from './BaseItem'

export interface BaseWeaponItem {
  id: BaseItem['id']
  name: BaseItem['name']
  category: BaseItem['category']
  type: 'long gun' | 'melee' | 'hand gun'
  description: BaseItem['description']
  imagePath: BaseItem['imagePath']
  howToGet: BaseItem['howToGet']
  wikiLinks: BaseItem['wikiLinks']
  linkedItems: BaseItem['linkedItems']
  saveFileSlug: BaseItem['saveFileSlug']
}

export class WeaponItem extends BaseItem implements BaseWeaponItem {
  public id: BaseWeaponItem['id'] = ''
  public name: BaseWeaponItem['name'] = ''
  public category: BaseWeaponItem['category'] = 'weapon'
  public type: BaseWeaponItem['type'] = 'long gun'
  public description: BaseWeaponItem['description'] = ''
  public imagePath: BaseWeaponItem['imagePath'] = ''
  public howToGet: BaseWeaponItem['howToGet'] = ''
  public wikiLinks: BaseWeaponItem['wikiLinks'] = []
  public linkedItems: BaseWeaponItem['linkedItems'] = {}
  public saveFileSlug: BaseWeaponItem['saveFileSlug'] = ''

  constructor(props: BaseWeaponItem) {
    super()
    this.id = props.id
    this.name = props.name
    this.description = props.description
    this.imagePath = props.imagePath
    this.howToGet = props.howToGet
    this.wikiLinks = props.wikiLinks
    this.linkedItems = props.linkedItems
    this.saveFileSlug = props.saveFileSlug
    this.type = props.type
  }

  public static isWeaponItem = (item: BaseItem): item is WeaponItem => {
    return item.category === 'weapon'
  }
}
