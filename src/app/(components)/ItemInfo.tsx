import { Item, isArmorItem, isMutatorItem } from '@/app/(types)'
import Dialog from './Dialog'
import { capitalize } from '@/app/(lib)/utils'
import Image from 'next/image'

interface ItemInfoProps {
  item: Item | null
  open: boolean
  onClose: () => void
}

export default function ItemInfo({ item, open, onClose }: ItemInfoProps) {
  if (!item) return null

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title={'Item Info'}
      maxWidthClass="max-w-3xl"
    >
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
        <div className="flex w-full flex-col items-start justify-start">
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
          />
        </div>
        <div className="col-span-2 flex flex-col items-start justify-start">
          <h4 className="text-left text-sm text-gray-500">Description</h4>
          <p className="text-left text-sm text-gray-300">
            {item.description || 'No description available.'}
          </p>

          {isMutatorItem(item) && (
            <div className="flex flex-col items-start justify-start">
              <h4 className="mt-4 text-left text-sm text-gray-500">
                At Max Level
              </h4>
              <p className="text-left text-sm text-gray-300">
                {item.maxLevelBonus || 'No max level bonus found.'}
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
          {isArmorItem(item) && (
            <div className="flex w-full flex-col items-start justify-start">
              <h4 className="mt-4 text-left text-sm text-gray-500">
                Armor Stats
              </h4>
              <div className="flex w-full flex-row items-center justify-start">
                <div className="flex w-full max-w-[275px] flex-col items-start justify-start">
                  <p className="grid w-full grid-cols-2 gap-2 border border-transparent border-b-gray-500 text-left text-sm text-gray-300">
                    Armor:{' '}
                    <span className="text-right text-lg font-bold">
                      {item.armor}
                    </span>
                  </p>
                  <p className="grid w-full grid-cols-2 gap-2 border border-transparent border-b-gray-500 border-b-green-500 text-left text-sm text-gray-300">
                    Weight:{' '}
                    <span className="text-right text-lg font-bold">
                      {item.weight}
                    </span>
                  </p>
                  <p className="grid w-full grid-cols-2 gap-2 border border-transparent border-b-gray-500 text-left text-sm text-gray-300">
                    Bleed Resistance:{' '}
                    <span className="text-right text-lg font-bold">
                      {item.bleedResistance}
                    </span>
                  </p>
                  <p className="grid w-full grid-cols-2 gap-2 border border-transparent border-b-gray-500 text-left text-sm text-gray-300">
                    Fire Resistance:{' '}
                    <span className="text-right text-lg font-bold">
                      {item.fireResistance}
                    </span>
                  </p>
                  <p className="grid w-full grid-cols-2 gap-2 border border-transparent border-b-gray-500 text-left text-sm text-gray-300">
                    Shock Resistance:{' '}
                    <span className="text-right text-lg font-bold">
                      {item.shockResistance}
                    </span>
                  </p>
                  <p className="grid w-full grid-cols-2 gap-2 border border-transparent border-b-gray-500 text-left text-sm text-gray-300">
                    Toxin Resistance:{' '}
                    <span className="text-right text-lg font-bold">
                      {item.toxinResistance}
                    </span>
                  </p>
                  <p className="grid w-full grid-cols-2 gap-2 border border-transparent border-b-gray-500 text-left text-sm text-gray-300">
                    Blight Resistance:{' '}
                    <span className="text-right text-lg font-bold">
                      {item.blightResistance}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Dialog>
  )
}
