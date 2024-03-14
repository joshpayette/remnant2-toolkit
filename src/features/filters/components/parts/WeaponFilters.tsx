import { remnantItems } from '@/features/items/data/remnantItems'
import { WeaponItem } from '@/features/items/types/WeaponItem'
import { SelectMenu } from '@/features/ui/SelectMenu'

export const DEFAULT_WEAPON_FILTERS = {
  longGun: 'All',
  handGun: 'All',
  melee: 'All',
}

const allLongGuns: string[] = remnantItems
  .filter((item) => WeaponItem.isWeaponItem(item) && item.type === 'long gun')
  .map((item) => item.name)
allLongGuns.unshift(DEFAULT_WEAPON_FILTERS.longGun)

const allHandGuns: string[] = remnantItems
  .filter((item) => WeaponItem.isWeaponItem(item) && item.type === 'hand gun')
  .map((item) => item.name)
allHandGuns.unshift(DEFAULT_WEAPON_FILTERS.handGun)

const allMelee: string[] = remnantItems
  .filter((item) => WeaponItem.isWeaponItem(item) && item.type === 'melee')
  .map((item) => item.name)
allMelee.unshift(DEFAULT_WEAPON_FILTERS.melee)

interface Props {
  selectedLongGun: string
  selectedHandGun: string
  selectedMelee: string
  onChange: (weapon: string, type: 'longGun' | 'melee' | 'handGun') => void
}

export function WeaponFilters({
  selectedLongGun,
  selectedHandGun,
  selectedMelee,
  onChange,
}: Props) {
  return (
    <div className="col-span-full pt-2">
      <div className="flex w-full flex-col items-start justify-start">
        <div className="grid w-full grid-cols-1 gap-x-8 gap-y-4 text-left sm:grid-cols-3 sm:gap-y-0">
          <SelectMenu
            name="longGun"
            label="By Long Gun"
            value={selectedLongGun}
            options={allLongGuns.map((weapon) => ({
              label: weapon,
              value: weapon,
            }))}
            onChange={(e) => onChange(e.target.value, 'longGun')}
          />
          <SelectMenu
            name="melee"
            label="By Melee"
            value={selectedMelee}
            options={allMelee.map((weapon) => ({
              label: weapon,
              value: weapon,
            }))}
            onChange={(e) => onChange(e.target.value, 'melee')}
          />
          <SelectMenu
            name="handGun"
            label="By Hand Gun"
            value={selectedHandGun}
            options={allHandGuns.map((weapon) => ({
              label: weapon,
              value: weapon,
            }))}
            onChange={(e) => onChange(e.target.value, 'handGun')}
          />
        </div>
      </div>
    </div>
  )
}
