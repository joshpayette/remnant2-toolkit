import copy from 'clipboard-copy'
import Image from 'next/image'
import { toast } from 'react-toastify'

import { capitalize } from '@/lib/capitalize'
import { cn } from '@/lib/classnames'

import { Dialog } from '../../ui/Dialog'
import { cleanItemName } from '../lib/cleanItemName'
import { Item } from '../types'
import { ArchetypeItem } from '../types/ArchetypeItem'
import { ArmorItem } from '../types/ArmorItem'
import { ModItem } from '../types/ModItem'
import { MutatorItem } from '../types/MutatorItem'
import { PerkItem } from '../types/PerkItem'
import { SkillItem } from '../types/SkillItem'
import { TraitItem } from '../types/TraitItem'
import { WeaponItem } from '../types/WeaponItem'
import { ArmorInfo } from './ArmorInfo'
import { DescriptionWithTags } from './DescriptionWithTags'
import { WeaponInfo } from './WeaponInfo'

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
      title={<div className="text-xl text-purple-500">{item.name}</div>}
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
                className="text-green-500 underline hover:text-green-700"
              >
                Wiki Link
              </a>
            ))}
            <button
              className="text-green-500 underline hover:text-green-700"
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
      maxWidthClass="max-w-2xl"
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
          <h4 className="text-left text-sm text-gray-400">Description</h4>
          <div className="whitespace-pre-line text-left text-sm text-gray-300">
            <DescriptionWithTags
              description={item.description || 'No description available.'}
            />
          </div>

          {(MutatorItem.isMutatorItem(item) || TraitItem.isTraitItem(item)) && (
            <div className="flex flex-col items-start justify-start">
              <h4 className="mt-4 text-left text-sm text-gray-400">
                At Max Level
              </h4>
              <div className="text-left text-sm text-gray-300">
                <DescriptionWithTags
                  description={
                    item.maxLevelBonus || 'No max level bonus found.'
                  }
                />
              </div>
            </div>
          )}

          {item.cooldown && (
            <div className="flex flex-col items-start justify-start">
              <h4 className="mt-4 text-left text-sm text-gray-400">Cooldown</h4>
              <p className="text-left text-sm text-gray-300">
                {item.cooldown}s
              </p>
            </div>
          )}

          {item.linkedItems && (
            <div className="flex flex-col items-start justify-start">
              <h4 className="mt-4 text-left text-sm text-gray-400">
                Linked Items
              </h4>
              <ul className="grid w-full grid-cols-3 gap-x-4">
                {(SkillItem.isSkillItem(item) ||
                  TraitItem.isTraitItem(item) ||
                  PerkItem.isPerkItem(item)) &&
                  item.linkedItems?.archetype && (
                    <li className="col-span-full text-left text-sm text-gray-300">
                      <strong>Archetype</strong>:{' '}
                      <a
                        href={`/item-lookup?searchText=${item.linkedItems.archetype.name}`}
                        className="text-purple-500 underline"
                      >
                        {item.linkedItems.archetype.name}
                      </a>
                    </li>
                  )}
                {ArchetypeItem.isArchetypeItem(item) &&
                  item.linkedItems.perks && (
                    <li className="text-left text-sm text-gray-300">
                      <strong>Perks</strong>
                      <ul>
                        {item.linkedItems.perks?.map((perk) => (
                          <li
                            key={perk.name}
                            className="text-left text-sm text-gray-300"
                          >
                            <a
                              href={`/item-lookup?searchText=${perk.name}`}
                              className="text-purple-500 underline"
                            >
                              {perk.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </li>
                  )}

                {ArchetypeItem.isArchetypeItem(item) &&
                  item.linkedItems.skills && (
                    <li className="text-left text-sm text-gray-300">
                      <strong>Skills</strong>
                      <ul>
                        {item.linkedItems.skills?.map((skill) => (
                          <li
                            key={skill.name}
                            className="text-left text-sm text-gray-300"
                          >
                            <a
                              href={`/item-lookup?searchText=${skill.name}`}
                              className="text-purple-500 underline"
                            >
                              {skill.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </li>
                  )}

                {ArchetypeItem.isArchetypeItem(item) &&
                  item.linkedItems.traits && (
                    <li className="text-left text-sm text-gray-300">
                      <strong>Traits</strong>
                      <ul>
                        {item.linkedItems.traits?.map((trait) => (
                          <li
                            key={trait.name}
                            className="text-left text-sm text-gray-300"
                          >
                            <a
                              href={`/item-lookup?searchText=${trait.name}`}
                              className="text-purple-500 underline"
                            >
                              {trait.name}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </li>
                  )}
                {WeaponItem.isWeaponItem(item) && item.linkedItems?.mod && (
                  <li className="col-span-full text-left text-sm text-gray-300">
                    <strong>Mod</strong>:{' '}
                    <a
                      href={`/item-lookup?searchText=${item.linkedItems.mod.name}`}
                      className="text-purple-500 underline"
                    >
                      {item.linkedItems.mod.name}
                    </a>
                  </li>
                )}
                {ModItem.isModItem(item) && item.linkedItems?.weapon && (
                  <li className="col-span-full text-left text-sm text-gray-300">
                    <strong>Weapon</strong>:{' '}
                    <a
                      href={`/item-lookup?searchText=${item.linkedItems.weapon.name}`}
                      className="text-purple-500 underline"
                    >
                      {item.linkedItems.weapon.name}
                    </a>
                  </li>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </Dialog>
  )
}
