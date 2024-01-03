import ItemInfo from '@/app/(components)/ItemInfo'
import { Item } from '@/app/(types)'
import { getArrayOfLength } from '@/app/(lib)/utils'
import { BuildState } from '@/app/(types)/build-state'
import { GenericItem } from '@/app/(types)/items/GenericItem'
import {
  InformationCircleIcon,
  ListBulletIcon,
} from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Masonry } from 'masonic'
import { ArmorItem } from '@/app/(types)/items/ArmorItem'
import { MutatorItem } from '@/app/(types)/items/MutatorItem'

interface MasonryBuildItem {
  index: number
  data: Item
  width: number
  onMoreInfoClick: (item: Item) => void
}

function MasonryCard({ data: item, onMoreInfoClick }: MasonryBuildItem) {
  if (!item) return null

  const { imagePath, category, name, description, wikiLinks } = item

  return (
    <div className="col-span-1 flex flex-col divide-y divide-green-800 rounded-lg border border-green-500 bg-black text-center shadow">
      <div className="flex flex-1 flex-col p-4">
        <button
          onClick={() => onMoreInfoClick(item)}
          className="text-xl font-bold text-purple-500 hover:text-purple-300 hover:underline"
        >
          <Image
            className="mx-auto mb-2 h-32 w-32 flex-shrink-0 rounded-full"
            width={200}
            height={200}
            src={`https://${process.env.NEXT_PUBLIC_IMAGE_URL}${imagePath}?width=200&height=200`}
            alt={`${name} icon`}
            priority={true}
          />

          {name}
        </button>
        <dl className="mt-1 flex flex-grow flex-col justify-start text-sm">
          <dt className="sr-only">Item Category</dt>
          <dd className="text-sm text-gray-500">{category}</dd>
          <dt className="sr-only">Description</dt>
          <dd className="mt-3 whitespace-pre-line text-left text-sm text-gray-200">
            {description}
          </dd>

          {MutatorItem.isMutatorItem(item) && (
            <dd className="mt-3 whitespace-pre-line text-left text-gray-200">
              <strong>At Max Level: </strong>
              {item.maxLevelBonus || 'No max level bonus found.'}
            </dd>
          )}

          {GenericItem.isGenericItem(item) && item.cooldown && (
            <dd className="mt-3 whitespace-pre-line text-left text-gray-200">
              <strong>Cooldown</strong>: {item.cooldown}s
            </dd>
          )}
        </dl>
        {ArmorItem.isArmorItem(item) && (
          <dl className="mt-1 flex flex-grow flex-col justify-start">
            <dd className="flex w-full flex-row items-center justify-start">
              <div className="flex w-full flex-col items-start justify-start sm:max-w-[275px]">
                <p className="grid w-full grid-cols-2 gap-2 border border-transparent border-b-green-500 text-left text-sm text-gray-300">
                  Armor:{' '}
                  <span className="text-right text-lg font-bold">
                    {item.armor}
                  </span>
                </p>
                <p className="grid w-full grid-cols-2 gap-2 border border-transparent border-b-green-500 text-left text-sm text-gray-300">
                  Weight:{' '}
                  <span className="text-right text-lg font-bold">
                    {item.weight}
                  </span>
                </p>
                <p className="grid w-full grid-cols-2 gap-2 border border-transparent border-b-green-500 text-left text-sm text-gray-300">
                  Bleed Resistance:{' '}
                  <span className="text-right text-lg font-bold">
                    {item.bleedResistance}
                  </span>
                </p>
                <p className="grid w-full grid-cols-2 gap-2 border border-transparent border-b-green-500 text-left text-sm text-gray-300">
                  Fire Resistance:{' '}
                  <span className="text-right text-lg font-bold">
                    {item.fireResistance}
                  </span>
                </p>
                <p className="grid w-full grid-cols-2 gap-2 border border-transparent border-b-green-500 text-left text-sm text-gray-300">
                  Shock Resistance:{' '}
                  <span className="text-right text-lg font-bold">
                    {item.shockResistance}
                  </span>
                </p>
                <p className="grid w-full grid-cols-2 gap-2 border border-transparent border-b-green-500 text-left text-sm text-gray-300">
                  Toxin Resistance:{' '}
                  <span className="text-right text-lg font-bold">
                    {item.toxinResistance}
                  </span>
                </p>
                <p className="grid w-full grid-cols-2 gap-2 border border-transparent border-b-green-500 text-left text-sm text-gray-300">
                  Blight Resistance:{' '}
                  <span className="text-right text-lg font-bold">
                    {item.blightResistance}
                  </span>
                </p>
              </div>
            </dd>
          </dl>
        )}
      </div>
      <div>
        <div className="-mt-px flex divide-x divide-green-800">
          <div className="flex w-0 flex-1">
            <button
              onClick={() => onMoreInfoClick(item)}
              className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-1 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-200"
            >
              <InformationCircleIcon
                className="h-5 w-5 text-green-400"
                aria-hidden="true"
              />
              More Info
            </button>
          </div>
          <div className="-ml-px flex w-0 flex-1">
            {wikiLinks && wikiLinks[0] && (
              <Link
                target="_blank"
                href={wikiLinks[0]}
                className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-1 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-200"
              >
                <ListBulletIcon
                  className="h-5 w-5 text-green-400"
                  aria-hidden="true"
                />
                Wiki
              </Link>
            )}
          </div>
          {}
        </div>
      </div>
    </div>
  )
}

