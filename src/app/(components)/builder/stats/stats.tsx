import Image from 'next/image'
import { useState } from 'react'
import { IoInformationCircleSharp } from 'react-icons/io5'

import { ArmorBreakdownDialog } from '@/app/(components)/dialogs/armor-breakdown-dialog'
import { HealthBreakdownDialog } from '@/app/(components)/dialogs/health-breakdown-dialog'
import { StaminaBreakdownDialog } from '@/app/(components)/dialogs/stamina-breakdown-dialog'
import { Tooltip } from '@/app/(components)/tooltip'
import { ZINDEXES } from '@/app/(components)/z-indexes'
import { BuildState } from '@/app/(types)/builds'
import { getTotalArmor } from '@/app/(utils)/builds/get-totals/get-total-armor'
import { getTotalHealth } from '@/app/(utils)/builds/get-totals/get-total-health'
import { getTotalResistances } from '@/app/(utils)/builds/get-totals/get-total-resistances'
import { getTotalStamina } from '@/app/(utils)/builds/get-totals/get-total-stamina'
import { getTotalWeight } from '@/app/(utils)/builds/get-totals/get-total-weight'
import { getWeightClass } from '@/app/(utils)/builds/get-totals/get-weight-class'
import { buildToVashUrl } from '@/app/(utils)/builds/vash-integration/build-to-vash-url'
import { cn } from '@/app/(utils)/classnames'

interface Props {
  buildState: BuildState
  isScreenshotMode: boolean
}

