import { BuildItems } from '@prisma/client'

import { DEFAULT_TRAIT_AMOUNT } from '@/features/build/constants'

import { Item } from '../../../../features/items/types'
import { archetypeItems } from '../archetype-items'
import { traitItems } from '../trait-items'
import { BaseItem } from './BaseItem'

const allItems = [...traitItems, ...archetypeItems]

interface BaseTraitItem extends BaseItem {
  amount: number
  maxLevelBonus: string
  elementalResistanceStep?: number // The amount to increase the elemental resistance per level
  elementalResistanceStepPercent?: number // The percentage to increase the elemental resistance per level
  elementalResistanceThresholds?: number[] // The elemental resistance thresholds for the elemental resistance step
  healthStep?: number // The amount to increase the health per level
  healthStepPercent?: number // The percentage to increase the health per level
  staminaStep?: number // The amount to increase the stamina per level
  staminaStepPercent?: number // The percentage to increase the stamina per level
  armorStep?: number // The amount to increase the armor per level
  armorStepPercent?: number // The percentage to increase the armor per level
  weightStep?: number // The amount to increase the weight per level
  weightStepPercent?: number // The percentage to increase the weight per level
  weightThresholds?: number[] // The weight thresholds for the weight step
}

export class TraitItem extends BaseItem implements BaseTraitItem {
  public category: BaseTraitItem['category'] = 'trait'
  public maxLevelBonus: BaseTraitItem['maxLevelBonus'] = ''
  public amount: BaseTraitItem['amount'] = DEFAULT_TRAIT_AMOUNT
  public elementalResistanceStep?: BaseTraitItem['elementalResistanceStep'] = 0
  public elementalResistanceStepPercent?: BaseTraitItem['elementalResistanceStepPercent'] = 0
  public elementalResistanceThresholds?: BaseTraitItem['elementalResistanceThresholds'] =
    []
  public healthStep?: BaseTraitItem['healthStep'] = 0
  public healthStepPercent?: BaseTraitItem['healthStepPercent'] = 0
  public staminaStep?: BaseTraitItem['staminaStep'] = 0
  public staminaStepPercent?: BaseTraitItem['staminaStepPercent'] = 0
  public armorStep?: BaseTraitItem['armorStep'] = 0
  public weightStep?: BaseTraitItem['weightStep'] = 0
  public armorStepPercent?: BaseTraitItem['armorStepPercent'] = 0
  public weightThresholds?: BaseTraitItem['weightThresholds'] = []
  public weightStepPercent?: BaseTraitItem['weightStepPercent'] = 0

  constructor(props: BaseTraitItem) {
    super(props)
    this.amount = props.amount
    this.maxLevelBonus = props.maxLevelBonus
    this.elementalResistanceStep = props.elementalResistanceStep
    this.elementalResistanceStepPercent = props.elementalResistanceStepPercent
    this.elementalResistanceThresholds = props.elementalResistanceThresholds
    this.healthStep = props.healthStep
    this.healthStepPercent = props.healthStepPercent
    this.staminaStep = props.staminaStep
    this.staminaStepPercent = props.staminaStepPercent
    this.armorStep = props.armorStep
    this.armorStepPercent = props.armorStepPercent
    this.weightStep = props.weightStep
    this.weightStepPercent = props.weightStepPercent
    this.weightThresholds = props.weightThresholds
  }

