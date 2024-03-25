import { ItemLookupCategory } from '@/features/items/types'
import { Checkbox } from '@/features/ui/Checkbox'
import { capitalize } from '@/lib/capitalize'

interface Props {
  defaultItemCategories: ItemLookupCategory[]
  selectedItemCategories: ItemLookupCategory[]
  onReset: (categories: ItemLookupCategory[]) => void
  onUpdate: (category: ItemLookupCategory) => void
}

export function ItemCategoryFilters({
  defaultItemCategories,
  selectedItemCategories,
  onReset,
  onUpdate,
}: Props) {
  return (
    <>
      <div className="flex w-full items-center justify-start text-left text-sm font-bold text-primary-500">
        By Category
      </div>
      <div className="text-xs">
        <button
          className="underline"
          aria-label="Uncheck all categories"
          onClick={() => onReset([])}
        >
          Uncheck All
        </button>{' '}
        /{' '}
        <button
          className="underline"
          aria-label="Check all categories"
          onClick={() => onReset(defaultItemCategories)}
        >
          Check All
        </button>
      </div>

      <div className="relative flex w-full flex-row items-center shadow-sm">
        <div className="grid grid-cols-2 gap-x-8 text-left sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {defaultItemCategories.map((category) => {
            let label = capitalize(category as string)
            if (category.toLowerCase() === 'relicfragment') {
              label = 'Relic Fragment'
            }
            return (
              <div key={label}>
                <Checkbox
                  label={label}
                  name={`category-${label}`}
                  checked={selectedItemCategories.includes(category)}
                  onChange={() => onUpdate(category)}
                />
              </div>
            )
          })}
        </div>
      </div>
    </>
  )
}
