'use client'

import { WeightClassWithDefault } from '@/features/armor-calculator/types'
import { FiltersContainer } from '@/features/filters/components/parts/FiltersContainer'
import { PageHeader } from '@/features/ui/PageHeader'

type Filters = {
  selectedWeightTier: WeightClassWithDefault
}

const defaultFilters: Filters = {
  selectedWeightTier: 'CHOOSE',
}

export default function Page() {
  const filters: Filters = defaultFilters
  const areFiltersApplied = false
  const areAnyFiltersActive = false

  function handleClearFilters() {}

  function handleApplyFilters() {}

  return (
    <>
      <PageHeader
        title="Armor Calculator"
        subtitle="Calculate the maximum armor you can get for a particular weight tier"
      />
      <div className="flex w-full flex-col items-center">
        <div className="w-full max-w-4xl">
          <FiltersContainer<Filters>
            filters={filters}
            areAnyFiltersActive={areAnyFiltersActive}
            areFiltersApplied={areFiltersApplied}
            onApplyFilters={handleApplyFilters}
            onClearFilters={handleClearFilters}
          >
            Filters go here
          </FiltersContainer>
        </div>
      </div>
    </>
  )
}
