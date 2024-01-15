import { remnantItems } from '../../(data)'
import { GenericItem } from './GenericItem'

export interface BaseMutatorItem extends GenericItem {
  maxLevelBonus: string
  type: 'gun' | 'melee'
}

export class MutatorItem implements BaseMutatorItem {
  public id: BaseMutatorItem['id'] = ''
  public name: BaseMutatorItem['name'] = ''
  public category: BaseMutatorItem['category'] = 'mutator'
  public dlc: BaseMutatorItem['dlc'] = 'basegame'
  public type: BaseMutatorItem['type'] = 'gun'
  public description: BaseMutatorItem['description'] = ''
  public imagePath: BaseMutatorItem['imagePath'] = ''
  public howToGet: BaseMutatorItem['howToGet'] = ''
  public wikiLinks: BaseMutatorItem['wikiLinks'] = []
  public linkedItems: BaseMutatorItem['linkedItems'] = {}
  public saveFileSlug: BaseMutatorItem['saveFileSlug'] = ''
  public maxLevelBonus: BaseMutatorItem['maxLevelBonus'] = ''

  constructor(props: BaseMutatorItem) {
    this.id = props.id
    this.name = props.name
    this.description = props.description
    this.imagePath = props.imagePath
    this.howToGet = props.howToGet
    this.wikiLinks = props.wikiLinks
    this.linkedItems = props.linkedItems
    this.saveFileSlug = props.saveFileSlug
    this.type = props.type
    this.category = props.category
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
}
