import copy from 'clipboard-copy'
import Image from 'next/image'
import Link from 'next/link'
import { toast } from 'react-toastify'

import { ArmorInfo } from '@/features/armor-calculator/ArmorInfo'
import { WeaponInfo } from '@/features/items/components/WeaponInfo'
import { cleanItemName } from '@/features/items/lib/cleanItemName'
import { Item } from '@/features/items/types'
import { ArchetypeItem } from '@/features/items/types/ArchetypeItem'
import { ArmorItem } from '@/features/items/types/ArmorItem'
import { ModItem } from '@/features/items/types/ModItem'
import { MutatorItem } from '@/features/items/types/MutatorItem'
import { PerkItem } from '@/features/items/types/PerkItem'
import { SkillItem } from '@/features/items/types/SkillItem'
import { TraitItem } from '@/features/items/types/TraitItem'
import { WeaponItem } from '@/features/items/types/WeaponItem'
import { DescriptionWithTags } from '@/features/ui/DescriptionWithTags'
import { Dialog } from '@/features/ui/Dialog'
import { capitalize } from '@/lib/capitalize'
import { cn } from '@/lib/classnames'

interface ItemInfoProps {
  item: Item | null
  open: boolean
  onClose: () => void
}

export function ItemInfoDialog({ item, open, onClose }: ItemInfoProps) {
  if (!item) return null

  // Only add the third column for certain items
  const columns =
    ArmorItem.isArmorItem(item) || WeaponItem.isWeaponItem(item) ? 3 : 2

  const imageSize = {
    width: 150,
    height: item.category === 'trait' ? 367 : 150,
  }

  let subtitle =
    item.category === 'relicfragment'
      ? 'Relic Fragment'
      : capitalize(item.category)
  if (PerkItem.isPerkItem(item)) {
    subtitle += ` - ${capitalize(item.type)}`
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title={<div className="text-xl text-secondary-500">{item.name}</div>}
      subtitle={
        <span className="flex w-full flex-col items-center justify-center gap-x-2">
          <span className="text-sm text-gray-400">{subtitle}</span>
          <span className="mt-2 flex w-full items-center justify-center gap-x-2 border-b border-t border-b-gray-800 border-t-gray-800 py-2 text-sm">
            {item.wikiLinks?.map((link) => (
              <a
                key={link}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-500 underline hover:text-primary-700"
              >
                Wiki Link
              </a>
            ))}
            <button
              className="text-primary-500 underline hover:text-primary-700"
              aria-label="Copy link to item"
              onClick={() => {
                copy(
                  `https://remnant2toolkit.com/endpoint/item/${cleanItemName(
                    item,
                  )}`,
                )
                toast.success('Copied link to clipboard')
              }}
            >
              Share
            </button>
          </span>
        </span>
      }
      maxWidthClass="max-w-md"
    >
      <div className="grid-cols-full grid gap-4">
        <div className="col-span-3 flex w-full flex-col items-center justify-start sm:justify-center">
          <div className="flex w-full items-center justify-center">
            <Image
              src={`https://${process.env.NEXT_PUBLIC_IMAGE_URL}${item.imagePath}`}
              width={imageSize.width}
              height={imageSize.height}
              alt={item.name}
              className="h-auto max-h-full w-full max-w-[200px]"
              loading="eager"
            />
          </div>
          <div
            className={cn(
              'col-span-full mb-2 mt-2 flex w-full flex-col items-start justify-start',
            )}
          >
            <h4 className="w-full text-left text-sm text-gray-400">
              Description
            </h4>
            <div className="whitespace-pre-line text-left text-sm text-gray-300">
              <DescriptionWithTags
                description={item.description || 'No description available.'}
                highlightBuildTags={false}
                highlightItems={false}
              />
            </div>

            {(MutatorItem.isMutatorItem(item) ||
              TraitItem.isTraitItem(item)) && (
              <div className="flex flex-col items-start justify-start">
                <h4 className="mt-4 text-left text-sm text-gray-400">
                  At Max Level
                </h4>
                <div className="text-left text-sm text-gray-300">
                  <DescriptionWithTags
                    description={
                      item.maxLevelBonus || 'No max level bonus found.'
                    }
                    highlightBuildTags={false}
                    highlightItems={false}
                  />
                </div>
              </div>
            )}

            {item.cooldown && (
              <div className="flex flex-col items-start justify-start">
                <h4 className="mt-4 text-left text-sm text-gray-400">
                  Cooldown
                </h4>
                <p className="text-left text-sm text-gray-300">
                  {item.cooldown}s
                </p>
              </div>
            )}

            {item.linkedItems && (
              <div className="flex w-full flex-col items-start justify-start">
                <h4 className="mt-4 text-left text-sm text-gray-400">
                  Linked Items
                </h4>
                <ul className="w-full p-2">
                  {(SkillItem.isSkillItem(item) ||
                    TraitItem.isTraitItem(item) ||
                    PerkItem.isPerkItem(item)) &&
                    item.linkedItems?.archetype && (
                      <li className="col-span-full text-left text-sm text-gray-300">
                        <strong>Archetype</strong>:{' '}
                        <Link
                          href={`/item-lookup?categories=Trait,Archetype,Perk,Skill&searchText=${item.linkedItems.archetype.name}`}
                          className="text-secondary-500 underline hover:text-secondary-300"
                          target="_blank"
                        >
                          {item.linkedItems.archetype.name}
                        </Link>
                      </li>
                    )}
                  {ArchetypeItem.isArchetypeItem(item) &&
                    item.linkedItems.perks && (
                      <li className="text-left text-sm text-gray-300">
                        <strong>Perks</strong>
                        <ul className="mb-4 grid list-disc grid-cols-2 sm:grid-cols-3">
                          {item.linkedItems.perks?.map((perk) => (
                            <li
                              key={perk.name}
                              className="text-left text-sm text-gray-300"
                            >
                              <Link
                                href={`/item-lookup?categories=Trait,Archetype,Perk,Skill&searchText=${perk.name}`}
                                className="text-secondary-500 underline hover:text-secondary-300"
                                target="_blank"
                              >
                                {perk.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </li>
                    )}

                  {ArchetypeItem.isArchetypeItem(item) &&
                    item.linkedItems.skills && (
                      <li className="text-left text-sm text-gray-300">
                        <strong>Skills</strong>
                        <ul className="mb-4 grid list-disc grid-cols-2 sm:grid-cols-3">
                          {item.linkedItems.skills?.map((skill) => (
                            <li
                              key={skill.name}
                              className="text-left text-sm text-gray-300"
                            >
                              <Link
                                href={`/item-lookup?categories=Trait,Archetype,Perk,Skill&searchText=${skill.name}`}
                                className="text-secondary-500 underline hover:text-secondary-300"
                                target="_blank"
                              >
                                {skill.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </li>
                    )}

                  {ArchetypeItem.isArchetypeItem(item) &&
                    item.linkedItems.traits && (
                      <li className="text-left text-sm text-gray-300">
                        <strong>Traits</strong>
                        <ul className="grid list-disc grid-cols-2 sm:grid-cols-3">
                          {item.linkedItems.traits?.map((trait) => (
                            <li
                              key={trait.name}
                              className="text-left text-sm text-gray-300"
                            >
                              <Link
                                href={`/item-lookup?categories=Trait,Archetype,Perk,Skill&searchText=${trait.name}`}
                                className="text-secondary-500 underline hover:text-secondary-300"
                                target="_blank"
                              >
                                {trait.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </li>
                    )}
                  {WeaponItem.isWeaponItem(item) && item.linkedItems?.mod && (
                    <li className="col-span-full text-left text-sm text-gray-300">
                      <strong>Mod</strong>:{' '}
                      <Link
                        href={`/item-lookup?searchText=${item.linkedItems.mod.name}`}
                        className="text-secondary-500 underline hover:text-secondary-300"
                        target="_blank"
                      >
                        {item.linkedItems.mod.name}
                      </Link>
                    </li>
                  )}
                  {ModItem.isModItem(item) && item.linkedItems?.weapon && (
                    <li className="col-span-full text-left text-sm text-gray-300">
                      <strong>Weapon</strong>:{' '}
                      <Link
                        href={`/item-lookup?searchText=${item.linkedItems.weapon.name}`}
                        className="text-secondary-500 underline hover:text-secondary-300"
                        target="_blank"
                      >
                        {item.linkedItems.weapon.name}
                      </Link>
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>

        {ArmorItem.isArmorItem(item) && (
          <div className="col-span-3 mb-2 flex w-full flex-col items-start justify-start">
            <ArmorInfo item={item} />
          </div>
        )}
        {WeaponItem.isWeaponItem(item) && (
          <div className="col-span-3 mb-2 flex w-full flex-col items-start justify-start">
            <WeaponInfo item={item} includeMod={false} />
          </div>
        )}
      </div>
    </Dialog>
  )
}
