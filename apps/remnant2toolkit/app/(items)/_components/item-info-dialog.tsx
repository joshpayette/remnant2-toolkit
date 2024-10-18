import {
  BaseButton,
  BaseDialog,
  BaseDialogBody,
  BaseDialogDescription,
  BaseDialogTitle,
  BaseLink,
  BaseTextLink,
  cn,
  getImageUrl,
} from '@repo/ui';
import { capitalize } from '@repo/utils';
import copy from 'clipboard-copy';
import Image from 'next/image';
import { toast } from 'react-toastify';

import { DescriptionWithTokens } from '@/app/_components/description-with-tokens';
import { RELEASE_TO_NAME } from '@/app/_constants/releases';
import { ArmorInfo } from '@/app/(items)/_components/armor-info';
import { WeaponInfo } from '@/app/(items)/_components/weapon-info';
import { ArchetypeItem } from '@/app/(items)/_types/archetype-item';
import { ArmorItem } from '@/app/(items)/_types/armor-item';
import { type Item } from '@/app/(items)/_types/item';
import {
  BIOMES,
  DUNGEON_OVERRIDES,
  type ItemLocation,
} from '@/app/(items)/_types/locations';
import { ModItem } from '@/app/(items)/_types/mod-item';
import { MutatorItem } from '@/app/(items)/_types/mutator-item';
import { PerkItem } from '@/app/(items)/_types/perk-item';
import { SkillItem } from '@/app/(items)/_types/skill-item';
import { TraitItem } from '@/app/(items)/_types/trait-item';
import { WeaponItem } from '@/app/(items)/_types/weapon-item';
import { itemShareEndpoint } from '@/app/(items)/_utils/get-item-endpoint';

function generateDungeonLabel(location: ItemLocation, itemId: string) {
  let label = `${location.world} - `;

  if (location.dungeon) {
    if (Array.isArray(location.dungeon)) {
      label += `${location.dungeon.join(', ')}`;
    } else {
      label += `${location.dungeon}`;
    }
  } else if (location.biome) {
    const dungeonOverride = DUNGEON_OVERRIDES.find((o) => o.itemId === itemId);

    if (dungeonOverride) {
      label += `${dungeonOverride.dungeons.join(', ')}`;
    } else {
      const biome = BIOMES.find((b) => b.name === location.biome);
      label += `${biome?.dungeons.join(', ')}`;
    }
  }

  return label;
}

interface Props {
  open: boolean;
  item: Item | null;
  onClose: () => void;
}

