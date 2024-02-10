'use client'

import { Disclosure } from '@headlessui/react'
import { cn } from '@/lib/classnames'
import { useIsClient } from 'usehooks-ts'
import { useLocalStorage } from '@/features/localstorage/useLocalStorage'
import { ChevronDownIcon } from '@heroicons/react/24/solid'
import { Boss, BossCategory } from '@/features/bosses/types'
import BossCard from './BossCard'

interface BossTrackerCategory {
  category: BossCategory
  label: string
}

function getProgress(
  bosses: Array<Boss & { discovered: boolean }>,
  bossCategory: BossTrackerCategory,
  isClient: boolean,
) {
  const discoveredCount = bosses.filter((boss) => {
    return boss.category === bossCategory.category && boss.discovered
  }).length

  let discoveredPercent = Math.round((discoveredCount / bosses.length) * 100)

  if (isNaN(discoveredPercent)) discoveredPercent = 0

  const totalDiscoverableBosses = bosses.filter(
    (boss) => boss.category === bossCategory.category,
  ).length

  return isClient
    ? `${discoveredCount} / ${totalDiscoverableBosses} (${discoveredPercent}%)`
    : 'Calculating...'
}

interface ListBossesProps {
  bosses: Array<Boss & { discovered: boolean }>
  onClick: (itemId: string) => void
}

export default function ListBosses({ bosses, onClick }: ListBossesProps) {
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
                    {getProgress(
                      bosses.filter((boss) => {
                        return boss.category === bossCategory.category
                      }),
                      bossCategory,
                      isClient,
                    )}
                  </span>
                </div>
                <ChevronDownIcon
                  className={cn(
                    'h-5 w-5 text-white',
                    open ? 'rotate-180 transform' : '',
                  )}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="grid w-full grid-cols-2 gap-4 py-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
                {bosses
                  .filter((boss) => {
                    return boss.category === bossCategory.category
                  }) // Filter by category
                  .map((boss) => (
                    <div key={boss.id} className="flex flex-col">
                      <div
                        className={cn(
                          'relative h-full w-full',
                          boss.discovered
                            ? 'border-2 border-green-500 grayscale-0'
                            : 'border-2 border-transparent grayscale',
                        )}
                      >
                        <BossCard
                          boss={boss}
                          onClick={() => onClick(boss.id)}
                        />
                      </div>
                      {/* <div className="flex items-end justify-end bg-black">
                        <button
                          className="flex w-auto items-center gap-1 rounded-md px-2 py-1 text-xs text-green-500 hover:bg-green-500 hover:text-black focus:outline-none focus-visible:ring focus-visible:ring-green-500/75"
                          onClick={() => onShowItemInfo(item.id)}
                        >
                          <InformationCircleIcon className="h-5 w-5" /> Info
                        </button>
                      </div> */}
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
