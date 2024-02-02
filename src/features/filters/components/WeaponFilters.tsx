import { remnantItems } from '@/features/items/data/remnantItems'
import SelectMenu from '@/features/ui/SelectMenu'
import { WeaponItem } from '@/features/items/types/WeaponItem'
import { DEFAULT_COMMUNITY_BUILD_FILTERS } from '../constants'

const allLongGuns: string[] = remnantItems
  .filter((item) => WeaponItem.isWeaponItem(item) && item.type === 'long gun')
  .map((item) => item.name)
allLongGuns.unshift(DEFAULT_COMMUNITY_BUILD_FILTERS.longGun)

const allHandGuns: string[] = remnantItems
  .filter((item) => WeaponItem.isWeaponItem(item) && item.type === 'hand gun')
  .map((item) => item.name)
allHandGuns.unshift(DEFAULT_COMMUNITY_BUILD_FILTERS.handGun)

const allMelee: string[] = remnantItems
  .filter((item) => WeaponItem.isWeaponItem(item) && item.type === 'melee')
  .map((item) => item.name)
allMelee.unshift(DEFAULT_COMMUNITY_BUILD_FILTERS.melee)

interface Props {
  selectedLongGun: string
  selectedHandGun: string
  selectedMelee: string
  onChange: (weapon: string, type: 'longGun' | 'melee' | 'handGun') => void
}

export default function WeaponFilters({
  selectedLongGun,
  selectedHandGun,
  selectedMelee,
  onChange,
}: Props) {
  return (
    <div className="col-span-full pt-2">
      <div className="flex w-full flex-col items-start justify-start gap-x-4 gap-y-2">
        <div className="flex items-center justify-start text-left text-sm font-bold text-green-500">
          By Weapon
        </div>
        <div className="grid grid-cols-1 gap-x-8 text-left sm:grid-cols-3">
          <SelectMenu
            name="longGun"
            label="Long Guns"
            value={selectedLongGun}
            options={allLongGuns.map((weapon) => ({
              label: weapon,
              value: weapon,
            }))}
            onChange={(e) => onChange(e.target.value, 'longGun')}
          />
          <SelectMenu
            name="melee"
            label="Melee"
            value={selectedMelee}
            options={allMelee.map((weapon) => ({
              label: weapon,
              value: weapon,
            }))}
            onChange={(e) => onChange(e.target.value, 'melee')}
          />
          <SelectMenu
            name="handGun"
            label="Hand Guns"
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
