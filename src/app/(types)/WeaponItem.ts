import { remnantItems } from '../(data)'
import { GenericItem } from './GenericItem'

export interface BaseWeaponItem extends GenericItem {
  type: 'long gun' | 'melee' | 'hand gun'
}

export class WeaponItem implements BaseWeaponItem {
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

  public static isWeaponItem = (item?: GenericItem): item is WeaponItem => {
    if (!item) return false
    return item.category === 'weapon'
  }

  static toParams(items: WeaponItem[]): string[] {
    return items.map((i) => `${i.id}`)
  }

  static toDBValue(items: WeaponItem[]): string {
    return this.toParams(items).join(',')
  }

  static fromDBValue(value: string): WeaponItem[] {
    return this.fromParams(value) ?? []
  }

  static fromParams(params: string): WeaponItem[] | null {
    const itemIds = params.split(',')
    if (!itemIds) return null

    const items: WeaponItem[] = []
    itemIds.forEach((itemId, index) => {
      const item = remnantItems.find((i) => i.id === itemId)
      if (!item) return
      if (!this.isWeaponItem(item)) return
      items[index] = item
    })

    if (items.length === 0) return null
    if (items.filter((i) => !this.isWeaponItem(i)).length > 0) return null

    return items
  }
}
