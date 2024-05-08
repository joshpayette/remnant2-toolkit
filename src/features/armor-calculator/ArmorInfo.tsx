import Image from 'next/image'

import { ArmorItem } from '../../app/(data)/items/types/ArmorItem'

interface Props {
  item: ArmorItem
}

export function ArmorInfo({ item }: Props) {
  return (
    <div className="flex w-full flex-grow flex-col justify-center">
      <div className="flex w-full flex-row items-center justify-center">
        <div className="flex w-full flex-col items-start justify-start">
          <div className=" grid w-full grid-cols-2 gap-2 border border-transparent text-left text-sm text-on-background-variant">
            <p className="flex items-center justify-start">Armor</p>
            <span className="flex items-center justify-end text-right text-lg font-bold">
              {item.armor}
            </span>
          </div>
          <div className=" grid w-full grid-cols-2 gap-2 border border-transparent text-left text-sm text-on-background-variant">
            <p className="flex items-center justify-start">Weight</p>
            <span className="flex items-center justify-end text-right text-lg font-bold">
              {item.weight}
            </span>
          </div>
          <div className="grid w-full grid-cols-2 gap-x-4 sm:gap-x-8">
            <div className=" grid w-full grid-cols-2 gap-2 border border-transparent text-left text-sm text-on-background-variant">
              <Image
                src={`https://${process.env.NEXT_PUBLIC_IMAGE_URL}/status/bleed_resistance.png`}
                alt="Bleed Resistance"
                width={32}
                height={32}
                className="my-1 h-6 w-6"
                loading="eager"
              />
              <span className="flex items-center justify-end text-right text-lg font-bold">
                {item.bleedResistance}
              </span>
            </div>
            <div className=" grid w-full grid-cols-2 gap-2 border border-transparent text-left text-sm text-on-background-variant">
              <Image
                src={`https://${process.env.NEXT_PUBLIC_IMAGE_URL}/status/fire_resistance.png`}
                alt="Fire Resistance"
                width={32}
                height={32}
                className="my-1 h-6 w-6"
                loading="eager"
              />
              <span className="flex items-center justify-end text-right text-lg font-bold">
                {item.fireResistance}
              </span>
            </div>
            <div className=" grid w-full grid-cols-2 gap-2 border border-transparent text-left text-sm text-on-background-variant">
              <Image
                src={`https://${process.env.NEXT_PUBLIC_IMAGE_URL}/status/shock_resistance.png`}
                alt="Shock Resistance"
                width={32}
                height={32}
                className="my-1 h-6 w-6"
                loading="eager"
              />
              <span className="flex items-center justify-end text-right text-lg font-bold">
                {item.shockResistance}
              </span>
            </div>
            <div className=" grid w-full grid-cols-2 gap-2 border border-transparent text-left text-sm text-on-background-variant">
              <Image
                src={`https://${process.env.NEXT_PUBLIC_IMAGE_URL}/status/toxin_resistance.png`}
                alt="Toxin Resistance"
                width={32}
                height={32}
                className="my-1 h-6 w-6"
                loading="eager"
              />
              <span className="flex items-center justify-end text-right text-lg font-bold">
                {item.toxinResistance}
              </span>
            </div>
            <div className=" grid w-full grid-cols-2 gap-2 border border-transparent text-left text-sm text-on-background-variant">
              <Image
                src={`https://${process.env.NEXT_PUBLIC_IMAGE_URL}/status/blight_resistance.png`}
                alt="Blight Resistance"
                width={32}
                height={32}
                className="my-1 h-6 w-6"
                loading="eager"
              />
              <span className="flex items-center justify-end text-right text-lg font-bold">
                {item.blightResistance}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
