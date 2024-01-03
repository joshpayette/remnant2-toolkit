import { ArmorItem } from '../(types)/items/ArmorItem'

interface Props {
  item: ArmorItem
}

export default function ArmorInfo({ item }: Props) {
  return (
    <dl className="flex flex-grow flex-col justify-start">
      <dd className="flex w-full flex-row items-center justify-start">
        <div className="flex w-full flex-col items-start justify-start sm:max-w-[275px]">
          <p className="grid w-full grid-cols-2 gap-2 border border-transparent border-b-green-500 text-left text-sm text-gray-300">
            Armor:{' '}
            <span className="flex items-center justify-end text-right text-lg font-bold">
              {item.armor}
            </span>
          </p>
          <p className="grid w-full grid-cols-2 gap-2 border border-transparent border-b-green-500 text-left text-sm text-gray-300">
            Weight:{' '}
            <span className="flex items-center justify-end text-right text-lg font-bold">
              {item.weight}
            </span>
          </p>
          <p className="grid w-full grid-cols-2 gap-2 border border-transparent border-b-green-500 text-left text-sm text-gray-300">
            Bleed Resistance:{' '}
            <span className="flex items-center justify-end text-right text-lg font-bold">
              {item.bleedResistance}
            </span>
          </p>
          <p className="grid w-full grid-cols-2 gap-2 border border-transparent border-b-green-500 text-left text-sm text-gray-300">
            Fire Resistance:{' '}
            <span className="flex items-center justify-end text-right text-lg font-bold">
              {item.fireResistance}
            </span>
          </p>
          <p className="grid w-full grid-cols-2 gap-2 border border-transparent border-b-green-500 text-left text-sm text-gray-300">
            Shock Resistance:{' '}
            <span className="flex items-center justify-end text-right text-lg font-bold">
              {item.shockResistance}
            </span>
          </p>
          <p className="grid w-full grid-cols-2 gap-2 border border-transparent border-b-green-500 text-left text-sm text-gray-300">
            Toxin Resistance:{' '}
            <span className="text-right text-lg font-bold">
              {item.toxinResistance}
            </span>
          </p>
          <p className="grid w-full grid-cols-2 gap-2 border border-transparent border-b-green-500 text-left text-sm text-gray-300">
            Blight Resistance:{' '}
            <span className="flex items-center justify-end text-right text-lg font-bold">
              {item.blightResistance}
            </span>
          </p>
        </div>
      </dd>
    </dl>
  )
}
