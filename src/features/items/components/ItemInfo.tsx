import Dialog from '../../ui/Dialog'
import { cn } from '@/lib/classnames'
import Image from 'next/image'
import { GenericItem } from '../types/GenericItem'
import { MutatorItem } from '../types/MutatorItem'
import { ArmorItem } from '../types/ArmorItem'
import ArmorInfo from './ArmorInfo'
import { TraitItem } from '../types/TraitItem'
import { PerkItem } from '../types/PerkItem'
import DescriptionWithTags from './DescriptionWithTags'
import { Item } from '../types'
import { capitalize } from '@/lib/capitalize'
import { WeaponItem } from '../types/WeaponItem'
import WeaponInfo from './WeaponInfo'

interface ItemInfoProps {
  item: Item | null
  open: boolean
  onClose: () => void
}

export default function ItemInfo({ item, open, onClose }: ItemInfoProps) {
  if (!item) return null

  // Only add the third column for certain items
  const columns =
    ArmorItem.isArmorItem(item) || WeaponItem.isWeaponItem(item) ? 3 : 2

  const imageSize = {
    width: 150,
    height: item.category === 'trait' ? 367 : 150,
  }

  let subtitle = capitalize(item.category)
  if (PerkItem.isPerkItem(item)) {
    subtitle += ` - ${capitalize(item.type)}`
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title={<span className="text-xl text-purple-500">{item.name}</span>}
      subtitle={<span className="text-sm text-gray-400">{subtitle}</span>}
      maxWidthClass="max-w-xl"
    >
      <div className="grid-cols-full grid gap-x-8 gap-y-4 sm:grid-cols-3">
        <div className="col-span-3 flex w-full flex-col items-center justify-start sm:col-span-1 sm:justify-center">
          <div className="w-[100px] sm:w-full">
            <Image
              src={`https://${process.env.NEXT_PUBLIC_IMAGE_URL}${item.imagePath}`}
              width={imageSize.width}
              height={imageSize.height}
              alt={item.name}
              className="h-auto max-h-full w-full max-w-full"
              loading="eager"
            />
          </div>
        </div>

        {ArmorItem.isArmorItem(item) && (
          <div className="col-span-3 mb-2 flex w-full flex-col items-start justify-start sm:col-span-1">
            <ArmorInfo item={item} />
          </div>
        )}
        {WeaponItem.isWeaponItem(item) && (
          <div className="col-span-3 mb-2 flex w-full flex-col items-start justify-start sm:col-span-1">
            <WeaponInfo item={item} />
          </div>
        )}

        <div
          className={cn(
            'col-span-3 mb-2 flex flex-col items-start justify-start',
            columns === 2 ? ' sm:col-span-2' : 'sm:col-span-1',
          )}
        >
          <h4 className="text-left text-xs text-gray-500">Description</h4>
          <div className="whitespace-pre-line text-left text-xs text-gray-300">
            <DescriptionWithTags
              description={item.description || 'No description available.'}
            />
          </div>

          {(MutatorItem.isMutatorItem(item) || TraitItem.isTraitItem(item)) && (
            <div className="flex flex-col items-start justify-start">
              <h4 className="mt-4 text-left text-xs text-gray-500">
                At Max Level
              </h4>
              <div className="text-left text-xs text-gray-300">
                <DescriptionWithTags
                  description={
                    item.maxLevelBonus || 'No max level bonus found.'
                  }
                />
              </div>
            </div>
          )}

          {GenericItem.isGenericItem(item) && item.cooldown && (
            <div className="flex flex-col items-start justify-start">
              <h4 className="mt-4 text-left text-xs text-gray-500">Cooldown</h4>
              <p className="text-left text-xs text-gray-300">
                {item.cooldown}s
              </p>
            </div>
          )}

          <div className="flex flex-col items-start justify-start">
            <h4 className="mt-4 text-left text-xs text-gray-500">Wiki Links</h4>
            {item.wikiLinks?.map((link) => (
              <a
                key={link}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-left text-xs text-gray-300 underline hover:text-green-400"
              >
                {link}
              </a>
            )) ?? (
              <div className="text-left text-xs text-gray-300">
                No links found.
              </div>
            )}
          </div>
        </div>
      </div>
    </Dialog>
  )
}
