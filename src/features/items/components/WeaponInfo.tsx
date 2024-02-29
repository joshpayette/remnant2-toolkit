import { WeaponItem } from '../types/WeaponItem'

interface Props {
  item: WeaponItem
}

export function WeaponInfo({ item }: Props) {
  return (
    <dl className="flex w-full flex-grow flex-col justify-start">
      <dd className="flex w-full flex-row items-center justify-start">
        <div className="flex w-full flex-col items-start justify-start sm:max-w-[275px]">
          <div className="mt-4 grid w-full grid-cols-2 gap-2 border border-transparent border-b-green-500 border-t-green-500 py-1 text-left text-sm text-gray-300">
            <p className="flex items-center justify-start text-xs">Damage</p>
            <span className="flex items-center justify-end text-right text-xs font-bold">
              {item.damage}
            </span>
          </div>
          {item.rps && (
            <div className="grid w-full grid-cols-2 gap-2 border border-transparent border-b-green-500 py-1 text-left text-sm text-gray-300">
              <p className="flex items-center justify-start text-xs">RPS</p>
              <span className="flex items-center justify-end text-right text-xs font-bold">
                {item.rps}
              </span>
            </div>
          )}
          {item.magazine && (
            <div className="grid w-full grid-cols-2 gap-2 border border-transparent border-b-green-500 py-1 text-left text-sm text-gray-300">
              <p className="flex items-center justify-start text-xs">
                Magazine
              </p>
              <span className="flex items-center justify-end text-right text-xs font-bold">
                {item.magazine}
              </span>
            </div>
          )}
          {item.linkedItems?.mod && (
            <div className="grid w-full grid-cols-2 gap-2 border border-transparent border-b-green-500 py-1 text-left text-sm text-gray-300">
              <p className="flex items-center justify-start text-xs">Mod</p>
              <a
                href={`/item-lookup?searchText=${item.linkedItems.mod.name}`}
                className="flex items-center justify-end text-right text-xs font-bold text-purple-500 underline"
              >
                {item.linkedItems.mod.name}
              </a>
            </div>
          )}
        </div>
      </dd>
    </dl>
  )
}
