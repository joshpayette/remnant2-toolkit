import {
  ChartBarSquareIcon,
  MagnifyingGlassMinusIcon,
  MagnifyingGlassPlusIcon,
  ShareIcon,
} from '@heroicons/react/24/solid'
import copy from 'clipboard-copy'
import Image from 'next/image'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useLocalStorage } from 'usehooks-ts'

import { Button } from '@/app/(components)/base/button'
import { Link } from '@/app/(components)/base/link'
import { getArrayOfLength } from '@/features/build/lib/getArrayOfLength'
import getItemBuildStats from '@/features/items/actions/getItemBuildStats'
import { Tooltip } from '@/features/ui/Tooltip'
import { cn } from '@/lib/classnames'

import { ArchetypeItem } from '../../../app/(data)/items/types/ArchetypeItem'
import { ArmorItem } from '../../../app/(data)/items/types/ArmorItem'
import { ModItem } from '../../../app/(data)/items/types/ModItem'
import { MutatorItem } from '../../../app/(data)/items/types/MutatorItem'
import { PerkItem } from '../../../app/(data)/items/types/PerkItem'
import { SkillItem } from '../../../app/(data)/items/types/SkillItem'
import { TraitItem } from '../../../app/(data)/items/types/TraitItem'
import { WeaponItem } from '../../../app/(data)/items/types/WeaponItem'
import { ArmorInfo } from '../../armor-calculator/ArmorInfo'
import { DescriptionWithTags } from '../../ui/DescriptionWithTags'
import { cleanItemName } from '../lib/cleanItemName'
import { Item, ItemBuildStats } from '../types'
import { WeaponInfo } from './WeaponInfo'

interface Props {
  allowItemCompare?: boolean
  index?: number
  data: Item
  width?: number
  onMoreInfoClick: (item: Item) => void
}

