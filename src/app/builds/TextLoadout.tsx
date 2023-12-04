import { capitalize } from '@/lib/utils'
import type { Loadout, LoadoutItem, LoadoutItemType } from '@/types'
import { Fragment } from 'react'

interface ItemSectionProps {
  loadout: Loadout
  type: LoadoutItemType
}

function ItemSection({ loadout, type }: ItemSectionProps) {
  const itemOrItems = loadout.items[type]

  return (
    <Fragment>
      <div className="mb-2 grid w-full grid-cols-2 gap-2 text-left">
        <h4 className="text-xs font-bold text-green-400">{capitalize(type)}</h4>
        <ul className="text-xs text-gray-400">
          {Array.isArray(itemOrItems)
            ? itemOrItems?.map((item, index) => {
                if (!item) return null

                const { name } = item

                if (type === 'archtypes') {
                  const skill = loadout.items.skills
                    ? loadout.items.skills[index]
                    : null
                  return (
                    <li className="mb-1 list-none" key={name}>
                      {name}, {skill?.name ?? ''}
                    </li>
                  )
                }

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
        <ItemSection loadout={loadout} type="archtypes" />
        <ItemSection loadout={loadout} type="helm" />
        <ItemSection loadout={loadout} type="torso" />
        <ItemSection loadout={loadout} type="legs" />
        <ItemSection loadout={loadout} type="gloves" />
        <ItemSection loadout={loadout} type="relic" />
      </div>
      <div className="text-left">
        <ItemSection loadout={loadout} type="amulet" />
        <ItemSection loadout={loadout} type="rings" />
      </div>
    </div>
  )
}
