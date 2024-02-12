import { WeaponItem } from '../types/WeaponItem'

interface Props {
  item: WeaponItem
}

export function WeaponInfo({ item }: Props) {
  return (
    <dl className="flex w-full flex-grow flex-col justify-start">
      <dd className="flex w-full flex-row items-center justify-start">
        <div className="flex w-full flex-col items-start justify-start sm:max-w-[275px]">
          <div className="grid w-full grid-cols-2 gap-2 border border-transparent border-b-green-500 text-left text-sm text-gray-300">
            <p className="flex items-center justify-start">Damage</p>
            <span className="flex items-center justify-end text-right text-lg font-bold">
              {item.damage}
            </span>
          </div>
          {item.rps && (
            <div className="grid w-full grid-cols-2 gap-2 border border-transparent border-b-green-500 text-left text-sm text-gray-300">
              <p className="flex items-center justify-start">RPS</p>
              <span className="flex items-center justify-end text-right text-lg font-bold">
                {item.rps}
              </span>
            </div>
          )}
          {item.magazine && (
            <div className="grid w-full grid-cols-2 gap-2 border border-transparent border-b-green-500 text-left text-sm text-gray-300">
              <p className="flex items-center justify-start">Magazine</p>
              <span className="flex items-center justify-end text-right text-lg font-bold">
                {item.magazine}
              </span>
            </div>
          )}
        </div>
      </dd>
    </dl>
  )
}
