import { remnantItems } from '@/features/items/data/remnantItems'
import SelectMenu from '@/features/ui/SelectMenu'
import { GenericItem } from '@/features/items/types/GenericItem'

export const DEFAULT_JEWELRY_FILTERS = {
  amulet: 'All',
  ring: 'All',
}

const allRings: string[] = remnantItems
  .filter((item) => GenericItem.isGenericItem(item) && item.category === 'ring')
  .map((item) => item.name)
allRings.unshift(DEFAULT_JEWELRY_FILTERS.ring)

const allAmulets: string[] = remnantItems
  .filter(
    (item) => GenericItem.isGenericItem(item) && item.category === 'amulet',
  )
  .map((item) => item.name)
allAmulets.unshift(DEFAULT_JEWELRY_FILTERS.amulet)

interface Props {
  selectedRing: string
  selectedAmulet: string
  onChangeRing: (ring: string) => void
  onChangeAmulet: (amulet: string) => void
}

export default function JewelryFilters({
  selectedRing,
  selectedAmulet,
  onChangeRing,
  onChangeAmulet,
}: Props) {
  return (
    <div className="col-span-full pt-2">
      <div className="flex w-full flex-col items-start justify-start gap-x-4 gap-y-2">
        <div className="flex items-center justify-start text-left text-sm font-bold text-green-500">
          By Jewelry
        </div>
        <div className="grid grid-cols-1 gap-x-8 text-left sm:grid-cols-2">
          <SelectMenu
            name="amulet"
            label="Amulets"
            value={selectedAmulet}
            options={allAmulets.map((amulet) => ({
              label: amulet,
              value: amulet,
            }))}
            onChange={(e) => onChangeAmulet(e.target.value)}
          />
          <SelectMenu
            name="ring"
            label="Ring"
            value={selectedRing}
            options={allRings.map((ring) => ({
              label: ring,
              value: ring,
            }))}
            onChange={(e) => onChangeRing(e.target.value)}
          />
        </div>
      </div>
    </div>
  )
}
