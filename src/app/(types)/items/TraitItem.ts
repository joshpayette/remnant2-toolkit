import { BuildItems } from '@prisma/client'
import { remnantItems } from '../../(data)'
import { DEFAULT_TRAIT_AMOUNT } from '../../(data)/constants'
import { GenericItem } from './GenericItem'

interface BaseTraitItem extends GenericItem {
  amount: number
  maxLevelBonus: string
  healthStep: number // The amount to increase the health per level
  healthStepPercent: number // The percentage to increase the health per level
  staminaStep: number // The amount to increase the stamina per level
  staminaStepPercent: number // The percentage to increase the stamina per level
  armorStep: number // The amount to increase the armor per level
  armorStepPercent: number // The percentage to increase the armor per level
}

export class TraitItem extends GenericItem implements BaseTraitItem {
  public category: BaseTraitItem['category'] = 'trait'
  public maxLevelBonus: BaseTraitItem['maxLevelBonus'] = ''
  public amount: BaseTraitItem['amount'] = DEFAULT_TRAIT_AMOUNT
  public healthStep: BaseTraitItem['healthStep'] = 0
  public healthStepPercent: BaseTraitItem['healthStepPercent'] = 0
  public staminaStep: BaseTraitItem['staminaStep'] = 0
  public staminaStepPercent: BaseTraitItem['staminaStepPercent'] = 0
  public armorStep: BaseTraitItem['armorStep'] = 0
  public armorStepPercent: BaseTraitItem['armorStepPercent'] = 0

  constructor(props: BaseTraitItem) {
    super(props)
    this.amount = props.amount
    this.maxLevelBonus = props.maxLevelBonus
    this.healthStep = props.healthStep
    this.healthStepPercent = props.healthStepPercent
    this.staminaStep = props.staminaStep
    this.staminaStepPercent = props.staminaStepPercent
    this.armorStep = props.armorStep
    this.armorStepPercent = props.armorStepPercent
  }

  public static isTraitItem = (item: GenericItem | null): item is TraitItem => {
    if (!item) return false
    return item.category === 'trait'
  }

  static toParams(
    items: Array<{ id: BaseTraitItem['id']; amount: number }>,
  ): string[] {
    return items.map((i) => (i.id ? `${i.id};${i.amount}` : ''))
  }

  static fromParams(params: string): TraitItem[] {
    const itemIds = params.split(',')
    if (!itemIds) return []

    const items: TraitItem[] = []
    itemIds.forEach((itemId) => {
      // We need to split the trait id at the ; to get the amount
      const [traitId, amount] = itemId.split(';')

      const item = remnantItems.find((i) => i.id === traitId)
      if (!item) return []

      let validAmount = amount ? Number(amount) : DEFAULT_TRAIT_AMOUNT
      if (isNaN(validAmount)) validAmount = DEFAULT_TRAIT_AMOUNT
      if (validAmount < 1) validAmount = DEFAULT_TRAIT_AMOUNT
      if (validAmount > 10) validAmount = DEFAULT_TRAIT_AMOUNT

      if (TraitItem.isTraitItem(item)) {
        items.push(
          new TraitItem({
            id: item.id,
            name: item.name,
            category: item.category,
            imagePath: item.imagePath,
            amount: validAmount,
            description: item.description ?? '',
            maxLevelBonus: item.maxLevelBonus ?? '',
            howToGet: item.howToGet ?? '',
            wikiLinks: item.wikiLinks ?? [],
            linkedItems: item.linkedItems ?? {},
            saveFileSlug: item.saveFileSlug ?? '',
            healthStep: item.healthStep ?? 0,
            healthStepPercent: item.healthStepPercent ?? 0,
            armorStep: item.armorStep ?? 0,
            armorStepPercent: item.armorStepPercent ?? 0,
            staminaStep: item.staminaStep ?? 0,
            staminaStepPercent: item.staminaStepPercent ?? 0,
          }),
        )
      }
    })
    return items
  }

  static fromDBValue(buildItems: BuildItems[]): Array<TraitItem> {
    if (!buildItems) return []

    let traitItems: Array<TraitItem> = []
    for (const buildItem of buildItems) {
      const item = remnantItems.find((i) => i.id === buildItem.itemId)
      if (!item) continue
      if (item.category !== 'trait') continue
      if (!this.isTraitItem(item)) continue
      const traitItem = {
        ...item,
        amount: buildItem.amount,
      } as TraitItem
      buildItem.index
        ? (traitItems[buildItem.index] = traitItem)
        : traitItems.push(traitItem)
    }
    return traitItems
  }
}
