import { archetypeItems } from '@/features/items/data/archetypeItems'
import { Archetype } from '@/features/items/types'
import { Checkbox } from '@/features/ui/Checkbox'
import { capitalize } from '@/lib/capitalize'

const allArchetypeNames: Archetype[] = archetypeItems.map(
  (item) => item.name.toLowerCase() as Archetype,
)

export const DEFAULT_ARCHETYPE_FILTERS: Archetype[] = allArchetypeNames

interface Props {
  selectedArchetypes: Archetype[]
  onSelectAll: () => void
  onSelectNone: () => void
  onChange: (archtype: Archetype) => void
}

export function ArchetypeFilters({
  selectedArchetypes,
  onChange,
  onSelectAll,
  onSelectNone,
}: Props) {
  return (
    <div className="flex w-full flex-col items-start justify-start gap-x-4 gap-y-2">
      <div className="flex w-full items-center justify-start text-left text-sm font-bold text-primary-500">
        By Archetype
      </div>
      <div className="text-xs">
        <button
          className="underline"
          aria-label="Uncheck all archetypes"
          onClick={onSelectNone}
        >
          Uncheck All
        </button>{' '}
        /{' '}
        <button
          className="underline"
          aria-label="Check all archetypes"
          onClick={onSelectAll}
        >
          Check All
        </button>
      </div>
      <div className="grid w-full grid-cols-2 gap-x-8 text-left sm:grid-cols-3 md:grid-cols-4">
        {allArchetypeNames.map((archtype) => {
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
  )
}
