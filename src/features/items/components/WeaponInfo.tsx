import { WeaponItem } from '../types/WeaponItem'

interface Props {
  item: WeaponItem
  includeMod?: boolean
}

export function WeaponInfo({ item, includeMod = true }: Props) {
  return (
    <dl className="flex w-full flex-grow flex-col justify-start">
      <dd className="flex w-full flex-row items-center justify-start">
        <div className="flex w-full flex-col items-start justify-start sm:max-w-[275px]">
          <div className="mb-2 grid w-full grid-cols-3">
            <div className="flex w-full flex-col items-center justify-start text-gray-300">
              <p className="flex items-center justify-center text-sm">Damage</p>
              <span className="text-md flex items-center justify-center text-center font-bold">
                {item.damage}
              </span>
            </div>

            <div className="flex w-full flex-col items-center justify-start text-gray-300">
              <p className="flex items-center justify-center text-sm">RPS</p>
              <span className="text-md flex items-center justify-center text-center font-bold">
                {item.rps || '-'}
              </span>
            </div>

            <div className="flex w-full flex-col items-center justify-start text-gray-300">
              <p className="flex items-center justify-center text-sm">
                Magazine
              </p>
              <span className="text-md flex items-center justify-center text-center font-bold">
                {item.magazine || '-'}
              </span>
            </div>
          </div>
          {item.accuracy >= 0 ? (
            <div className="grid w-full grid-cols-2 gap-2 border border-transparent  py-1 text-left text-sm text-gray-300">
              <p className="flex items-center justify-start text-xs">
                Accuracy
              </p>
              <span className="flex items-center justify-end text-right text-xs font-bold">
                {item.accuracy}%
              </span>
            </div>
          ) : null}
          {item.ideal >= 0 && (
            <div className="grid w-full grid-cols-2 gap-2 border border-transparent  py-1 text-left text-sm text-gray-300">
              <p className="flex items-center justify-start text-xs">
                Ideal Range
              </p>
              <span className="flex items-center justify-end text-right text-xs font-bold">
                {item.ideal}m
              </span>
            </div>
          )}
          {item.falloff >= 0 ? (
            <div className="grid w-full grid-cols-2 gap-2 border border-transparent  py-1 text-left text-sm text-gray-300">
              <p className="flex items-center justify-start text-xs">
                Falloff Range
              </p>
              <span className="flex items-center justify-end text-right text-xs font-bold">
                {item.falloff}m
              </span>
            </div>
          ) : null}
          {item.ammo >= 0 && (
            <div className="grid w-full grid-cols-2 gap-2 border border-transparent  py-1 text-left text-sm text-gray-300">
              <p className="flex items-center justify-start text-xs">
                Max Ammo
              </p>
              <span className="flex items-center justify-end text-right text-xs font-bold">
                {item.ammo}
              </span>
            </div>
          )}
          {item.crit >= 0 ? (
            <div className="grid w-full grid-cols-2 gap-2 border border-transparent  py-1 text-left text-sm text-gray-300">
              <p className="flex items-center justify-start text-xs">
                Critical Hit Chance
              </p>
              <span className="flex items-center justify-end text-right text-xs font-bold">
                {item.crit}%
              </span>
            </div>
          ) : null}
          {item.weakspot >= 0 ? (
            <div className="grid w-full grid-cols-2 gap-2 border border-transparent  py-1 text-left text-sm text-gray-300">
              <p className="flex items-center justify-start text-xs">
                Weakspot Damage Bonus
              </p>
              <span className="flex items-center justify-end text-right text-xs font-bold">
                {item.weakspot}%
              </span>
            </div>
          ) : null}
          {item.stagger >= 0 ? (
            <div className="grid w-full grid-cols-2 gap-2 border border-transparent  py-1 text-left text-sm text-gray-300">
              <p className="flex items-center justify-start text-xs">
                Stagger Modifier
              </p>
              <span className="flex items-center justify-end text-right text-xs font-bold">
                {item.stagger}%
              </span>
            </div>
          ) : null}
          {item.linkedItems?.mod && includeMod && (
            <div className="grid w-full grid-cols-2 gap-2 border border-transparent py-1 text-left text-sm text-gray-300">
              <p className="flex items-center justify-start text-xs">Mod</p>
              <a
                href={`/item-lookup?searchText=${item.linkedItems.mod.name}`}
                className="flex items-center justify-end text-right text-xs font-bold text-secondary-500 underline"
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