export function Stats({ buildState, isScreenshotMode }: Props) {
  const [healthInfoOpen, setHealthInfoOpen] = useState(false)
  const [staminaInfoOpen, setStaminaInfoOpen] = useState(false)
  const [armorInfoOpen, setArmorInfoOpen] = useState(false)

  const { totalArmor, breakdown: armorBreakdown } = getTotalArmor(buildState)
  const totalWeight = getTotalWeight(buildState)
  const { totalHealth, breakdown: healthBreakdown } = getTotalHealth(buildState)
  const { totalStamina, breakdown: staminaBreakdown } =
    getTotalStamina(buildState)
  const totalFireResistance = getTotalResistances(buildState, 'fire')
  const totalBlightResistance = getTotalResistances(buildState, 'blight')
  const totalShockResistance = getTotalResistances(buildState, 'shock')
  const totalBleedResistance = getTotalResistances(buildState, 'bleed')
  const totalToxinResistance = getTotalResistances(buildState, 'toxin')
  const weightClass = getWeightClass(buildState)

  const challengerIsEquipped =
    buildState.items.archetype[0]?.name === 'Challenger' ||
    buildState.items.archetype[1]?.name === 'Challenger'

  return (
    <>
      <HealthBreakdownDialog
        breakdown={healthBreakdown}
        open={healthInfoOpen}
        onClose={() => setHealthInfoOpen(false)}
      />
      <StaminaBreakdownDialog
        breakdown={staminaBreakdown}
        open={staminaInfoOpen}
        onClose={() => setStaminaInfoOpen(false)}
      />
      <ArmorBreakdownDialog
        breakdown={armorBreakdown}
        open={armorInfoOpen}
        onClose={() => setArmorInfoOpen(false)}
      />
      <div className="flex w-full flex-grow flex-col justify-start">
        <div className="flex w-full flex-row items-center justify-start">
          <div className="flex w-full flex-col items-start justify-start sm:max-w-[275px]">
            <div className="relative grid w-full grid-cols-2 gap-2 border border-transparent border-b-primary-500 text-left text-sm text-gray-300">
              <p className="flex items-center justify-start">Health</p>
              {/** Not updating to new button component */}
              <button
                className={cn(
                  'text-md flex items-center justify-end rounded-full border-transparent bg-background-solid text-right font-bold sm:text-lg',
                  isScreenshotMode && 'text-lg',
                )}
                onClick={() => setHealthInfoOpen(true)}
              >
                {totalHealth}
                {!isScreenshotMode && (
                  <IoInformationCircleSharp className="h-4 w-4 text-accent1-500" />
                )}
              </button>
            </div>
            <div className="relative grid w-full grid-cols-2 gap-2 border border-transparent border-b-primary-500 text-left text-sm text-gray-300">
              <p className="flex items-center justify-start">Stamina</p>
              {/** Not updating to new button component */}
              <button
                className={cn(
                  'text-md flex items-center justify-end rounded-full border-transparent bg-background-solid text-right font-bold sm:text-lg',
                  isScreenshotMode && 'text-lg',
                )}
                onClick={() => setStaminaInfoOpen(true)}
              >
                {totalStamina}
                {!isScreenshotMode && (
                  <IoInformationCircleSharp className="h-4 w-4 text-accent1-500" />
                )}
              </button>
            </div>
            <div className="relative grid w-full grid-cols-2 gap-2 border border-transparent border-b-primary-500 text-left text-sm text-gray-300">
              <p className="flex items-center justify-start">Armor</p>
              {/** Not updating to new button component */}
              <button
                className={cn(
                  'text-md flex items-center justify-end rounded-full border-transparent bg-background-solid text-right font-bold sm:text-lg',
                  isScreenshotMode && 'text-lg',
                )}
                onClick={() => setArmorInfoOpen(true)}
              >
                {totalArmor}
                {!isScreenshotMode && (
                  <IoInformationCircleSharp className="h-4 w-4 text-accent1-500" />
                )}
              </button>
            </div>
            <div className="relative grid w-full grid-cols-2 gap-2 border border-transparent border-b-primary-500 text-left text-sm text-gray-300">
              <p className="flex items-center justify-start">Weight</p>
              <span
                className={cn(
                  'text-md flex items-center justify-end text-right font-bold sm:text-lg',
                  isScreenshotMode && 'text-lg',
                  weightClass.textColor,
                )}
              >
                <Tooltip
                  content={
                    challengerIsEquipped
                      ? weightClass.challengerDescription
                      : weightClass.description
                  }
                >
                  {/** Not updating to new button component */}
                  <button
                    aria-label={
                      challengerIsEquipped
                        ? weightClass.challengerDescription
                        : weightClass.description
                    }
                  >
                    {totalWeight}
                  </button>
                </Tooltip>
              </span>
            </div>
            <div className="grid w-full grid-cols-2 gap-x-2">
              <div className="relative grid w-full grid-cols-2 gap-2 border border-transparent border-b-primary-500 text-left text-sm text-gray-300">
                <Image
                  src={`https://${process.env.NEXT_PUBLIC_IMAGE_URL}/status/bleed_resistance.png`}
                  alt="Bleed Resistance"
                  width={32}
                  height={32}
                  className={cn('my-1 h-6 w-6')}
                  loading="eager"
                  unoptimized={isScreenshotMode}
                />
                <span
                  className={cn(
                    'text-md flex items-center justify-end text-right font-bold sm:text-lg',
                    isScreenshotMode && 'text-lg',
                  )}
                >
                  {totalBleedResistance}
                </span>
              </div>
              <div className="grid w-full grid-cols-2 gap-2 border border-transparent border-b-primary-500 text-left text-sm text-gray-300">
                <Image
                  src={`https://${process.env.NEXT_PUBLIC_IMAGE_URL}/status/fire_resistance.png`}
                  alt="Fire Resistance"
                  width={32}
                  height={32}
                  className={cn('my-1 h-6 w-6')}
                  loading="eager"
                  unoptimized={isScreenshotMode}
                />
                <span
                  className={cn(
                    'text-md flex items-center justify-end text-right font-bold sm:text-lg',
                    isScreenshotMode && 'text-lg',
                  )}
                >
                  {totalFireResistance}
                </span>
              </div>
              <div className="grid w-full grid-cols-2 gap-2 border border-transparent border-b-primary-500 text-left text-sm text-gray-300">
                <Image
                  src={`https://${process.env.NEXT_PUBLIC_IMAGE_URL}/status/shock_resistance.png`}
                  alt="Shock Resistance"
                  width={32}
                  height={32}
                  className={cn('my-1 h-6 w-6')}
                  loading="eager"
                  unoptimized={isScreenshotMode}
                />
                <span
                  className={cn(
                    'text-md flex items-center justify-end text-right font-bold sm:text-lg',
                    isScreenshotMode && 'text-lg',
                  )}
                >
                  {totalShockResistance}
                </span>
              </div>
              <div className="grid w-full grid-cols-2 gap-2 border border-transparent border-b-primary-500 text-left text-sm text-gray-300">
                <Image
                  src={`https://${process.env.NEXT_PUBLIC_IMAGE_URL}/status/toxin_resistance.png`}
                  alt="Toxin Resistance"
                  width={32}
                  height={32}
                  className={cn('my-1 h-6 w-6')}
                  loading="eager"
                  unoptimized={isScreenshotMode}
                />
                <span
                  className={cn(
                    'text-md flex items-center justify-end text-right font-bold sm:text-lg',
                    isScreenshotMode && 'text-lg',
                  )}
                >
                  {totalToxinResistance}
                </span>
              </div>
              <div className="grid w-full grid-cols-2 gap-2 border border-transparent border-b-primary-500 text-left text-sm text-gray-300">
                <Image
                  src={`https://${process.env.NEXT_PUBLIC_IMAGE_URL}/status/blight_resistance.png`}
                  alt="Blight Resistance"
                  width={32}
                  height={32}
                  className={cn('my-1 h-6 w-6')}
                  loading="eager"
                  unoptimized={isScreenshotMode}
                />
                <span
                  className={cn(
                    'text-md flex items-center justify-end text-right font-bold sm:text-lg',
                    isScreenshotMode && 'text-lg',
                  )}
                >
                  {totalBlightResistance}
                </span>
              </div>
            </div>
            {!isScreenshotMode && (
              <div
                className={cn(
                  'mt-2 flex w-full items-center justify-center',
                  ZINDEXES.VASH_BUTTON,
                )}
              >
                <a
                  href={buildToVashUrl(buildState)}
                  target="_blank"
                  className="flex items-center justify-center rounded-lg border border-gray-500 bg-gray-800 p-2 text-xs text-surface-solid hover:bg-gray-700"
                >
                  Export to Loadout Calculator
                  <Image
                    src={`https://${process.env.NEXT_PUBLIC_IMAGE_URL}/cowaii.webp`}
                    alt="Vash Cowaii's Loadout Calculator"
                    width={20}
                    height={20}
                    className="ml-1 h-5 w-5"
                    loading="eager"
                    unoptimized={isScreenshotMode}
                  />
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
