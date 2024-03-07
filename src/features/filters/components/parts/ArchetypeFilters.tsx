import { remnantItems } from '@/features/items/data/remnantItems'
import { Archetype } from '@/features/items/types'
import { Checkbox } from '@/features/ui/Checkbox'
import { capitalize } from '@/lib/capitalize'

const allArchetypes: Archetype[] = remnantItems
  .filter((item) => item.category === 'archetype')
  .map((item) => item.name.toLowerCase() as Archetype)

interface Props {
  selectedArchetypes: Archetype[]
  onChange: (archtype: Archetype) => void
}

export function ArchetypeFilters({ selectedArchetypes, onChange }: Props) {
  return (
    <div className="col-span-full pt-2">
      <div className="flex w-full flex-col items-start justify-start gap-x-4 gap-y-2">
        <div className="text-primary-500 flex w-full items-center justify-start text-left text-sm font-bold">
          By Archetype
        </div>
        <div className="grid w-full grid-cols-2 gap-x-8 text-left sm:grid-cols-3 md:grid-cols-4">
          {allArchetypes.map((archtype) => {
            return (
              <div key={archtype}>
                <Checkbox
                  label={capitalize(archtype)}
                  name={`archtype-${archtype}`}
                  checked={selectedArchetypes.includes(archtype)}
                  onChange={() => onChange(archtype)}
                />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
