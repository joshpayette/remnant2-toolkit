import ItemInfo from '@/app/(components)/ItemInfo'
import { Item } from '@/app/(data)'
import { getArrayOfLength, getConcoctionSlotCount } from '@/app/(lib)/utils'
import { BuildState } from '@/app/(types)/build-state'
import {
  InformationCircleIcon,
  ListBulletIcon,
} from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'
import { Fragment, useState } from 'react'

function BuildItem({
  item,
  onClickMoreInfo,
}: {
  item: Item | null
  onClickMoreInfo: () => void
}) {
  if (!item) return null

  const { imagePath, category, name, description, wikiLinks } = item

  return (
    <li className="col-span-1 flex flex-col divide-y divide-green-800 rounded-lg border border-green-500 bg-black text-center shadow">
      <div className="flex flex-1 flex-col p-8">
        <Image
          className="mx-auto h-32 w-32 flex-shrink-0 rounded-full"
          width={200}
          height={200}
          src={`https://${process.env.NEXT_PUBLIC_IMAGE_URL}${imagePath}`}
          alt={`${name} icon`}
        />
        <h3 className="mt-6 text-xl font-bold text-purple-500">{name}</h3>
        <dl className="mt-1 flex flex-grow flex-col justify-between">
          <dt className="sr-only">Item Category</dt>
          <dd className="text-sm text-gray-500">{category}</dd>
          <dt className="sr-only">Description</dt>
          <dd className="mt-3 text-gray-200">{description}</dd>
        </dl>
      </div>
      <div>
        <div className="-mt-px flex divide-x divide-green-800">
          <div className="flex w-0 flex-1">
            <button
              onClick={onClickMoreInfo}
              className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-200"
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
                className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-200"
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
    </li>
  )
}

type Props = {
  buildState: BuildState
  isScreenshotMode: boolean
}

export default function DetailedBuildView({
  buildState,
  isScreenshotMode,
}: Props) {
  const [selectedItem, setSelectedItem] = useState<Item | null>(null)
  const infoOpen = selectedItem !== null

  const { items } = buildState

  return (
    <>
      <ItemInfo
        item={selectedItem}
        open={infoOpen}
        onClose={() => setSelectedItem(null)}
      />
      <div className="flex w-full flex-col items-center justify-center p-4">
        <h2 className="mb-4 text-2xl font-bold tracking-tight text-white">
          Detailed Build View
        </h2>
        <ul
          role="list"
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
          {getArrayOfLength(2).map((_, i) => (
            <Fragment key={`archtype-${i}`}>
              <BuildItem
                item={items.archtype[i]}
                onClickMoreInfo={() => setSelectedItem(items.archtype[i])}
              />
              <BuildItem
                item={items.skill[i]}
                onClickMoreInfo={() => setSelectedItem(items.skill[i])}
              />
            </Fragment>
          ))}
          <BuildItem
            item={items.helm}
            onClickMoreInfo={() => setSelectedItem(items.helm)}
          />
          <BuildItem
            item={items.torso}
            onClickMoreInfo={() => setSelectedItem(items.torso)}
          />
          <BuildItem
            item={items.legs}
            onClickMoreInfo={() => setSelectedItem(items.legs)}
          />
          <BuildItem
            item={items.gloves}
            onClickMoreInfo={() => setSelectedItem(items.gloves)}
          />
          <BuildItem
            item={items.relic}
            onClickMoreInfo={() => setSelectedItem(items.relic)}
          />
          {getArrayOfLength(3).map((_, i) => (
            <BuildItem
              key={`relicfragment-${i}`}
              item={items.relicfragment[i] ?? null}
              onClickMoreInfo={() =>
                setSelectedItem(items.relicfragment[i] ?? null)
              }
            />
          ))}
          <BuildItem
            item={items.amulet}
            onClickMoreInfo={() => setSelectedItem(items.amulet)}
          />
          {getArrayOfLength(4).map((_, i) => (
            <BuildItem
              key={`ring-${i}`}
              item={items.ring[i]}
              onClickMoreInfo={() => setSelectedItem(items.ring[i])}
            />
          ))}
          {getArrayOfLength(3).map((_, i) => (
            <Fragment key={`weapon-${i}`}>
              <BuildItem
                item={items.weapon[i]}
                onClickMoreInfo={() => setSelectedItem(items.weapon[i])}
              />
              <BuildItem
                item={items.mod[i]}
                onClickMoreInfo={() => setSelectedItem(items.mod[i])}
              />
              <BuildItem
                item={items.mutator[i]}
                onClickMoreInfo={() => setSelectedItem(items.mutator[i])}
              />
            </Fragment>
          ))}
          {items.trait.map((trait, i) => (
            <BuildItem
              key={`trait-${i}`}
              item={trait}
              onClickMoreInfo={() => setSelectedItem(trait)}
            />
          ))}
          {items.concoction.map((concoction, i) => (
            <BuildItem
              key={`concoction-${i}`}
              item={concoction}
              onClickMoreInfo={() => setSelectedItem(concoction)}
            />
          ))}
          {items.consumable.map((consumable, i) => (
            <BuildItem
              key={`consumable-${i}`}
              item={consumable}
              onClickMoreInfo={() => setSelectedItem(consumable)}
            />
          ))}
        </ul>
      </div>
    </>
  )
}
