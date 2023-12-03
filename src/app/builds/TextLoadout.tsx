import { capitalize } from '@/lib/utils'
import type { Loadout, LoadoutItem, LoadoutItemType } from '@/types'
import { Fragment } from 'react'

interface ItemSectionProps {
  itemOrItems: LoadoutItem | LoadoutItem[] | null
  type: LoadoutItemType
}

function ItemSection({ itemOrItems, type }: ItemSectionProps) {
  return (
    <Fragment>
      <div className="mb-2 grid w-full grid-cols-2 gap-2 text-left">
        <h4 className="text-xs font-bold text-green-400">{capitalize(type)}</h4>
        <ul className="text-xs text-gray-400">
          {Array.isArray(itemOrItems)
            ? itemOrItems?.map((item) => {
                if (!item) return null
                const { name } = item
                return (
                  <li className="mb-1 list-none" key={name}>
                    {name}
                  </li>
                )
              })
            : itemOrItems?.name || ''}
        </ul>
      </div>
      <div className="mb-2 w-full border-b border-gray-800" />
    </Fragment>
  )
}

interface TextLoadoutProps {
  loadout: Loadout
}

export default function TextLoadout({ loadout }: TextLoadoutProps) {
  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
      <h3 className="col-span-2 mb-2 mt-8 border-b border-b-green-900 pb-2 text-left text-2xl font-bold text-green-400">
        {loadout.name}
      </h3>
      <div className="flex w-full flex-col items-start justify-start">
        <ItemSection itemOrItems={loadout.items.archtypes} type="archtypes" />
        <ItemSection itemOrItems={loadout.items.helm} type="helm" />
        <ItemSection itemOrItems={loadout.items.torso} type="torso" />
        <ItemSection itemOrItems={loadout.items.legs} type="legs" />
        <ItemSection itemOrItems={loadout.items.gloves} type="gloves" />
        <ItemSection itemOrItems={loadout.items.relic} type="relic" />
      </div>
      <div className="text-left">
        <ItemSection itemOrItems={loadout.items.amulet} type="amulet" />
        <ItemSection itemOrItems={loadout.items.rings} type="rings" />
      </div>
    </div>
  )
}
