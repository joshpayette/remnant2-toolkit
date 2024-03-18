import { BUILD_TAG } from '@prisma/client'

import { ALL_TAGS } from '@/features/build/build-tags/constants'
import { Checkbox } from '@/features/ui/Checkbox'
import { capitalize } from '@/lib/capitalize'

export type BuildTagFilterItem = {
  label: string
  value: BUILD_TAG
}

const allTags: BuildTagFilterItem[] = ALL_TAGS.map((tag) => ({
  label: capitalize(tag.label),
  value: tag.value,
}))

export const DEFAULT_BUILD_TAG_FILTERS = []

interface Props {
  selectedTags: BuildTagFilterItem[]
  onChange: (tag: BuildTagFilterItem) => void
}

export function BuildTagFilters({ selectedTags, onChange }: Props) {
  return (
    <div className="col-span-full pt-2">
      <div className="flex w-full flex-col items-start justify-start gap-x-4 gap-y-2">
        <div className="flex w-full items-center justify-start text-left text-sm font-bold text-primary-500">
          By Build Tags
        </div>
        <div className="grid w-full grid-cols-2 gap-x-8 text-left">
          {allTags.map((tag) => {
            return (
              <div key={tag.label} className="flex w-full">
                <Checkbox
                  label={capitalize(tag.label)}
                  name={`tag-${tag.value}`}
                  checked={selectedTags.some((t) => t.value === tag.value)}
                  onChange={() => onChange(tag)}
                />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
