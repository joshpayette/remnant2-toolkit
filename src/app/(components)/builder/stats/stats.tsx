import Image from 'next/image'
import { useState } from 'react'

import { HealthBreakdownDialog } from '@/app/(components)/dialogs/health-breakdown-dialog'
import { StaminaBreakdownDialog } from '@/app/(components)/dialogs/stamina-breakdown-dialog'
import { Tooltip } from '@/app/(components)/tooltip'
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

  const totalArmor = getTotalArmor(buildState)
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
        buildState={buildState}
        breakdown={healthBreakdown}
        open={healthInfoOpen}
        onClose={() => setHealthInfoOpen(false)}
      />
      <StaminaBreakdownDialog
        buildState={buildState}
        breakdown={staminaBreakdown}
        open={staminaInfoOpen}
        onClose={() => setStaminaInfoOpen(false)}
      />
      <div className="flex w-full flex-grow flex-col justify-start">
        <div className="flex w-full flex-row items-center justify-start">
          <div className="flex w-full flex-col items-start justify-start sm:max-w-[275px]">
            <div className="relative grid w-full grid-cols-2 gap-2 border border-transparent border-b-primary text-left text-sm text-on-background-variant">
              <p className="flex items-center justify-start">Health</p>
              {/** Not updating to new button component */}
              <button
                className={cn(
                  'text-md flex items-center justify-end text-right font-bold sm:text-lg',
                  isScreenshotMode && 'text-lg',
                )}
                onClick={() => setHealthInfoOpen(true)}
              >
                {totalHealth}
                {!isScreenshotMode && (
                  <Image
                    src={`https://${process.env.NEXT_PUBLIC_IMAGE_URL}/toolkit/info-yellow.png`}
                    alt="Info icon"
                    width={16}
                    height={16}
                    className="ml-1 h-4 w-4"
                  />
                )}
              </button>
            </div>
            <div className="relative grid w-full grid-cols-2 gap-2 border border-transparent border-b-primary text-left text-sm text-on-background-variant">
              <p className="flex items-center justify-start">Stamina</p>
              {/** Not updating to new button component */}
              <button
                className={cn(
                  'text-md flex items-center justify-end text-right font-bold sm:text-lg',
                  isScreenshotMode && 'text-lg',
                )}
                onClick={() => setStaminaInfoOpen(true)}
              >
                {totalStamina}
                {!isScreenshotMode && (
                  <Image
                    src={`https://${process.env.NEXT_PUBLIC_IMAGE_URL}/toolkit/info-yellow.png`}
                    alt="Info icon"
                    width={16}
                    height={16}
                    className="ml-1 h-4 w-4"
                  />
                )}
              </button>
            </div>
            <div className="relative grid w-full grid-cols-2 gap-2 border border-transparent border-b-primary text-left text-sm text-on-background-variant">
              <p className="flex items-center justify-start">Armor</p>
              <Tooltip content="ArmorDR = Armor / (Armor+200)">
                {/** Not updating to new button component */}
                <button
                  className={cn(
                    'text-md flex items-center justify-end text-right font-bold sm:text-lg',
                    isScreenshotMode && 'text-lg',
                  )}
                  aria-label={`Armor Damage Reduction: ${totalArmor} / (${totalArmor} + 200)`}
                >
                  {totalArmor}
                </button>
              </Tooltip>
            </div>
            <div className="relative grid w-full grid-cols-2 gap-2 border border-transparent border-b-primary text-left text-sm text-on-background-variant">
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
              <div className="relative grid w-full grid-cols-2 gap-2 border border-transparent border-b-primary text-left text-sm text-on-background-variant">
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
              <div className="grid w-full grid-cols-2 gap-2 border border-transparent border-b-primary text-left text-sm text-on-background-variant">
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
              <div className="grid w-full grid-cols-2 gap-2 border border-transparent border-b-primary text-left text-sm text-on-background-variant">
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
              <div className="grid w-full grid-cols-2 gap-2 border border-transparent border-b-primary text-left text-sm text-on-background-variant">
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
              <div className="grid w-full grid-cols-2 gap-2 border border-transparent border-b-primary text-left text-sm text-on-background-variant">
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
              <div className="z-0 mt-2 flex w-full items-center justify-center">
                <a
                  href={buildToVashUrl(buildState)}
                  target="_blank"
                  className="flex items-center justify-center rounded-lg border border-outline bg-primary-container/20 p-2 text-xs text-on-background hover:bg-outline-variant"
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