export function ItemInfoDialog({ open, item, onClose }: Props) {
  if (!item) return null;

  const imageSize = {
    width: 150,
    height: item.category === 'trait' ? 367 : 150,
  };

  let subtitle =
    item.category === 'relicfragment'
      ? 'Relic Fragment'
      : capitalize(item.category);
  if (PerkItem.isPerkItem(item)) {
    subtitle = `${item.linkedItems?.archetype?.name} ${capitalize(
      item.type,
    )} Perk`;
  }

  return (
    <BaseDialog open={open} onClose={onClose}>
      <BaseDialogTitle>
        {item.name}
        <br />
        <span className="text-md font-normal">{subtitle}</span>
        {item.location && (
          <div className="mt-2 grid grid-cols-3 gap-1">
            <div className="col-span-2 flex flex-col items-start justify-start">
              <span className="text-xs font-normal">
                {generateDungeonLabel(item.location, item.id)}
              </span>
              {!item.location.dungeon && item.location.injectable && (
                <span className="mt-1 text-xs font-normal italic">
                  {item.location?.injectable} injectable
                </span>
              )}
            </div>
            <div className="flex flex-col items-end justify-start text-right">
              {RELEASE_TO_NAME[item.dlc] && (
                <span className="text-xs font-normal">
                  Requires {RELEASE_TO_NAME[item.dlc]}
                </span>
              )}
            </div>
          </div>
        )}
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
                copy(itemShareEndpoint(item.name));
                toast.success('Copied link to clipboard');
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
            src={getImageUrl(item.imagePath)}
            width={imageSize.width}
            height={imageSize.height}
            alt={item.name}
            className={cn(
              'h-auto max-h-full w-full max-w-[200px]',
              ArchetypeItem.isArchetypeItem(item) && 'bg-black',
            )}
            loading="eager"
          />
        </span>
      </BaseDialogBody>
      <BaseDialogTitle>Description</BaseDialogTitle>
      <BaseDialogBody>
        <div className="mt-3 flex flex-col gap-y-2 whitespace-pre-line text-left text-gray-200">
          <DescriptionWithTokens
            description={item.description ?? ''}
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
        {MutatorItem.isMutatorItem(item) && (
          <BaseDialogBody className="flex flex-col items-start justify-start gap-x-2 gap-y-4">
            <span className="w-[120px] font-bold">At Max Level</span>{' '}
            <DescriptionWithTokens
              description={item.maxLevelBonus || 'No max level bonus found.'}
              highlightBuildTokens={false}
              highlightExternalTokens={true}
              highlightItems={false}
            />
          </BaseDialogBody>
        )}
      </BaseDialogBody>

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
                  <li className="text-surface-solid col-span-full text-left text-sm">
                    <strong>Archetype</strong>:{' '}
                    <BaseLink
                      href={`/item-lookup?categories=Trait,Archetype,Perk,Skill&searchText=${item.linkedItems.archetype.name}`}
                      className="text-gray-400 underline"
                      target="_blank"
                    >
                      {item.linkedItems.archetype.name}
                    </BaseLink>
                  </li>
                )}
              {ArchetypeItem.isArchetypeItem(item) &&
                item.linkedItems.perks && (
                  <li className="text-surface-solid text-left text-sm">
                    <strong>Perks</strong>
                    <ul className="mb-4 grid  grid-cols-2 sm:grid-cols-3">
                      {item.linkedItems.perks?.map((perk) => (
                        <li
                          key={perk.name}
                          className="text-surface-solid text-left text-sm"
                        >
                          <BaseLink
                            href={`/item-lookup?categories=Trait,Archetype,Perk,Skill&searchText=${perk.name}`}
                            className="text-gray-400 underline"
                            target="_blank"
                          >
                            {perk.name}
                          </BaseLink>
                        </li>
                      ))}
                    </ul>
                  </li>
                )}

              {ArchetypeItem.isArchetypeItem(item) &&
                item.linkedItems.skills && (
                  <li className="text-surface-solid text-left text-sm">
                    <strong>Skills</strong>
                    <ul className="mb-4 grid  grid-cols-2 sm:grid-cols-3">
                      {item.linkedItems.skills?.map((skill) => (
                        <li
                          key={skill.name}
                          className="text-surface-solid text-left text-sm"
                        >
                          <BaseLink
                            href={`/item-lookup?categories=Trait,Archetype,Perk,Skill&searchText=${skill.name}`}
                            className="text-gray-400 underline"
                            target="_blank"
                          >
                            {skill.name}
                          </BaseLink>
                        </li>
                      ))}
                    </ul>
                  </li>
                )}

              {ArchetypeItem.isArchetypeItem(item) &&
                item.linkedItems.traits && (
                  <li className="text-surface-solid text-left text-sm">
                    <strong>Traits</strong>
                    <ul className="grid grid-cols-2 sm:grid-cols-3">
                      {item.linkedItems.traits?.map((trait) => (
                        <li
                          key={trait.name}
                          className="text-surface-solid text-left text-sm"
                        >
                          <BaseLink
                            href={`/item-lookup?categories=Trait,Archetype,Perk,Skill&searchText=${trait.name}`}
                            className="text-gray-400 underline"
                            target="_blank"
                          >
                            {trait.name}
                          </BaseLink>
                        </li>
                      ))}
                    </ul>
                  </li>
                )}
              {WeaponItem.isWeaponItem(item) && item.linkedItems?.mod && (
                <li className="text-surface-solid col-span-full text-left text-sm">
                  <strong>Mod</strong>:{' '}
                  <BaseLink
                    href={`/item-lookup?searchText=${item.linkedItems.mod.name}`}
                    className="text-gray-400 underline"
                    target="_blank"
                  >
                    {item.linkedItems.mod.name}
                  </BaseLink>
                </li>
              )}
              {ModItem.isModItem(item) && item.linkedItems?.weapon && (
                <li className="text-surface-solid col-span-full text-left text-sm">
                  <strong>Weapon</strong>:{' '}
                  <BaseLink
                    href={`/item-lookup?searchText=${item.linkedItems.weapon.name}`}
                    className="text-gray-400 underline"
                    target="_blank"
                  >
                    {item.linkedItems.weapon.name}
                  </BaseLink>
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
  );
}
