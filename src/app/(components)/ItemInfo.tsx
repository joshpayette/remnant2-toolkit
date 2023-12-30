import Dialog from './Dialog'
import { capitalize, cn } from '@/app/(lib)/utils'
import Image from 'next/image'
import { GenericItem } from '../(types)/items/GenericItem'
import { MutatorItem } from '../(types)/items/MutatorItem'
import { ArmorItem } from '../(types)/items/ArmorItem'
import { Item } from '../(data)'

interface ItemInfoProps {
  item: Item | null
  open: boolean
  onClose: () => void
}

export default function ItemInfo({ item, open, onClose }: ItemInfoProps) {
  if (!item) return null

  // Only add the third column for certain items
  const columns = ArmorItem.isArmorItem(item) ? 3 : 2

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title={'Item Info'}
      maxWidthClass="max-w-3xl"
    >
      <div className="grid-cols-full grid gap-x-8 gap-y-4 sm:grid-cols-3">
        <div className="col-span-3 flex w-full flex-col items-start justify-start sm:col-span-1">
          <div className="w-full text-center">
            <h3 className="text-xl font-bold text-purple-500">{item.name}</h3>
            <p className="mb-2 text-sm text-gray-200">
              {capitalize(item.category)}
            </p>
          </div>
          <Image
            src={`https://d2sqltdcj8czo5.cloudfront.net${item.imagePath}`}
            width={128}
            height={128}
            alt={item.name}
            className="h-auto max-h-full w-full max-w-full"
            priority={true}
          />
        </div>

        {ArmorItem.isArmorItem(item) && (
          <div className="col-span-3 mb-2 flex w-full flex-col items-start justify-start sm:col-span-1">
            <h4 className="text-left text-sm text-gray-500">Armor Stats</h4>
            <div className="flex w-full flex-row items-center justify-start">
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
            </div>
          </div>
        )}

        <div
          className={cn(
            'col-span-3 mb-2 flex flex-col items-start justify-start',
            columns === 2 ? ' sm:col-span-2' : 'sm:col-span-1',
          )}
        >
          <h4 className="text-left text-sm text-gray-500">Description</h4>
          <p className="whitespace-pre-line text-left text-sm text-gray-300">
            {item.description || 'No description available.'}
          </p>

          {MutatorItem.isMutatorItem(item) && (
            <div className="flex flex-col items-start justify-start">
              <h4 className="mt-4 text-left text-sm text-gray-500">
                At Max Level
              </h4>
              <p className="text-left text-sm text-gray-300">
                {item.maxLevelBonus || 'No max level bonus found.'}
              </p>
            </div>
          )}

          {GenericItem.isGenericItem(item) && item.cooldown && (
            <div className="flex flex-col items-start justify-start">
              <h4 className="mt-4 text-left text-sm text-gray-500">Cooldown</h4>
              <p className="text-left text-sm text-gray-300">
                {item.cooldown}s
              </p>
            </div>
          )}

          <div className="flex flex-col items-start justify-start">
            <h4 className="mt-4 text-left text-sm text-gray-500">How to Get</h4>
            <p className="text-left text-sm text-gray-300">
              {item.howToGet || 'No instructions found.'}
            </p>
          </div>
          <div className="flex flex-col items-start justify-start">
            <h4 className="mt-4 text-left text-sm text-gray-500">Wiki Links</h4>
            {item.wikiLinks?.map((link) => (
              <a
                key={link}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-left text-sm text-gray-300 underline hover:text-green-400"
              >
                {link}
              </a>
            )) ?? (
              <div className="text-left text-sm text-gray-300">
                No links found.
              </div>
            )}
          </div>
        </div>
      </div>
    </Dialog>
  )
}
