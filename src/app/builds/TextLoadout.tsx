import { capitalize, cn, trimTrailingComma } from '@/lib/utils'
import type { Loadout, LoadoutItemType } from '@/types'
import { Fragment } from 'react'

interface ItemSectionProps {
  loadout: Loadout
  type: LoadoutItemType
}

function ItemSection({ loadout, type }: ItemSectionProps) {
  const itemOrItems = loadout.items[type]

  function getTypeLabels(): string[] {
    if (Array.isArray(itemOrItems)) {
      const labels = itemOrItems?.map((item, index) => {
        if (!item) return ''

        const { name } = item

        if (type === 'archtypes') {
          const skill = loadout.items.skills
            ? loadout.items.skills[index]
            : null
          return trimTrailingComma(`${name}, ${skill?.name ?? ''}`)
        }

        return name
      })
      return labels
    }

    if (
      itemOrItems?.type === 'mainhand' ||
      itemOrItems?.type === 'offhand' ||
      itemOrItems?.type === 'melee'
    ) {
      let mIndex = 0
      if (type === 'mainhand') mIndex = 0
      if (type === 'melee') mIndex = 1
      if (type === 'offhand') mIndex = 2

      return [
        trimTrailingComma(
          `${itemOrItems?.name}, ${
            loadout.items.mods ? loadout.items.mods[mIndex]?.name ?? '' : ''
          }, ${
            loadout.items.mutators
              ? loadout.items.mutators[mIndex]?.name ?? ''
              : ''
          }`,
        ),
      ]
    }

    return [itemOrItems?.name ?? '']
  }

  const typeLabels = getTypeLabels()

  return (
    <Fragment>
      <div className="mb-2 grid w-full grid-cols-2 gap-2 text-left">
        <h4 className="text-xs font-bold text-green-400">{capitalize(type)}</h4>
        <ul className="text-xs text-gray-400">
          {typeLabels.map((label) => (
            <li
              key={label}
              className={cn(typeLabels.length <= 1 ? 'list-none' : 'list-disc')}
            >
              {label}
            </li>
          ))}
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
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
      <h3 className="col-span-full mb-2 mt-8 border-b border-b-green-900 pb-2 text-left text-2xl font-bold text-green-400">
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
      <div className="text-left">
        <ItemSection loadout={loadout} type="mainhand" />
        <ItemSection loadout={loadout} type="melee" />
        <ItemSection loadout={loadout} type="offhand" />
      </div>
    </div>
  )
}
