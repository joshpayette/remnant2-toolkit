import copy from 'clipboard-copy'
import Image from 'next/image'
import { toast } from 'react-toastify'

import { BaseButton } from '@/app/(components)/_base/button'
import {
  BaseDialog,
  BaseDialogBody,
  BaseDialogDescription,
  BaseDialogTitle,
} from '@/app/(components)/_base/dialog'
import { Link } from '@/app/(components)/_base/link'
import { BaseTextLink } from '@/app/(components)/_base/text'
import { ArmorInfo } from '@/app/(components)/armor-info'
import { DescriptionWithTokens } from '@/app/(components)/description-with-tokens'
import { WeaponInfo } from '@/app/(components)/weapon-info'
import { Item } from '@/app/(data)/items/types'
import { ArchetypeItem } from '@/app/(data)/items/types/ArchetypeItem'
import { ArmorItem } from '@/app/(data)/items/types/ArmorItem'
import { ModItem } from '@/app/(data)/items/types/ModItem'
import { MutatorItem } from '@/app/(data)/items/types/MutatorItem'
import { PerkItem } from '@/app/(data)/items/types/PerkItem'
import { SkillItem } from '@/app/(data)/items/types/SkillItem'
import { TraitItem } from '@/app/(data)/items/types/TraitItem'
import { WeaponItem } from '@/app/(data)/items/types/WeaponItem'
import { capitalize } from '@/app/(utils)/capitalize'
import { itemShareEndpoint } from '@/app/(utils)/clean-item-name'

interface Props {
  open: boolean
  item: Item | null
  onClose: () => void
}

