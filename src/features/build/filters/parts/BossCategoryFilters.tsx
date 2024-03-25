import { BossCategory } from '@/features/enemies/types'
import { Checkbox } from '@/features/ui/Checkbox'
import { capitalize } from '@/lib/capitalize'

export const DEFAULT_BOSS_FILTERS: BossCategory[] = [
  'world boss',
  'boss',
  'aberration',
]

interface Props {
  selectedBossCategories: BossCategory[]
  onUpdate: (category: BossCategory) => void
}

export function BossCategoryFilters({
  selectedBossCategories,
  onUpdate,
}: Props) {
  return (
    <>
      <div className="flex w-full items-center justify-start text-left text-sm font-bold text-primary-500">
        By Category
      </div>

      <div className="relative flex w-full flex-row items-center shadow-sm">
        <div className="grid grid-cols-2 gap-x-8 text-left sm:grid-cols-3">
          {DEFAULT_BOSS_FILTERS.map((category) => {
            const label =
              category === 'world boss' ? 'World Boss' : capitalize(category)
            return (
              <div key={category}>
                <Checkbox
                  label={label}
                  name={`category-${category}`}
                  checked={selectedBossCategories.includes(category)}
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
