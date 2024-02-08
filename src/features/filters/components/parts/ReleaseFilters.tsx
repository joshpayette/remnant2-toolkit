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

export default function ReleaseFilters({ selectedReleases, onChange }: Props) {
  return (
    <div className="col-span-full pt-2">
      <div className="flex w-full flex-col items-start justify-start gap-x-4 gap-y-2">
        <div className="flex w-full items-center justify-start text-left text-sm font-bold text-green-500">
          By Release
        </div>
        <div className="grid w-full grid-cols-2 gap-x-8 text-left sm:grid-cols-3">
          {allReleases.map((release) => {
            return (
              <div key={release}>
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
