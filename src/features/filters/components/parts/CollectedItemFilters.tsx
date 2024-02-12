import { Checkbox } from '@/features/ui/Checkbox'

export const DEFAULT_COLLECTION_FILTERS = ['Discovered', 'Undiscovered']

interface Props {
  selectedCollectionKeys: string[]
  onUpdate: (collectionKey: string) => void
}

export function CollectedItemFilters({
  selectedCollectionKeys,
  onUpdate,
}: Props) {
  return (
    <div className="col-span-full pt-2">
      <div className="flex w-full flex-col items-start justify-start gap-x-4 gap-y-2">
        <div className="flex w-full items-center justify-start text-left text-sm font-bold text-green-500">
          By Collection
        </div>

        <div className="relative flex w-full flex-row items-center shadow-sm">
          <div className="grid grid-cols-2 text-left">
            {DEFAULT_COLLECTION_FILTERS.map((key) => {
              return (
                <div key={key} className="flex w-full">
                  <Checkbox
                    label={key}
                    name={`collection-${key}`}
                    checked={selectedCollectionKeys.includes(key)}
                    onChange={() => onUpdate(key)}
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