  public static isTraitItem = (item?: Item): item is TraitItem => {
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

      const item = allItems.find((i) => i.id === traitId)
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
            dlc: item.dlc,
            description: item.description ?? '',
            maxLevelBonus: item.maxLevelBonus ?? '',
            wikiLinks: item.wikiLinks ?? [],
            linkedItems: item.linkedItems ?? {},
            saveFileSlug: item.saveFileSlug ?? '',
            elementalResistanceStep: item.elementalResistanceStep ?? 0,
            elementalResistanceStepPercent:
              item.elementalResistanceStepPercent ?? 0,
            elementalResistanceThresholds:
              item.elementalResistanceThresholds ?? [],
            healthStep: item.healthStep ?? 0,
            healthStepPercent: item.healthStepPercent ?? 0,
            armorStep: item.armorStep ?? 0,
            armorStepPercent: item.armorStepPercent ?? 0,
            staminaStep: item.staminaStep ?? 0,
            staminaStepPercent: item.staminaStepPercent ?? 0,
            weightStep: item.weightStep ?? 0,
            weightStepPercent: item.weightStepPercent ?? 0,
            weightThresholds: item.weightThresholds ?? [],
          }),
        )
      }
    })
    return items
  }

  static fromDBValue(buildItems: BuildItems[]): Array<TraitItem> {
    if (!buildItems) return []

    let traitValues: Array<TraitItem> = []
    let archtypeValues: Array<BaseItem> = []
    for (const buildItem of buildItems) {
      const item = allItems.find((i) => i.id === buildItem.itemId)
      if (!item) continue
      if (item.category === 'archetype') {
        // insert the archtype at the index
        buildItem.index
          ? archtypeValues.splice(buildItem.index, 0, item)
          : archtypeValues.push(item)
        continue
      }
      const traitItem = {
        ...item,
        amount: buildItem.amount,
      } as TraitItem
      buildItem.index
        ? (traitValues[buildItem.index] = traitItem)
        : traitValues.push(traitItem)
    }

    const newTraitItems: TraitItem[] = []
    const primaryTraits: TraitItem[] = []

    // Add the archtype items to the trait items
    for (let i = 0; i < archtypeValues.length; i++) {
      const archtypeItem = archtypeValues[i]
      // if the archtype is primary, get all linked items
      // if the archtype is secondary, get only the main trait
      const linkedTraits =
        i === 0
          ? archtypeItem.linkedItems?.traits
          : archtypeItem.linkedItems?.traits?.filter((t) => t.amount === 10)
      if (!linkedTraits) continue

      for (const linkedTrait of linkedTraits) {
        const traitItem = traitValues.find((i) => i.name === linkedTrait.name)
        if (!traitItem) continue

        if (linkedTrait.amount === 10) {
          primaryTraits.push(traitItem)
        }

        // if traititem not already in newTraitItems, add it
        if (!newTraitItems.find((i) => i.name === traitItem.name)) {
          newTraitItems.push(traitItem)
        }
      }
    }

    // alphabetize the newTraitItems by name
    const sortedTraitItems = [...newTraitItems]
    sortedTraitItems.sort((a, b) => {
      if (a.name < b.name) return -1
      if (a.name === b.name) return 0
      return 1
    })

    // Alphabetize the primary traits by name, Desc so that they are at the front of the array
    // alphabetical
    const sortedPrimaryTraits = [...primaryTraits]
    sortedPrimaryTraits.sort((a, b) => {
      if (a.name < b.name) return 1
      if (a.name === b.name) return 0
      return -1
    })

    // move the primary traits to the front of the array
    for (const primaryTrait of sortedPrimaryTraits) {
      const index = sortedTraitItems.findIndex(
        (i) => i.name === primaryTrait.name,
      )
      if (index > 0) {
        sortedTraitItems.splice(index, 1)
        sortedTraitItems.unshift(primaryTrait)
      }
    }

    // All non-archtype linked traits
    const remainingTraits = traitValues.filter(
      (i) => !newTraitItems.find((j) => j.name === i.name),
    )
    // sort the remaining traits alphabetically
    const sortedRemainingTraits = [...remainingTraits]
    sortedRemainingTraits.sort((a, b) => {
      if (a.name < b.name) return -1
      if (a.name === b.name) return 0
      return 1
    })

    // Add the remaining traits to the end of the array
    for (const remainingTrait of sortedRemainingTraits) {
      sortedTraitItems.push(remainingTrait)
    }

    return sortedTraitItems
  }
}
