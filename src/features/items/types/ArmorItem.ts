import { BuildItems } from '@prisma/client'
import { remnantItems } from '../data'
import { GenericItem } from './GenericItem'

export interface BaseArmorItem extends GenericItem {
  set?: string
}

export class ArmorItem extends GenericItem implements BaseArmorItem {
  public set: BaseArmorItem['set']

  constructor(props: BaseArmorItem) {
    super(props)
    this.set = props.set
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
