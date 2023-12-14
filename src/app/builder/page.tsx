'use client'

import { Fragment, useState } from 'react'
import PageHeader from '@/app/(components)/PageHeader'
import ImageBuilder from './(components)/ImageBuilder'
import useQueryString from '@/app/builder/(hooks)/useBuilder'
import { cn, itemToCsvItem } from '@/app/utils'
import { useLocalStorage } from '@/app/(hooks)/useLocalStorage'
import ToCsvButton from '../(components)/ToCsvButton'
import { remnantItemCategories } from '@/app/(data)'
import { type TraitItem } from '@/app/types'
import { useIsClient } from 'usehooks-ts'
import copy from 'clipboard-copy'

export default function BuildHomePage() {
  const isClient = useIsClient()

  const { currentBuild } = useQueryString()
  const { builderStorage, setBuilderStorage } = useLocalStorage()

  const [showLabels, setShowLabels] = useState(builderStorage.showLabels)
  const [showControls, setShowControls] = useState(builderStorage.showControls)

  function toggleShowLabels() {
    setShowLabels(!showLabels)
    setBuilderStorage({
      ...builderStorage,
      showLabels: !showLabels,
    })
  }

  function toggleShowControls() {
    setShowControls(!showControls)
    setBuilderStorage({
      ...builderStorage,
      showControls: !showControls,
    })
  }

  // We need to convert the build.items object into an array of items to pass to the ToCsvButton
  const csvBuildData = remnantItemCategories
    .map((category) => {
      const itemOrItems = currentBuild.items[category]

      if (!itemOrItems)
        return {
          name: '',
          category,
          description: '',
          howToGet: '',
          wikiLinks: '',
        }

      if (Array.isArray(itemOrItems)) {
        if (category === 'trait') {
          return itemOrItems.map((item) => {
            const traitItem = item as TraitItem
            const csvItem = itemToCsvItem(traitItem)
            return {
              ...csvItem,
              amount: traitItem.amount,
            }
          })
        }

        return itemOrItems.map((item) => itemToCsvItem(item))
      }

      if (itemOrItems.category === 'trait') {
        if (!Array.isArray(itemOrItems)) {
          return {
            name: '',
            category,
            description: '',
            howToGet: '',
            wikiLinks: '',
          }
        }
        return itemOrItems.map((item) => itemToCsvItem(item.item))
      }
    })
    .flat()

  if (!isClient) return null

  return (
    <Fragment>
      <PageHeader
        title="Remnant 2 Build Tool"
        subtitle="Create and share Remnant 2 builds"
      >
        <div
          id="alert"
          className="rounded border border-orange-500 bg-black p-4 text-orange-500"
        >
          <p>
            This tool should be mostly stable at this point. However, I am still
            iterating on it and so your build URLs could break in the future.
            Please use the export CSV feature to save your build data in case
            this happens. I will try my best not to do that though!
          </p>
        </div>
      </PageHeader>
      <div className="flex w-full max-w-xl flex-col items-start justify-center gap-2 sm:flex-row-reverse">
        <div
          id="actions-column"
          className="flex min-w-full flex-col justify-between sm:min-w-[100px]"
        >
          <div id="actions" className="flex flex-col gap-2">
            <button
              id="show-labels-button"
              className={cn(
                'flex flex-col items-center rounded border px-4 py-2 font-bold text-white hover:bg-green-700',
                showLabels
                  ? 'border-transparent bg-green-500'
                  : 'border-green-500 bg-black',
              )}
              onClick={toggleShowLabels}
            >
              <span className="text-sm">
                {showLabels ? 'Hide Labels' : 'Show Labels'}
              </span>
            </button>

            <button
              id="show-controls-button"
              className={cn(
                'flex flex-col items-center rounded border px-4 py-2 font-bold text-white hover:bg-green-700',
                showControls
                  ? 'border-transparent bg-green-500'
                  : 'border-green-500 bg-black',
              )}
              onClick={toggleShowControls}
            >
              <span className="text-sm">
                {showControls ? 'Hide Controls' : 'Show Controls'}
              </span>
            </button>

            <button
              className="flex flex-col items-center rounded border border-purple-500 px-4 py-2 text-sm font-bold text-white hover:bg-purple-700"
              onClick={() => {
                copy(window.location.href)
                alert('Copied to clipboard!')
              }}
            >
              Copy Build URL
            </button>

            <ToCsvButton
              data={csvBuildData}
              filename={`remnant2_builder_${currentBuild.name}`}
            />

            <button
              className="flex flex-col items-center rounded border border-red-500 bg-red-700 px-4 py-2 text-sm font-bold text-white hover:bg-red-500"
              onClick={() => {
                window.location.href = '/builder'
              }}
            >
              New Build
            </button>
          </div>
        </div>
        <div className="w-full grow rounded border-2 border-green-500 bg-black p-4">
          <ImageBuilder showLabels={showLabels} showControls={showControls} />
        </div>
      </div>
    </Fragment>
  )
}
