import Image from 'next/image'

import { ItemButton } from '@/app/(components)/buttons/item-button'
import { WEIGHT_CLASSES } from '@/app/(data)/items/constants'
import { ArmorItem } from '@/app/(data)/items/types/ArmorItem'
import { cn } from '@/lib/classnames'

import { ArmorSuggestion, WeightClassKeysWithDefault } from '../types'

interface Props {
  desiredWeightClass: WeightClassKeysWithDefault
  isItemInfoOpen: boolean
  onItemInfoOpen: (item: ArmorItem) => void
  suggestion: ArmorSuggestion
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
          <div className="text-2xl font-bold text-primary">
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
            src={`https://${process.env.NEXT_PUBLIC_IMAGE_URL}/status/bleed_resistance.png`}
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
            src={`https://${process.env.NEXT_PUBLIC_IMAGE_URL}/status/fire_resistance.png`}
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
            src={`https://${process.env.NEXT_PUBLIC_IMAGE_URL}/status/shock_resistance.png`}
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
            src={`https://${process.env.NEXT_PUBLIC_IMAGE_URL}/status/toxin_resistance.png`}
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
            src={`https://${process.env.NEXT_PUBLIC_IMAGE_URL}/status/blight_resistance.png`}
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
      <div className="flex flex-row items-center justify-around gap-x-2">
        <ItemButton
          item={suggestion.helm}
          isEditable={false}
          size="md"
          onItemInfoClick={() => onItemInfoOpen(suggestion.helm)}
          tooltipDisabled={isItemInfoOpen}
        />
        <ItemButton
          item={suggestion.torso}
          isEditable={false}
          size="md"
          onItemInfoClick={() => onItemInfoOpen(suggestion.torso)}
          tooltipDisabled={isItemInfoOpen}
        />
        <ItemButton
          item={suggestion.legs}
          isEditable={false}
          size="md"
          onItemInfoClick={() => onItemInfoOpen(suggestion.legs)}
          tooltipDisabled={isItemInfoOpen}
        />
        <ItemButton
          item={suggestion.gloves}
          isEditable={false}
          size="md"
          onItemInfoClick={() => onItemInfoOpen(suggestion.gloves)}
          tooltipDisabled={isItemInfoOpen}
        />
      </div>
    </>
  )
}
