import { cn } from '@/lib/classnames'
import { BuildState } from '@/features/build/types'
import Image from 'next/image'
import {
  getTotalArmor,
  getTotalHealth,
  getTotalResistances,
  getTotalStamina,
  getTotalWeight,
  getWeightClass,
} from '../lib/getTotalValues'
import Tooltip from '@/features/ui/Tooltip'

interface Props {
  buildState: BuildState
  isScreenshotMode: boolean
}

export default function Stats({ buildState, isScreenshotMode }: Props) {
  const totalArmor = getTotalArmor(buildState)
  const totalWeight = getTotalWeight(buildState)
  const totalStamina = getTotalStamina(buildState)
  const totalHealth = getTotalHealth(buildState)
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
    <dl className="flex w-full flex-grow flex-col justify-start">
      <dd className="flex w-full flex-row items-center justify-start">
        <div className="flex w-full flex-col items-start justify-start sm:max-w-[275px]">
          <div className="grid w-full grid-cols-2 gap-2 border border-transparent border-b-green-500 text-left text-sm text-gray-300">
            <p className="flex items-center justify-start">Health</p>
            <span
              className={cn(
                'text-md flex items-center justify-end text-right font-bold sm:text-lg',
                isScreenshotMode && 'text-lg',
              )}
            >
              {totalHealth}
            </span>
          </div>
          <div className="grid w-full grid-cols-2 gap-2 border border-transparent border-b-green-500 text-left text-sm text-gray-300">
            <p className="flex items-center justify-start">Stamina</p>
            <span
              className={cn(
                'text-md flex items-center justify-end text-right font-bold sm:text-lg',
                isScreenshotMode && 'text-lg',
              )}
            >
              {totalStamina}
            </span>
          </div>
          <div className="grid w-full grid-cols-2 gap-2 border border-transparent border-b-green-500 text-left text-sm text-gray-300">
            <p className="flex items-center justify-start">Armor</p>
            <span
              className={cn(
                'text-md flex items-center justify-end text-right font-bold sm:text-lg',
                isScreenshotMode && 'text-lg',
              )}
            >
              {totalArmor}
            </span>
          </div>
          <div className="grid w-full grid-cols-2 gap-2 border border-transparent border-b-green-500 text-left text-sm">
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
                <button>{totalWeight}</button>
              </Tooltip>
            </span>
          </div>
          <div className="grid w-full grid-cols-2 gap-2 border border-transparent border-b-green-500 text-left text-sm text-gray-300">
            <Image
              src={`https://${process.env.NEXT_PUBLIC_IMAGE_URL}/status/bleed_resistance.png`}
              alt="Bleed Resistance"
              width={32}
              height={32}
              className={cn('my-1 h-6 w-6')}
              loading="eager"
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
          <p className="grid w-full grid-cols-2 gap-2 border border-transparent border-b-green-500 text-left text-sm text-gray-300">
            <Image
              src={`https://${process.env.NEXT_PUBLIC_IMAGE_URL}/status/fire_resistance.png`}
              alt="Fire Resistance"
              width={32}
              height={32}
              className={cn('my-1 h-6 w-6')}
              loading="eager"
            />
            <span
              className={cn(
                'text-md flex items-center justify-end text-right font-bold sm:text-lg',
                isScreenshotMode && 'text-lg',
              )}
            >
              {totalFireResistance}
            </span>
          </p>
          <p className="grid w-full grid-cols-2 gap-2 border border-transparent border-b-green-500 text-left text-sm text-gray-300">
            <Image
              src={`https://${process.env.NEXT_PUBLIC_IMAGE_URL}/status/shock_resistance.png`}
              alt="Shock Resistance"
              width={32}
              height={32}
              className={cn('my-1 h-6 w-6')}
              loading="eager"
            />
            <span
              className={cn(
                'text-md flex items-center justify-end text-right font-bold sm:text-lg',
                isScreenshotMode && 'text-lg',
              )}
            >
              {totalShockResistance}
            </span>
          </p>
          <p className="grid w-full grid-cols-2 gap-2 border border-transparent border-b-green-500 text-left text-sm text-gray-300">
            <Image
              src={`https://${process.env.NEXT_PUBLIC_IMAGE_URL}/status/toxin_resistance.png`}
              alt="Toxin Resistance"
              width={32}
              height={32}
              className={cn('my-1 h-6 w-6')}
              loading="eager"
            />
            <span
              className={cn(
                'text-md flex items-center justify-end text-right font-bold sm:text-lg',
                isScreenshotMode && 'text-lg',
              )}
            >
              {totalToxinResistance}
            </span>
          </p>
          <p className="grid w-full grid-cols-2 gap-2 border border-transparent border-b-green-500 text-left text-sm text-gray-300">
            <Image
              src={`https://${process.env.NEXT_PUBLIC_IMAGE_URL}/status/blight_resistance.png`}
              alt="Blight Resistance"
              width={32}
              height={32}
              className={cn('my-1 h-6 w-6')}
              loading="eager"
            />
            <span
              className={cn(
                'text-md flex items-center justify-end text-right font-bold sm:text-lg',
                isScreenshotMode && 'text-lg',
              )}
            >
              {totalBlightResistance}
            </span>
          </p>
          <div className="mt-2 text-right text-xs text-green-700">
            Looking for more advanced stats? Check out{' '}
            <a
              href="https://docs.google.com/spreadsheets/d/1I7vkh50KWJZSxNy4FqxvniFWBstJQEMtpwtxQ3ByoPw/edit?pli=1"
              target="_blank"
              className="text-green-500 hover:underline"
            >
              Vash Cowaii&apos;s spreadsheet.
            </a>
          </div>
        </div>
      </dd>
    </dl>
  )
}
