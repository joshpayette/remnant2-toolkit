import { remnantItemTypes } from '@/data/items'
import type { Filters } from './types'
import { capitalize, cn } from '@/lib/utils'
import type { Item } from '@/types'
import ItemCard from '@/components/ItemCard'

interface ListItemsProps {
  filters: Filters
  items: Item[]
  title: string
  onClick: (itemId: string) => void
}

export default function ListItems({
  filters,
  items,
  title,
  onClick,
}: ListItemsProps) {
  const gridTemplate =
    'grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8'

  return (
    <div id="undiscovered-items" className="mb-6">
      <div className="border-b border-purple-700 pb-4">
        <h1 className="text-2xl font-semibold leading-6 text-white">{title}</h1>
      </div>
      {remnantItemTypes.map(
        (itemType) =>
          filters[itemType] && (
            <div key={itemType}>
              <div className="border-b border-purple-700 pb-4 pt-4">
                <h2 className="text-lg font-semibold leading-6 text-white">
                  {capitalize(itemType)}
                </h2>
              </div>
              <div className={cn(gridTemplate)}>
                {items
                  .filter((item) => item.type === itemType)
                  .map((item) => (
                    <button
                      key={item.id}
                      className="grayscale hover:grayscale-0"
                      onClick={() => onClick(item.id)}
                    >
                      <ItemCard item={item} />
                    </button>
                  ))}
              </div>
            </div>
          ),
      )}
    </div>
  )
}
