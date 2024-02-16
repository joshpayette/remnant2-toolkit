'use client'

import { Disclosure } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/solid'
import { useIsClient } from 'usehooks-ts'

import { BossCategory, Enemy } from '@/features/enemies/types'
import { ItemButton } from '@/features/items/components/ItemButton'
import { useLocalStorage } from '@/features/localstorage/useLocalStorage'
import { cn } from '@/lib/classnames'

interface BossTrackerCategory {
  category: BossCategory
  label: string
}

function getProgress(
  bosses: Array<Enemy & { discovered: boolean }>,
  bossCategory: BossTrackerCategory,
) {
  const discoveredCount = bosses.filter((boss) => {
    return boss.category === bossCategory.category && boss.discovered
  }).length

  let discoveredPercent = Math.round((discoveredCount / bosses.length) * 100)

  if (isNaN(discoveredPercent)) discoveredPercent = 0

  const totalDiscoverableBosses = bosses.filter(
    (boss) => boss.category === bossCategory.category,
  ).length

  return `${discoveredCount} / ${totalDiscoverableBosses} (${discoveredPercent}%)`
}

interface ListBossesProps {
  bosses: Array<Enemy & { discovered: boolean }>
  onClick: (itemId: string) => void
}

export function ListBosses({ bosses, onClick }: ListBossesProps) {
  const { collapsedBossCategories, setCollapsedBossCategories } =
    useLocalStorage()

  const isClient = useIsClient()

  function handleCategoryToggle(bossCategory: BossCategory) {
    const newCollapsedBossTypes = collapsedBossCategories.includes(bossCategory)
      ? collapsedBossCategories.filter((type) => type !== bossCategory)
      : [...collapsedBossCategories, bossCategory]

    setCollapsedBossCategories({
      categories: newCollapsedBossTypes,
    })
  }

  const bossCategories: BossTrackerCategory[] = [
    { category: 'world boss' as BossCategory, label: 'World Boss' },
    { category: 'boss' as BossCategory, label: 'Boss' },
    { category: 'aberration' as BossCategory, label: 'Aberration' },
  ].filter((bossCategory) => {
    const visibleBossCategories = Array.from(
      new Set(bosses.map((boss) => boss.category)),
    )
    return visibleBossCategories.includes(
      (bossCategory as BossTrackerCategory).category,
    )
  })

  if (!isClient) return null

  return (
    <div className="w-full">
      {bossCategories.map((bossCategory) => (
        <Disclosure
          key={bossCategory.label}
          defaultOpen={!collapsedBossCategories.includes(bossCategory.category)}
        >
          {({ open }) => (
            <>
              <Disclosure.Button
                onClick={() => handleCategoryToggle(bossCategory.category)}
                className="flex w-full justify-start border-b border-purple-700 p-4 text-left hover:border-green-400 hover:bg-black focus:outline-none focus-visible:ring focus-visible:ring-green-500/75"
              >
                <div className="w-full">
                  <h2 className="text-lg font-semibold">
                    {bossCategory.label}
                  </h2>
                  <span className="text-sm text-gray-400">
                    {isClient
                      ? getProgress(
                          bosses.filter((boss) => {
                            return boss.category === bossCategory.category
                          }),
                          bossCategory,
                        )
                      : 'Calculating...'}
                  </span>
                </div>
                <ChevronDownIcon
                  className={cn(
                    'h-5 w-5 text-white',
                    open ? 'rotate-180 transform' : '',
                  )}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="grid w-full grid-cols-1 gap-4 py-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                {bosses
                  .filter((boss) => {
                    return boss.category === bossCategory.category
                  }) // Filter by category
                  .map((boss) => (
                    <div
                      key={boss.id}
                      className="flex flex-col items-center justify-center"
                    >
                      <ItemButton
                        item={boss}
                        isEditable={false}
                        isToggled={boss.discovered}
                        onClick={() => onClick(boss.id)}
                        size="xl"
                        loadingType="lazy"
                      />
                    </div>
                  ))}
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      ))}
    </div>
  )
}
