import { ArmorItem } from '@/app/(types)/items/ArmorItem'
import Image from 'next/image'

interface Props {
  armorItems: Array<ArmorItem | null>
}

export default function Stats({ armorItems }: Props) {
  const equippedArmorItems = armorItems.filter(
    (item) => item !== null,
  ) as ArmorItem[]

  const totalArmor = equippedArmorItems
    .reduce((acc, item) => acc + item.armor, 0)
    .toFixed(2)
  const totalWeight = equippedArmorItems
    .reduce((acc, item) => acc + item.weight, 0)
    .toFixed(2)
  const totalBleedResistance = equippedArmorItems.reduce(
    (acc, item) => acc + item.bleedResistance,
    0,
  )
  const totalFireResistance = equippedArmorItems.reduce(
    (acc, item) => acc + item.fireResistance,
    0,
  )
  const totalShockResistance = equippedArmorItems.reduce(
    (acc, item) => acc + item.shockResistance,
    0,
  )
  const totalToxinResistance = equippedArmorItems.reduce(
    (acc, item) => acc + item.toxinResistance,
    0,
  )
  const totalBlightResistance = equippedArmorItems.reduce(
    (acc, item) => acc + item.blightResistance,
    0,
  )

  return (
    <dl className="flex w-full flex-grow flex-col justify-start">
      <dd className="flex w-full flex-row items-center justify-start">
        <div className="flex w-full flex-col items-start justify-start sm:max-w-[275px]">
          <div className="grid w-full grid-cols-2 gap-2 border border-transparent border-b-green-500 text-left text-sm text-gray-300">
            <p className="flex items-center justify-start">Armor</p>
            <span className="flex items-center justify-end text-right text-lg font-bold">
              {totalArmor}
            </span>
          </div>
          <div className="grid w-full grid-cols-2 gap-2 border border-transparent border-b-green-500 text-left text-sm text-gray-300">
            <p className="flex items-center justify-start">Weight</p>
            <span className="flex items-center justify-end text-right text-lg font-bold">
              {totalWeight}
            </span>
          </div>
          <div className="grid w-full grid-cols-2 gap-2 border border-transparent border-b-green-500 text-left text-sm text-gray-300">
            <Image
              src={`https://${process.env.NEXT_PUBLIC_IMAGE_URL}/status/bleed_resistance.png`}
              alt="Bleed Resistance"
              width={32}
              height={32}
              className="my-1 h-8 w-8"
              loading="eager"
            />
            <span className="flex items-center justify-end text-right text-lg font-bold">
              {totalBleedResistance}
            </span>
          </div>
          <p className="grid w-full grid-cols-2 gap-2 border border-transparent border-b-green-500 text-left text-sm text-gray-300">
            <Image
              src={`https://${process.env.NEXT_PUBLIC_IMAGE_URL}/status/fire_resistance.png`}
              alt="Fire Resistance"
              width={32}
              height={32}
              className="my-1 h-8 w-8"
              loading="eager"
            />
            <span className="flex items-center justify-end text-right text-lg font-bold">
              {totalFireResistance}
            </span>
          </p>
          <p className="grid w-full grid-cols-2 gap-2 border border-transparent border-b-green-500 text-left text-sm text-gray-300">
            <Image
              src={`https://${process.env.NEXT_PUBLIC_IMAGE_URL}/status/shock_resistance.png`}
              alt="Shock Resistance"
              width={32}
              height={32}
              className="my-1 h-8 w-8"
              loading="eager"
            />
            <span className="flex items-center justify-end text-right text-lg font-bold">
              {totalShockResistance}
            </span>
          </p>
          <p className="grid w-full grid-cols-2 gap-2 border border-transparent border-b-green-500 text-left text-sm text-gray-300">
            <Image
              src={`https://${process.env.NEXT_PUBLIC_IMAGE_URL}/status/toxin_resistance.png`}
              alt="Toxin Resistance"
              width={32}
              height={32}
              className="my-1 h-8 w-8"
              loading="eager"
            />
            <span className="text-right text-lg font-bold">
              {totalToxinResistance}
            </span>
          </p>
          <p className="grid w-full grid-cols-2 gap-2 border border-transparent border-b-green-500 text-left text-sm text-gray-300">
            <Image
              src={`https://${process.env.NEXT_PUBLIC_IMAGE_URL}/status/blight_resistance.png`}
              alt="Blight Resistance"
              width={32}
              height={32}
              className="my-1 h-8 w-8"
              loading="eager"
            />
            <span className="flex items-center justify-end text-right text-lg font-bold">
              {totalBlightResistance}
            </span>
          </p>
        </div>
      </dd>
    </dl>
  )
}
