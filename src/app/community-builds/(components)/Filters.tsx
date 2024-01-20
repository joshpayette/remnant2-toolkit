import ClearFiltersButton from '@/app/(components)/ClearFiltersButton'
import { remnantItems } from '@/app/(data)'
import { cn } from '@/app/(lib)/utils'
import { Archtype } from '@/app/(types)'
import { useState } from 'react'

export interface FilterProps {
  archtypes: Archtype[]
}

export const defaultFilters: FilterProps = {
  archtypes: [],
}

const allArchtypes: Archtype[] = remnantItems
  .filter((item) => item.category === 'archtype')
  .map((item) => item.name.toLowerCase() as Archtype)

interface Props {
  showBorder?: boolean
  onUpdate: (filters: FilterProps) => void
}

export default function Filters({ showBorder = true, onUpdate }: Props) {
  const [filters, setFilters] = useState<FilterProps>(defaultFilters)

  function clearFilters() {
    setFilters(defaultFilters)
    onUpdate(defaultFilters)
  }

  const areAnyFiltersActive = () => {
    return filters.archtypes.length > 0
  }

  function handleArchtypeChange(archtype: Archtype) {
    console.info('handleArchtypeChange', archtype)

    let newArchtypes = [...filters.archtypes]

    if (newArchtypes.includes(archtype)) {
      newArchtypes = newArchtypes.filter((a) => a !== archtype)
    } else {
      // Only allow two archtypes to be selected at a time
      if (filters.archtypes.length === 2) {
        return
      }
      newArchtypes.push(archtype)
    }

    setFilters({
      ...filters,
      archtypes: newArchtypes,
    })
  }

  return (
    <div
      className={cn(
        'relative h-full max-h-fit w-full transform overflow-y-auto border-2 border-green-500 bg-black px-4 pb-4 pt-4 text-left shadow-lg shadow-green-500/50 sm:my-8 sm:p-6',
        !showBorder && 'border-transparent',
        showBorder &&
          areAnyFiltersActive() &&
          'border-yellow-500 shadow-xl shadow-yellow-500/50',
      )}
    >
      <div className="grid-cols-full grid gap-x-8 gap-y-4 divide-y divide-green-800 bg-black sm:grid-cols-4">
        {areAnyFiltersActive() && (
          <div className="col-span-full flex items-center justify-end">
            <ClearFiltersButton onClick={clearFilters} />
          </div>
        )}

        <div className="col-span-full pt-2">
          <div className="flex w-full flex-col items-start justify-start gap-x-4 gap-y-2">
            <span className="flex items-center justify-start text-left text-sm font-bold text-green-500">
              By Archtypes
            </span>
            <div className="grid grid-cols-2 gap-x-8 text-left sm:grid-cols-4">
              {allArchtypes.map((archtype) => {
                return (
                  <div key={archtype}>
                    <Checkbox
                      label={archtype}
                      name={`archtype-${archtype}`}
                      checked={filters.archtypes.includes(archtype)}
                      onChange={() => handleArchtypeChange(archtype)}
                    />
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <div className="col-span-full flex items-center justify-end pt-2">
          <button
            className="rounded bg-green-500 p-2 text-sm font-bold hover:bg-green-700"
            onClick={() => onUpdate(filters)}
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  )
}

function Checkbox({
  checked,
  label,
  name,
  onChange,
}: {
  checked: boolean
  label: string
  name: string
  onChange: () => void
}) {
  return (
    <div className="relative flex items-start">
      <div className="flex h-6 items-center">
        <input
          id={`${name}`}
          aria-describedby={`${name}-description`}
          name={`${name}`}
          type="checkbox"
          className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-600"
          checked={checked}
          onChange={onChange}
        />
      </div>
      <div className="ml-3 text-sm leading-6">
        <label htmlFor={`${name}`} className="font-medium text-gray-400">
          {label}
        </label>
      </div>
    </div>
  )
}
