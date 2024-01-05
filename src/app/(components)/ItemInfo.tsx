import Dialog from './Dialog'
import { capitalize, cn } from '@/app/(lib)/utils'
import Image from 'next/image'
import { GenericItem } from '../(types)/items/GenericItem'
import { MutatorItem } from '../(types)/items/MutatorItem'
import { ArmorItem } from '../(types)/items/ArmorItem'
import { Item } from '../(types)'
import ArmorInfo from './ArmorInfo'
import { TraitItem } from '../(types)/items/TraitItem'

interface ItemInfoProps {
  item: Item | null
  open: boolean
  onClose: () => void
}

export default function ItemInfo({ item, open, onClose }: ItemInfoProps) {
  if (!item) return null

  // Only add the third column for certain items
  const columns = ArmorItem.isArmorItem(item) ? 3 : 2

  const imageSize = {
    width: 217,
    height: item.category === 'trait' ? 434 : 217,
  }

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
            src={`https://${process.env.NEXT_PUBLIC_IMAGE_URL}${item.imagePath}`}
            width={imageSize.width}
            height={imageSize.height}
            alt={item.name}
            className="h-auto max-h-full w-full max-w-full"
            loading="eager"
          />
        </div>

        {ArmorItem.isArmorItem(item) && (
          <div className="col-span-3 mb-2 flex w-full flex-col items-start justify-start sm:col-span-1">
            <ArmorInfo item={item} />
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

          {(MutatorItem.isMutatorItem(item) || TraitItem.isTraitItem(item)) && (
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