export function ItemInfoDialog({ open, item, onClose }: Props) {
  if (!item) return null

  const imageSize = {
    width: 150,
    height: item.category === 'trait' ? 367 : 150,
  }

  let subtitle =
    item.category === 'relicfragment'
      ? 'Relic Fragment'
      : capitalize(item.category)
  if (PerkItem.isPerkItem(item)) {
    subtitle = `${item.linkedItems?.archetype?.name} ${capitalize(
      item.type,
    )} Perk`
  }

  return (
    <BaseDialog open={open} onClose={onClose}>
      <BaseDialogTitle>
        {item.name}
        <br />
        <span>{subtitle}</span>
      </BaseDialogTitle>
      <BaseDialogDescription>
        <span className="flex w-full flex-col items-center justify-center gap-x-2">
          <span className="flex w-full items-center justify-center gap-x-4 border-b border-t border-b-gray-800 border-t-gray-800 py-2 text-sm">
            {item.wikiLinks?.map((link) => (
              <BaseTextLink
                key={link}
                href={link}
                target="_blank"
                rel="noopener noreferrer"
              >
                Wiki Link
              </BaseTextLink>
            ))}
            <BaseButton
              aria-label="Copy link to item"
              onClick={() => {
                copy(itemShareEndpoint(item.name))
                toast.success('Copied link to clipboard')
              }}
            >
              Share
            </BaseButton>
          </span>
        </span>
      </BaseDialogDescription>
      <BaseDialogBody>
        <span className="flex w-full items-center justify-center">
          <Image
            src={`https://${process.env.NEXT_PUBLIC_IMAGE_URL}${item.imagePath}`}
            width={imageSize.width}
            height={imageSize.height}
            alt={item.name}
            className="h-auto max-h-full w-full max-w-[200px]"
            loading="eager"
          />
        </span>
      </BaseDialogBody>
      <BaseDialogTitle>Description</BaseDialogTitle>
      <BaseDialogBody>
        <span className="whitespace-pre-line">
          <DescriptionWithTokens
            description={item.description || 'No description available.'}
            highlightBuildTags={false}
            highlightItems={false}
          />
        </span>
      </BaseDialogBody>
      {MutatorItem.isMutatorItem(item) && (
        <BaseDialogBody className="flex flex-col items-start justify-start gap-x-2 gap-y-4">
          <span className="w-[120px] font-bold">At Max Level</span>{' '}
          <DescriptionWithTokens
            description={item.maxLevelBonus || 'No max level bonus found.'}
            highlightBuildTags={false}
            highlightItems={false}
          />
        </BaseDialogBody>
      )}

      {item.cooldown && (
        <BaseDialogBody className="flex flex-col items-start justify-start gap-x-2 gap-y-4">
          <span className="font-bold">Cooldown</span> {item.cooldown}s
        </BaseDialogBody>
      )}

      {item.linkedItems && (
        <div className="mt-6">
          <BaseDialogTitle>Linked Items</BaseDialogTitle>
          <BaseDialogBody className="flex w-full flex-col items-start justify-start">
            <ul className="w-full">
              {(SkillItem.isSkillItem(item) ||
                TraitItem.isTraitItem(item) ||
                PerkItem.isPerkItem(item)) &&
                item.linkedItems?.archetype && (
                  <li className="col-span-full text-left text-sm text-white">
                    <strong>Archetype</strong>:{' '}
                    <Link
                      href={`/item-lookup?categories=Trait,Archetype,Perk,Skill&searchText=${item.linkedItems.archetype.name}`}
                      className="text-gray-400 underline"
                      target="_blank"
                    >
                      {item.linkedItems.archetype.name}
                    </Link>
                  </li>
                )}
              {ArchetypeItem.isArchetypeItem(item) &&
                item.linkedItems.perks && (
                  <li className="text-left text-sm text-white">
                    <strong>Perks</strong>
                    <ul className="mb-4 grid  grid-cols-2 sm:grid-cols-3">
                      {item.linkedItems.perks?.map((perk) => (
                        <li
                          key={perk.name}
                          className="text-left text-sm text-white"
                        >
                          <Link
                            href={`/item-lookup?categories=Trait,Archetype,Perk,Skill&searchText=${perk.name}`}
                            className="text-gray-400 underline"
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
                  <li className="text-left text-sm text-white">
                    <strong>Skills</strong>
                    <ul className="mb-4 grid  grid-cols-2 sm:grid-cols-3">
                      {item.linkedItems.skills?.map((skill) => (
                        <li
                          key={skill.name}
                          className="text-left text-sm text-white"
                        >
                          <Link
                            href={`/item-lookup?categories=Trait,Archetype,Perk,Skill&searchText=${skill.name}`}
                            className="text-gray-400 underline"
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
                  <li className="text-left text-sm text-white">
                    <strong>Traits</strong>
                    <ul className="grid grid-cols-2 sm:grid-cols-3">
                      {item.linkedItems.traits?.map((trait) => (
                        <li
                          key={trait.name}
                          className="text-left text-sm text-white"
                        >
                          <Link
                            href={`/item-lookup?categories=Trait,Archetype,Perk,Skill&searchText=${trait.name}`}
                            className="text-gray-400 underline"
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
                <li className="col-span-full text-left text-sm text-white">
                  <strong>Mod</strong>:{' '}
                  <Link
                    href={`/item-lookup?searchText=${item.linkedItems.mod.name}`}
                    className="text-gray-400 underline"
                    target="_blank"
                  >
                    {item.linkedItems.mod.name}
                  </Link>
                </li>
              )}
              {ModItem.isModItem(item) && item.linkedItems?.weapon && (
                <li className="col-span-full text-left text-sm text-white">
                  <strong>Weapon</strong>:{' '}
                  <Link
                    href={`/item-lookup?searchText=${item.linkedItems.weapon.name}`}
                    className="text-gray-400 underline"
                    target="_blank"
                  >
                    {item.linkedItems.weapon.name}
                  </Link>
                </li>
              )}
            </ul>
          </BaseDialogBody>
        </div>
      )}
      <BaseDialogBody>
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
      </BaseDialogBody>
    </BaseDialog>
  )
}
