import { BaseItem } from './BaseItem'

export interface BaseMutatorItem {
  id: BaseItem['id']
  name: BaseItem['name']
  category: BaseItem['category']
  description: BaseItem['description']
  imagePath: BaseItem['imagePath']
  howToGet: BaseItem['howToGet']
  wikiLinks: BaseItem['wikiLinks']
  linkedItems: BaseItem['linkedItems']
  saveFileSlug: BaseItem['saveFileSlug']
  maxLevelBonus: string
  type: 'gun' | 'melee'
}

export class MutatorItem extends BaseItem implements BaseMutatorItem {
  public id: BaseMutatorItem['id'] = ''
  public name: BaseMutatorItem['name'] = ''
  public category: BaseMutatorItem['category'] = 'mutator'
  public type: BaseMutatorItem['type'] = 'gun'
  public description: BaseMutatorItem['description'] = ''
  public imagePath: BaseMutatorItem['imagePath'] = ''
  public howToGet: BaseMutatorItem['howToGet'] = ''
  public wikiLinks: BaseMutatorItem['wikiLinks'] = []
  public linkedItems: BaseMutatorItem['linkedItems'] = {}
  public saveFileSlug: BaseMutatorItem['saveFileSlug'] = ''
  public maxLevelBonus: BaseMutatorItem['maxLevelBonus'] = ''

  constructor(props: BaseMutatorItem) {
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
    this.category = props.category
    this.maxLevelBonus = props.maxLevelBonus
  }

  public static isMutatorItem = (item?: BaseItem): item is MutatorItem => {
    if (!item) return false
    return item.category === 'mutator'
  }
}