type Props = {
  buildState: BuildState
}

function buildStateToMasonryItems(build: BuildState): Item[] {
  const masonryItems: Item[] = []
  const { items } = build

  // archtypes
  getArrayOfLength(2).forEach((_, i) => {
    items.archtype[i] && masonryItems.push(items.archtype[i])
    items.skill[i] && masonryItems.push(items.skill[i])
  })

  // armor
  items.helm && masonryItems.push(items.helm)
  items.torso && masonryItems.push(items.torso)
  items.legs && masonryItems.push(items.legs)
  items.gloves && masonryItems.push(items.gloves)
  items.relic && masonryItems.push(items.relic)
  getArrayOfLength(3).forEach((_, i) => {
    if (!items.relicfragment[i]) return
    items.relicfragment[i] && masonryItems.push(items.relicfragment[i])
  })
  items.amulet && masonryItems.push(items.amulet)
  getArrayOfLength(4).forEach((_, i) => {
    if (!items.ring[i]) return
    items.ring[i] && masonryItems.push(items.ring[i])
  })

  // weapons
  getArrayOfLength(3).forEach((_, i) => {
    items.weapon[i] && masonryItems.push(items.weapon[i])
    items.mod[i] && masonryItems.push(items.mod[i])
    items.mutator[i] && masonryItems.push(items.mutator[i])
  })

  // traits
  items.trait.forEach((trait) => trait && masonryItems.push(trait))

  // concoctions
  items.concoction.forEach(
    (concoction) => concoction && masonryItems.push(concoction),
  )

  // consumables
  items.consumable.forEach(
    (consumable) => consumable && masonryItems.push(consumable),
  )

  return masonryItems
}

export default function DetailedBuildView({ buildState }: Props) {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null)
  const infoOpen = selectedItem !== null

  const masonryItems = buildStateToMasonryItems(buildState)

  function handleMoreInfoClick(item: Item) {
    setSelectedItem(item)
  }

  return (
    <>
      <ItemInfo
        item={selectedItem}
        open={infoOpen}
        onClose={() => setSelectedItem(null)}
      />
      <div className="flex w-full flex-col items-center justify-center p-4">
        <h2 className="mb-4 text-4xl font-bold tracking-tight text-white">
          Detailed Build View
        </h2>
        <Masonry
          items={masonryItems}
          render={({ index, data, width }) => (
            <MasonryCard
              index={index}
              data={data}
              width={width}
              onMoreInfoClick={handleMoreInfoClick}
            />
          )}
          columnGutter={8}
          rowGutter={8}
        />
      </div>
    </>
  )
}
