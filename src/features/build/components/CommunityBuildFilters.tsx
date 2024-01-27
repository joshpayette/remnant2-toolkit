import ClearFiltersButton from '@/features/ui/ClearFiltersButton'
import { remnantItems } from '@/features/items/data'
import { Archtype } from '@/features/items/types'
import { capitalize } from '@/lib/capitalize'
import { cn } from '@/lib/classnames'
import { useState } from 'react'
import { WeaponItem } from '@/features/items/types/WeaponItem'
import { Checkbox } from '@/features/ui/Checkbox'
import SelectMenu from '@/features/ui/SelectMenu'

export interface CommunityBuildFilterProps {
  archtypes: Archtype[]
  longGun: string
  handGun: string
  melee: string
}

const defaultGun = 'All'

export const defaultCommunityBuildFilters: CommunityBuildFilterProps = {
  archtypes: [],
  longGun: defaultGun,
  handGun: defaultGun,
  melee: defaultGun,
}

const allArchtypes: Archtype[] = remnantItems
  .filter((item) => item.category === 'archtype')
  .map((item) => item.name.toLowerCase() as Archtype)

const allLongGuns: string[] = remnantItems
  .filter((item) => WeaponItem.isWeaponItem(item) && item.type === 'long gun')
  .map((item) => item.name)
allLongGuns.unshift(defaultGun)

const allHandGuns: string[] = remnantItems
  .filter((item) => WeaponItem.isWeaponItem(item) && item.type === 'hand gun')
  .map((item) => item.name)
allHandGuns.unshift(defaultGun)

const allMelee: string[] = remnantItems
  .filter((item) => WeaponItem.isWeaponItem(item) && item.type === 'melee')
  .map((item) => item.name)
allMelee.unshift(defaultGun)

interface Props {
  showBorder?: boolean
  onUpdate: (filters: CommunityBuildFilterProps) => void
}

export default function CommunityBuildFilters({
  showBorder = true,
  onUpdate,
}: Props) {
  const [filters, setFilters] = useState<CommunityBuildFilterProps>(
    defaultCommunityBuildFilters,
  )

  function clearFilters() {
    console.info('setting filters', defaultCommunityBuildFilters)
    setFilters(defaultCommunityBuildFilters)
    onUpdate(defaultCommunityBuildFilters)
  }

  const areAnyFiltersActive = () => {
    return (
      filters.archtypes.length > 0 ||
      filters.longGun !== defaultGun ||
      filters.handGun !== defaultGun ||
      filters.melee !== defaultGun
    )
  }

  function handleArchtypeChange(archtype: Archtype) {
    let newArchtypes = [...filters.archtypes]

    if (newArchtypes.includes(archtype)) {
      newArchtypes = newArchtypes.filter((a) => a !== archtype)
    } else {
      // Only allow two archtypes to be selected at a time
      if (filters.archtypes.length === 2) {
        return
      }
      newArchtypes.push(archtype)
    }

    setFilters({
      ...filters,
      archtypes: newArchtypes,
    })
  }

  function handleWeaponChange(
    weapon: string,
    type: 'longGun' | 'handGun' | 'melee',
  ) {
    setFilters({
      ...filters,
      [type]: weapon,
    })
  }

  return (
    <div
      className={cn(
        'relative h-full max-h-fit w-full transform overflow-y-auto border-2 border-green-500 bg-black px-4 pb-4 pt-4 text-left shadow-lg shadow-green-500/50 sm:my-8 sm:p-6',
        !showBorder && 'border-transparent',
        showBorder &&
          areAnyFiltersActive() &&
          'border-yellow-500 shadow-xl shadow-yellow-500/50',
      )}
    >
      <div className="grid-cols-full grid gap-x-8 gap-y-4 divide-y divide-green-800 bg-black sm:grid-cols-4">
        {areAnyFiltersActive() && (
          <div className="col-span-full flex items-center justify-end">
            <ClearFiltersButton onClick={clearFilters} />
          </div>
        )}

        <div className="col-span-full pt-2">
          <div className="flex w-full flex-col items-start justify-start gap-x-4 gap-y-2">
            <span className="flex w-full items-center justify-start text-left text-sm font-bold text-green-500">
              By Archtypes
            </span>
            <div className="grid w-full grid-cols-2 gap-x-8 text-left sm:grid-cols-3 md:grid-cols-4">
              {allArchtypes.map((archtype) => {
                return (
                  <div key={archtype}>
                    <Checkbox
                      label={capitalize(archtype)}
                      name={`archtype-${archtype}`}
                      checked={filters.archtypes.includes(archtype)}
                      onChange={() => handleArchtypeChange(archtype)}
                    />
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <div className="col-span-full pt-2">
          <div className="flex w-full flex-col items-start justify-start gap-x-4 gap-y-2">
            <span className="flex items-center justify-start text-left text-sm font-bold text-green-500">
              By Weapons
            </span>
            <div className="grid grid-cols-1 gap-x-8 text-left sm:grid-cols-3">
              <SelectMenu
                name="longGun"
                label="Long Guns"
                value={filters.longGun}
                options={allLongGuns.map((weapon) => ({
                  label: weapon,
                  value: weapon,
                }))}
                onChange={(e) => handleWeaponChange(e.target.value, 'longGun')}
              />
              <SelectMenu
                name="melee"
                label="Melee"
                value={filters.melee}
                options={allMelee.map((weapon) => ({
                  label: weapon,
                  value: weapon,
                }))}
                onChange={(e) => handleWeaponChange(e.target.value, 'melee')}
              />
              <SelectMenu
                name="handGun"
                label="Hand Guns"
                value={filters.handGun}
                options={allHandGuns.map((weapon) => ({
                  label: weapon,
                  value: weapon,
                }))}
                onChange={(e) => handleWeaponChange(e.target.value, 'handGun')}
              />
            </div>
          </div>
        </div>

        <div className="col-span-full flex items-center justify-end pt-2">
          <button
            className="rounded bg-green-500 p-2 text-sm font-bold hover:bg-green-700"
            onClick={() => onUpdate(filters)}
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  )
}
