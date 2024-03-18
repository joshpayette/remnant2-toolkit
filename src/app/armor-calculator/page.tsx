'use client'

import { useState } from 'react'

import { WeightClassWithDefault } from '@/features/armor-calculator/types'
import { FiltersContainer } from '@/features/ui/filters/FiltersContainer'
import { PageHeader } from '@/features/ui/PageHeader'
import { SelectMenu } from '@/features/ui/SelectMenu'

// TODO Add note about using the tool from the build page for more build specific armor suggestions

type Filters = {
  selectedWeightTier: WeightClassWithDefault
}

const DEFAULT_FILTERS: Filters = {
  selectedWeightTier: 'CHOOSE',
}

export default function Page() {
  const filters: Filters = DEFAULT_FILTERS
  const [unappliedFilters, setUnappliedFilters] =
    useState<Filters>(DEFAULT_FILTERS)

  const areFiltersApplied =
    unappliedFilters.selectedWeightTier !== DEFAULT_FILTERS.selectedWeightTier
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
            <SelectMenu
              label="Desired Weight Class"
              name="desired_weight_class"
              options={[
                { label: 'Choose', value: 'CHOOSE' },
                { label: 'Light', value: 'LIGHT' },
                { label: 'Medium', value: 'MEDIUM' },
                { label: 'Heavy', value: 'HEAVY' },
                { label: 'Ultra', value: 'ULTRA' },
              ]}
              onChange={(e) =>
                setUnappliedFilters({
                  ...unappliedFilters,
                  selectedWeightTier: e.target.value as WeightClassWithDefault,
                })
              }
              value={unappliedFilters.selectedWeightTier}
            />
          </FiltersContainer>
        </div>
      </div>
    </>
  )
}