export function ItemCard({
  allowItemCompare = false,
  data: item,
  onMoreInfoClick,
}: Props) {
  const [itemsToCompare, setItemsToCompare] = useLocalStorage<string[]>(
    'item-lookup-compare',
    getArrayOfLength(5).map(() => ''),
    { initializeWithValue: false },
  )
  const itemBeingCompared = itemsToCompare.includes(item.id)

  const [itemBuildStats, setItemBuildStats] = useState<ItemBuildStats | null>(
    null,
  )

  const { imagePath, category, name, description } = item

  let sizes = {
    width: 96,
    height: 96,
  }

  if (TraitItem.isTraitItem(item)) {
    sizes = {
      width: 48,
      height: 96,
    }
  }

  if (WeaponItem.isWeaponItem(item)) {
    sizes = {
      width: 128,
      height: 64,
    }
  }

  function handleAddItemToCompare() {
    // If no empty slots, return
    const emptySlots = itemsToCompare.filter((id) => id === '')
    if (emptySlots.length === 0) return

    // Find the next empty slot and add to it
    const itemIndex = itemsToCompare.findIndex((id) => id === '')
    const newItemsToCompare = [...itemsToCompare]
    newItemsToCompare[itemIndex] = item.id
    setItemsToCompare(newItemsToCompare)
  }

  function handleRemoveItemFromCompare() {
    const newItemsToCompare = itemsToCompare.map((id) =>
      id === item.id ? '' : id,
    )
    setItemsToCompare(newItemsToCompare)
  }

  return (
    <div className="col-span-1 flex flex-col divide-y divide-primary-800 rounded-lg border border-primary-500 bg-black text-center shadow">
      <div className="flex flex-1 flex-col p-4">
        {allowItemCompare ? (
          <div className="flex w-full items-center justify-center">
            <div className="flex w-full items-center justify-start">
              {itemBuildStats ? (
                <div className="flex items-center gap-1 text-[11px] text-gray-200">
                  <div className="flex flex-col items-center justify-start">
                    <span className="underline">Featured</span>
                    <span>
                      <span>{itemBuildStats.featured.usedIn}</span>
                      <span>/</span>
                      <span>{itemBuildStats.featured.total}</span>
                    </span>
                  </div>
                  <div className="flex flex-col items-center justify-start">
                    <span className="underline">Community</span>
                    <span>
                      <span>{itemBuildStats.community.usedIn}</span>
                      <span>/</span>
                      <span>{itemBuildStats.community.total}</span>
                    </span>
                  </div>
                </div>
              ) : (
                <Tooltip content="Get stats on how many featured and community builds the item is used in.">
                  <Button
                    outline
                    onClick={async () => {
                      const response = await getItemBuildStats(item.id)
                      if (!response.success) {
                        toast.error('Failed to get build stats')
                        return
                      }
                      setItemBuildStats(response.stats)
                    }}
                  >
                    <ChartBarSquareIcon className="h-5 w-5" />
                  </Button>
                </Tooltip>
              )}
            </div>
            <div className="flex w-full items-center justify-end">
              {itemBeingCompared ? (
                <Tooltip content="Remove from item comparison.">
                  <Button outline onClick={handleRemoveItemFromCompare}>
                    <MagnifyingGlassMinusIcon className="h-5 w-5" />
                  </Button>
                </Tooltip>
              ) : (
                <Tooltip content="Add to item comparison.">
                  <Button outline onClick={handleAddItemToCompare}>
                    <MagnifyingGlassPlusIcon className="h-5 w-5" />
                  </Button>
                </Tooltip>
              )}
            </div>
          </div>
        ) : null}
        <Button
          plain
          onClick={() => onMoreInfoClick(item)}
          aria-label="More Info"
          className="flex flex-col items-center justify-center"
        >
          <Image
            className={cn(
              'mx-auto mb-2 h-[96px] w-[96px] flex-shrink-0 rounded-full',
              TraitItem.isTraitItem(item) && 'h-[96px] w-[48px]',
              WeaponItem.isWeaponItem(item) && 'h-[64px] w-[128px]',
            )}
            width={sizes.width}
            height={sizes.height}
            src={`https://${process.env.NEXT_PUBLIC_IMAGE_URL}${imagePath}`}
            alt={`${name} icon`}
            loading="lazy"
          />

          {name}
        </Button>
        <div className="mt-0 flex flex-grow flex-col justify-start text-xs">
          <div className="sr-only">Item Category</div>
          <div className="text-xs text-gray-400">
            {category === 'relicfragment' ? 'relic fragment' : category}
          </div>
          {!ArmorItem.isArmorItem(item) && (
            <>
              <div className="sr-only">Description</div>
              <div className="mt-3 whitespace-pre-line text-left text-xs text-gray-200">
                <DescriptionWithTags
                  description={description ?? ''}
                  highlightBuildTags={false}
                  highlightItems={false}
                />
              </div>
            </>
          )}

          {(MutatorItem.isMutatorItem(item) || TraitItem.isTraitItem(item)) && (
            <div className="mt-3 whitespace-pre-line text-left text-xs text-gray-200">
              <strong>At Max Level: </strong>
              <DescriptionWithTags
                description={item.maxLevelBonus || 'No max level bonus found.'}
                highlightBuildTags={false}
                highlightItems={false}
              />
            </div>
          )}

          {item.cooldown && (
            <div className="mt-3 whitespace-pre-line text-left text-xs text-gray-200">
              <strong>Cooldown</strong>: {item.cooldown}s
            </div>
          )}
        </div>
        {ArmorItem.isArmorItem(item) && (
          <div className="mt-4">
            <ArmorInfo item={item} />
          </div>
        )}
        {WeaponItem.isWeaponItem(item) && (
          <div className="mt-4">
            <WeaponInfo item={item} />
          </div>
        )}
        {PerkItem.isPerkItem(item) && item.linkedItems?.archetype && (
          <div className="mt-4">
            <div className="grid w-full grid-cols-2 gap-2 border border-transparent   py-1 text-left text-sm text-gray-300">
              <p className="flex items-center justify-start text-xs">
                Archetype
              </p>
              <Link
                href={`/item-lookup?categories=Trait,Archetype,Perk,Skill&searchText=${item.linkedItems.archetype.name}`}
                className="flex items-center justify-end text-right text-xs font-bold text-secondary-500 underline"
                target="_blank"
              >
                {item.linkedItems.archetype.name}
              </Link>
            </div>
          </div>
        )}
        {SkillItem.isSkillItem(item) && item.linkedItems?.archetype && (
          <div className="mt-4">
            <div className="grid w-full grid-cols-2 gap-2 border border-transparent   py-1 text-left text-sm text-gray-300">
              <p className="flex items-center justify-start text-xs">
                Archetype
              </p>
              <Link
                href={`/item-lookup?categories=Trait,Archetype,Perk,Skill&searchText=${item.linkedItems.archetype.name}`}
                className="flex items-center justify-end text-right text-xs font-bold text-secondary-500 underline"
                target="_blank"
              >
                {item.linkedItems.archetype.name}
              </Link>
            </div>
          </div>
        )}
        {TraitItem.isTraitItem(item) && item.linkedItems?.archetype && (
          <div className="mt-4">
            <div className="grid w-full grid-cols-2 gap-2 border border-transparent   py-1 text-left text-sm text-gray-300">
              <p className="flex items-center justify-start text-xs">
                Archetype
              </p>
              <Link
                href={`/item-lookup?categories=Trait,Archetype,Perk,Skill&searchText=${item.linkedItems.archetype.name}`}
                className="flex items-center justify-end text-right text-xs font-bold text-secondary-500 underline"
                target="_blank"
              >
                {item.linkedItems.archetype.name}
              </Link>
            </div>
          </div>
        )}
        {ModItem.isModItem(item) && item.linkedItems?.weapon && (
          <div className="mt-4">
            <div className="grid w-full grid-cols-2 gap-2 border border-transparent   py-1 text-left text-sm text-gray-300">
              <p className="flex items-center justify-start text-xs">Weapon</p>
              <Link
                href={`/item-lookup?searchText=${item.linkedItems.weapon.name}`}
                className="flex items-center justify-end text-right text-xs font-bold text-secondary-500 underline"
                target="_blank"
              >
                {item.linkedItems.weapon.name}
              </Link>
            </div>
          </div>
        )}
        {ArchetypeItem.isArchetypeItem(item) &&
          item.linkedItems?.perks &&
          item.linkedItems.perks.map((perk, index) => (
            <div className={cn(index === 0 && 'mt-4')} key={perk.name}>
              <div
                className={cn(
                  'grid w-full grid-cols-2 gap-2 border border-transparent  py-1 text-left text-sm text-gray-300',
                  index === 0 && '',
                )}
              >
                <p className="flex items-center justify-start text-xs">Perk</p>
                <Link
                  href={`/item-lookup?categories=Trait,Archetype,Perk,Skill&searchText=${perk.name}`}
                  className="flex items-center justify-end text-right text-xs font-bold text-secondary-500 underline"
                  target="_blank"
                >
                  {perk.name}
                </Link>
              </div>
            </div>
          ))}
        {ArchetypeItem.isArchetypeItem(item) &&
          item.linkedItems?.skills &&
          item.linkedItems.skills.map((skill) => (
            <div key={skill.name}>
              <div
                className={cn(
                  'grid w-full grid-cols-2 gap-2 border border-transparent  py-1 text-left text-sm text-gray-300',
                )}
              >
                <p className="flex items-center justify-start text-xs">Skill</p>
                <Link
                  href={`/item-lookup?categories=Trait,Archetype,Perk,Skill&searchText=${skill.name}`}
                  className="flex items-center justify-end text-right text-xs font-bold text-secondary-500 underline"
                  target="_blank"
                >
                  {skill.name}
                </Link>
              </div>
            </div>
          ))}
        {ArchetypeItem.isArchetypeItem(item) &&
          item.linkedItems?.traits &&
          item.linkedItems.traits.slice(0, 1).map((trait) => (
            <div key={trait.name}>
              <div
                className={cn(
                  'grid w-full grid-cols-2 gap-2 border border-transparent  py-1 text-left text-sm text-gray-300',
                )}
              >
                <p className="flex items-center justify-start text-xs">Trait</p>
                <Link
                  href={`/item-lookup?categories=Trait,Archetype,Perk,Skill&searchText=${trait.name}`}
                  className="flex items-center justify-end text-right text-xs font-bold text-secondary-500 underline"
                  target="_blank"
                >
                  {trait.name}
                </Link>
              </div>
            </div>
          ))}
      </div>
      <div>
        <div className="-mt-px flex divide-x divide-primary-800">
          <Button
            plain
            className="relative inline-flex flex-1 items-center justify-center gap-x-1"
            aria-label="Share Item Link"
            onClick={() => {
              copy(
                `https://remnant2toolkit.com/endpoint/item/${cleanItemName(
                  item,
                )}`,
              )
              toast.success('Copied link to clipboard')
            }}
          >
            <ShareIcon className="h-4 w-4" aria-hidden="true" />
            Share
          </Button>

          <div className="-ml-px flex w-0 flex-1">
            <div className="flex w-0 flex-1">
              <Button
                plain
                onClick={() => onMoreInfoClick(item)}
                aria-label="More Info"
                className="w-full"
              >
                <Image
                  src={`https://${process.env.NEXT_PUBLIC_IMAGE_URL}/toolkit/info-yellow.png`}
                  alt="Info icon"
                  width={16}
                  height={16}
                  className="h-4 w-4"
                />
                Info
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
