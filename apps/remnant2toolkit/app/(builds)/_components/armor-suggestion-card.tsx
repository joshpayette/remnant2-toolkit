import { cn, getImageUrl } from '@repo/ui';
import Image from 'next/image';

import { WEIGHT_CLASSES } from '@/app/(builds)/_constants/weight-classes';
import {
  type ArmorSuggestion,
  type WeightClassKeysWithDefault,
} from '@/app/(builds)/_types/armor-calculator';
import { ItemButton } from '@/app/(items)/_components/item-button';
import { type ArmorItem } from '@/app/(items)/_types/armor-item';

interface Props {
  desiredWeightClass: WeightClassKeysWithDefault;
  isItemInfoOpen: boolean;
  onItemInfoOpen: (item: ArmorItem) => void;
  suggestion: ArmorSuggestion;
}

export function ArmorSuggestionCard({
  desiredWeightClass,
  isItemInfoOpen,
  suggestion,
  onItemInfoOpen,
}: Props) {
  return (
    <>
      <div className="mb-2 flex w-full flex-row items-center justify-center gap-x-8">
        <div className="flex flex-col items-center justify-center">
          <div className="text-md font-semibold">Armor</div>
          <div className="text-primary-500 text-2xl font-bold">
            {suggestion.totalArmor}
          </div>
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="text-md font-semibold">Weight</div>
          <div
            className={cn(
              'text-2xl font-bold',
              desiredWeightClass !== 'CHOOSE' &&
                WEIGHT_CLASSES[desiredWeightClass].textColor,
            )}
          >
            {suggestion.totalWeight}
          </div>
        </div>
      </div>
      <div className="mb-4 flex flex-row items-center justify-center gap-x-4">
        <div className="flex items-center justify-center gap-x-0.5">
          <Image
            src={getImageUrl(`/status/bleed_resistance.png`)}
            alt="Bleed Resistance"
            width={32}
            height={32}
            className={cn('h-6 w-6')}
            loading="eager"
            unoptimized={false}
          />{' '}
          {suggestion.totalBleedResistance}
        </div>
        <div className="flex items-center justify-center gap-x-0.5">
          <Image
            src={getImageUrl(`/status/fire_resistance.png`)}
            alt="Fire Resistance"
            width={32}
            height={32}
            className={cn('h-6 w-6')}
            loading="eager"
            unoptimized={false}
          />{' '}
          {suggestion.totalFireResistance}
        </div>
        <div className="flex items-center justify-center gap-x-0.5">
          <Image
            src={getImageUrl(`/status/shock_resistance.png`)}
            alt="Shock Resistance"
            width={32}
            height={32}
            className={cn('h-6 w-6')}
            loading="eager"
            unoptimized={false}
          />{' '}
          {suggestion.totalShockResistance}
        </div>
        <div className="flex items-center justify-center gap-x-0.5">
          <Image
            src={getImageUrl(`/status/toxin_resistance.png`)}
            alt="Toxin Resistance"
            width={32}
            height={32}
            className={cn('h-6 w-6')}
            loading="eager"
            unoptimized={false}
          />{' '}
          {suggestion.totalToxinResistance}
        </div>
        <div className="flex items-center justify-center gap-x-0.5">
          <Image
            src={getImageUrl(`/status/blight_resistance.png`)}
            alt="Blight Resistance"
            width={32}
            height={32}
            className={cn('h-6 w-6')}
            loading="eager"
            unoptimized={false}
          />{' '}
          {suggestion.totalBlightResistance}
        </div>
      </div>
      <div className="flex flex-row items-center justify-around gap-x-1">
        <ItemButton
          item={suggestion.helm}
          isEditable={false}
          onItemInfoClick={() => onItemInfoOpen(suggestion.helm)}
          tooltipDisabled={isItemInfoOpen}
        />
        <ItemButton
          item={suggestion.torso}
          isEditable={false}
          onItemInfoClick={() => onItemInfoOpen(suggestion.torso)}
          tooltipDisabled={isItemInfoOpen}
        />
        <ItemButton
          item={suggestion.legs}
          isEditable={false}
          onItemInfoClick={() => onItemInfoOpen(suggestion.legs)}
          tooltipDisabled={isItemInfoOpen}
        />
        <ItemButton
          item={suggestion.gloves}
          isEditable={false}
          onItemInfoClick={() => onItemInfoOpen(suggestion.gloves)}
          tooltipDisabled={isItemInfoOpen}
        />
      </div>
    </>
  );
}
