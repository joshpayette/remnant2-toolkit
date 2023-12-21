import { remnantItems } from '../(data)'
import { BaseItem } from './BaseItem'

/**
 * The value of each new trait added
 * to the builder.
 */
export const DEFAULT_TRAIT_AMOUNT = 10
/**
 * The maximum amount of traits that can
 * be added to the builder.
 */
export const MAX_TRAIT_AMOUNT = 110

export interface BaseTraitItem {
  id: BaseItem['id']
  name: BaseItem['name']
  category: BaseItem['category']
  description: BaseItem['description']
  imagePath: BaseItem['imagePath']
  howToGet: BaseItem['howToGet']
  wikiLinks: BaseItem['wikiLinks']
  linkedItems: BaseItem['linkedItems']
  saveFileSlug: BaseItem['saveFileSlug']
  amount: number
}

/**
 *
 */
export class TraitItem extends BaseItem implements BaseTraitItem {
  public id: BaseTraitItem['id'] = ''
  public name: BaseTraitItem['name'] = ''
  public category: BaseTraitItem['category'] = 'trait'
  public description: BaseTraitItem['description'] = ''
  public imagePath: BaseTraitItem['imagePath'] = ''
  public howToGet: BaseTraitItem['howToGet'] = ''
  public wikiLinks: BaseTraitItem['wikiLinks'] = []
  public linkedItems: BaseTraitItem['linkedItems'] = {}
  public saveFileSlug: BaseTraitItem['saveFileSlug'] = ''
  public amount: number = DEFAULT_TRAIT_AMOUNT

  constructor(props: BaseTraitItem) {
    super()
    this.id = props.id
    this.name = props.name
    this.description = props.description
    this.imagePath = props.imagePath
    this.howToGet = props.howToGet
    this.wikiLinks = props.wikiLinks
    this.linkedItems = props.linkedItems
    this.saveFileSlug = props.saveFileSlug
    this.amount = props.amount
  }

  public static isTraitItem = (item: BaseItem): item is TraitItem => {
    return item.category === 'trait'
  }

  toParams(items: Array<{ id: BaseItem['id']; amount: number }>): string[] {
    return items.map((i) => `${i.id};${i.amount ?? DEFAULT_TRAIT_AMOUNT}`)
  }

  fromParams(params: string): TraitItem[] {
    const itemIds = params.split(',')
    if (!itemIds) return []

    const items: TraitItem[] = []
    itemIds.forEach((itemId) => {
      // We need to split the trait id at the ; to get the amount
      const [traitId, amount] = itemId.split(';')

      const item = remnantItems.find((i) => i.id === traitId)
      if (!item) return []

      let validAmount = amount ? parseInt(amount) : DEFAULT_TRAIT_AMOUNT
      if (isNaN(validAmount)) validAmount = DEFAULT_TRAIT_AMOUNT
      if (validAmount < 1) validAmount = DEFAULT_TRAIT_AMOUNT
      if (validAmount > 10) validAmount = DEFAULT_TRAIT_AMOUNT

      items.push(
        new TraitItem({
          id: item.id,
          name: item.name,
          category: item.category,
          imagePath: item.imagePath,
          amount: validAmount,
          description: item.description ?? '',
          howToGet: item.howToGet ?? '',
          wikiLinks: item.wikiLinks ?? [],
          linkedItems: item.linkedItems ?? {},
          saveFileSlug: item.saveFileSlug ?? '',
        }),
      )
    })

    return items
  }
}
