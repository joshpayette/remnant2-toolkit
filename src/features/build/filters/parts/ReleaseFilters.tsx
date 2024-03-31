import { RELEASE_TO_NAME } from '@/features/items/constants'
import { ReleaseKey } from '@/features/items/types'
import { Checkbox } from '@/features/ui/Checkbox'
import { capitalize } from '@/lib/capitalize'

export const DEFAULT_RELEASE_FILTERS: ReleaseKey[] = ['base', 'dlc1']

interface Props {
  selectedReleases: ReleaseKey[]
  onChange: (release: ReleaseKey) => void
}

const allReleases: ReleaseKey[] = Object.keys(RELEASE_TO_NAME) as ReleaseKey[]

export function ReleaseFilters({ selectedReleases, onChange }: Props) {
  return (
    <div className="col-span-full w-full pt-2">
      <div className="flex w-full flex-col items-start justify-start gap-x-4 gap-y-2">
        <div className="flex w-full items-center justify-start text-left text-sm font-bold text-primary-500">
          By Release
        </div>
        <div className="grid w-full grid-cols-2 gap-x-8 text-left">
          {allReleases.map((release) => {
            return (
              <div key={release} className="flex w-full">
                <Checkbox
                  label={capitalize(RELEASE_TO_NAME[release])}
                  name={`release-${release}`}
                  checked={selectedReleases.includes(release)}
                  onChange={() => onChange(release)}
                />
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
