import { BaseButton } from '@repo/ui/base/button'
import { Link } from '@repo/ui/base/link'
import { cn } from '@repo/ui/classnames'
import { MagnifyMinusIcon } from '@repo/ui/icons/magnify-minus'
import { MagnifyPlusIcon } from '@repo/ui/icons/magnify-plus'
import { StatsIcon } from '@repo/ui/icons/stats'
import { getImageUrl } from '@repo/ui/utils/get-image-url'
import { capitalize } from '@repo/utils/capitalize'
import copy from 'clipboard-copy'
import Image from 'next/image'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useLocalStorage } from 'usehooks-ts'

import getItemBuildStats, {
  ItemBuildStats,
} from '@/app/(actions)/items/get-item-build-stats'
import { ArmorInfo } from '@/app/(components)/armor-info'
import { DescriptionWithTokens } from '@/app/(components)/description-with-tokens'
import { Tooltip } from '@/app/(components)/tooltip'
import { WeaponInfo } from '@/app/(components)/weapon-info'
import { Item } from '@/app/(data)/items/types'
import { ArchetypeItem } from '@/app/(data)/items/types/ArchetypeItem'
import { ArmorItem } from '@/app/(data)/items/types/ArmorItem'
import { ModItem } from '@/app/(data)/items/types/ModItem'
import { MutatorItem } from '@/app/(data)/items/types/MutatorItem'
import { PerkItem } from '@/app/(data)/items/types/PerkItem'
import { RelicFragmentItem } from '@/app/(data)/items/types/RelicFragmentItem'
import { SkillItem } from '@/app/(data)/items/types/SkillItem'
import { TraitItem } from '@/app/(data)/items/types/TraitItem'
import { WeaponItem } from '@/app/(data)/items/types/WeaponItem'
import {
  DEFAULT_ITEM_COMPARE_LIST,
  LOCALSTORAGE_KEY,
} from '@/app/(types)/localstorage'
import { itemShareEndpoint } from '@/app/(utils)/get-item-endpoint'

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
    LOCALSTORAGE_KEY.ITEM_COMPARE,
    DEFAULT_ITEM_COMPARE_LIST,
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

  let itemCategory: string = capitalize(category)
  if (RelicFragmentItem.isRelicFragmentItem(item)) {
    itemCategory = 'Relic Fragment'
  }
  if (PerkItem.isPerkItem(item)) {
    itemCategory = `${item.linkedItems?.archetype?.name} ${capitalize(
      item.type,
    )} Perk`
  }

  // #region Render

  return (
    <div className="divide-primary-800 border-primary-500 bg-background-solid col-span-1 flex flex-col divide-y rounded-lg border text-center shadow">
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
                  <BaseButton
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
                    <StatsIcon className="h-5 w-5" />
                  </BaseButton>
                </Tooltip>
              )}
            </div>
            <div className="flex w-full items-center justify-end">
              {itemBeingCompared ? (
                <Tooltip content="Remove from item comparison.">
                  <BaseButton outline onClick={handleRemoveItemFromCompare}>
                    <MagnifyMinusIcon className="h-5 w-5" />
                  </BaseButton>
                </Tooltip>
              ) : (
                <Tooltip content="Add to item comparison.">
                  <BaseButton outline onClick={handleAddItemToCompare}>
                    <MagnifyPlusIcon className="h-5 w-5" />
                  </BaseButton>
                </Tooltip>
              )}
            </div>
          </div>
        ) : null}
        <BaseButton
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
              ArchetypeItem.isArchetypeItem(item) && 'bg-black',
            )}
            width={sizes.width}
            height={sizes.height}
            src={getImageUrl(imagePath)}
            alt={`${name} icon`}
            loading="lazy"
          />

          {name}
        </BaseButton>
        <div className="mt-0 flex flex-grow flex-col justify-start text-xs">
          <div className="sr-only">Item Category</div>
          <div className="text-xs text-gray-400">{itemCategory}</div>
          {!ArmorItem.isArmorItem(item) && (
            <>
              <div className="sr-only">Description</div>
              <div className="mt-3 flex flex-col gap-y-2 whitespace-pre-line text-left text-xs text-gray-200">
                <DescriptionWithTokens
                  description={description ?? ''}
                  highlightBuildTokens={false}
                  highlightExternalTokens={true}
                  highlightItems={false}
                />
                {item.externalTokens && (
                  <DescriptionWithTokens
                    description={item.externalTokens.join(', ')}
                    highlightBuildTokens={false}
                    highlightExternalTokens={true}
                    highlightItems={false}
                  />
                )}
              </div>
            </>
          )}

          {MutatorItem.isMutatorItem(item) && (
            <div className="mt-3 whitespace-pre-line text-left text-xs text-gray-200">
              <strong>At Max Level: </strong>
              <DescriptionWithTokens
                description={item.maxLevelBonus || 'No max level bonus found.'}
                highlightBuildTokens={false}
                highlightExternalTokens={true}
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
                className="text-secondary-500 flex items-center justify-end text-right text-xs font-bold underline"
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
                className="text-secondary-500 flex items-center justify-end text-right text-xs font-bold underline"
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
                className="text-secondary-500 flex items-center justify-end text-right text-xs font-bold underline"
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
                className="text-secondary-500 flex items-center justify-end text-right text-xs font-bold underline"
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
                  className="text-secondary-500 flex items-center justify-end text-right text-xs font-bold underline"
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
                  className="text-secondary-500 flex items-center justify-end text-right text-xs font-bold underline"
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
                  className="text-secondary-500 flex items-center justify-end text-right text-xs font-bold underline"
                  target="_blank"
                >
                  {trait.name}
                </Link>
              </div>
            </div>
          ))}
      </div>
      <div>
        <div className="divide-primary-800 -mt-px grid grid-cols-2 divide-x">
          <BaseButton
            plain
            className="relative flex items-center justify-center"
            aria-label="Share Item Link"
            onClick={() => {
              copy(itemShareEndpoint(item.name))
              toast.success('Copied link to clipboard')
            }}
          >
            Share
          </BaseButton>

          <div className="flex w-full items-center justify-center">
            <BaseButton
              plain
              onClick={() => onMoreInfoClick(item)}
              aria-label="More Info"
              className="w-full"
            >
              Info
            </BaseButton>
          </div>
        </div>
      </div>
    </div>
  )
}
