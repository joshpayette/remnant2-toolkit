import { ItemCategory } from '@/features/build/types'
import { remnantItemCategories } from '@/features/items/data/remnantItems'
import { Checkbox } from '@/features/ui/Checkbox'
import { capitalize } from '@/lib/capitalize'

interface Props {
  itemCategories?: ItemCategory[]
  selectedItemCategories: ItemCategory[]
  onReset: (categories: ItemCategory[]) => void
  onUpdate: (category: ItemCategory) => void
}

export default function ItemCategoryFilters({
  itemCategories,
  selectedItemCategories,
  onReset,
  onUpdate,
}: Props) {
  const defaultItemCategories: ItemCategory[] =
    itemCategories?.sort((a, b) => {
      if (a < b) return -1
      if (a > b) return 1
      return 0
    }) ??
    remnantItemCategories.sort((a, b) => {
      if (a < b) return -1
      if (a > b) return 1
      return 0
    })

  return (
    <div className="col-span-full pt-2">
      <div className="flex w-full flex-col items-start justify-start gap-x-4 gap-y-2">
        <div className="flex w-full items-center justify-start text-left text-sm font-bold text-green-500">
          By Category
        </div>
        <div className="text-xs">
          <button className="underline" onClick={() => onReset([])}>
            Uncheck All
          </button>{' '}
          /{' '}
          <button
            className="underline"
            onClick={() => onReset(defaultItemCategories)}
          >
            Check All
          </button>
        </div>

        <div className="relative flex w-full flex-row items-center shadow-sm">
          <div className="grid grid-cols-2 gap-x-8 text-left sm:grid-cols-5">
            {defaultItemCategories.map((category) => {
              return (
                <div key={category}>
                  <Checkbox
                    label={capitalize(category)}
                    name={`category-${category}`}
                    checked={selectedItemCategories.includes(category)}
                    onChange={() => onUpdate(category)}
                  />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
