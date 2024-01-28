import { remnantItems } from '@/features/items/data'
import { Archtype } from '@/features/items/types'
import { Checkbox } from '@/features/ui/Checkbox'
import { capitalize } from '@/lib/capitalize'

const allArchtypes: Archtype[] = remnantItems
  .filter((item) => item.category === 'archtype')
  .map((item) => item.name.toLowerCase() as Archtype)

interface Props {
  selectedArchtypes: Archtype[]
  onChange: (archtype: Archtype) => void
}

export default function ArchtypeFilters({
  selectedArchtypes,
  onChange,
}: Props) {
  return (
    <div className="col-span-full pt-2">
      <div className="flex w-full flex-col items-start justify-start gap-x-4 gap-y-2">
        <div className="flex w-full items-center justify-start text-left text-sm font-bold text-green-500">
          By Archtype
        </div>
        <div className="grid w-full grid-cols-2 gap-x-8 text-left sm:grid-cols-3 md:grid-cols-4">
          {allArchtypes.map((archtype) => {
            return (
              <div key={archtype}>
                <Checkbox
                  label={capitalize(archtype)}
                  name={`archtype-${archtype}`}
                  checked={selectedArchtypes.includes(archtype)}
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
