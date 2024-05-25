'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { FaUnlink } from 'react-icons/fa'
import { FaLink } from 'react-icons/fa6'
import { toast } from 'react-toastify'

import createLinkedBuild from '@/app/(actions)/builds/create-linked-build'
import { getCreatedBuilds } from '@/app/(actions)/builds/get-created-builds'
import updatedLinkedBuild from '@/app/(actions)/builds/update-linked-build'
import { BaseButton } from '@/app/(components)/_base/button'
import { BaseField, BaseLabel } from '@/app/(components)/_base/fieldset'
import { BaseInput } from '@/app/(components)/_base/input'
import { BuildList } from '@/app/(components)/build-list'
import { BuildCard } from '@/app/(components)/cards/build-card'
import { OrderByFilter } from '@/app/(components)/filters/builds/secondary-filters/order-by-filter'
import { useOrderByFilter } from '@/app/(components)/filters/builds/secondary-filters/order-by-filter/use-order-by-filter'
import { TimeRangeFilter } from '@/app/(components)/filters/builds/secondary-filters/time-range-filter'
import { useTimeRangeFilter } from '@/app/(components)/filters/builds/secondary-filters/time-range-filter/use-time-range-filter'
import { Tooltip } from '@/app/(components)/tooltip'
import { DBBuild } from '@/app/(types)/builds'
import { useBuildListState } from '@/app/(utils)/builds/hooks/use-build-list-state'
import { usePagination } from '@/app/(utils)/pagination/use-pagination'
import {
  MAX_LINKED_BUILD_ITEMS,
  MAX_LINKED_BUILD_LABEL_LENGTH,
} from '@/app/builder/linked/constants'
import { LinkedBuildItem } from '@/app/builder/linked/create/[buildId]/type'

interface Props {
  currentLinkedBuild: {
    id: string
    createdById: string
    name: string
    linkedBuilds: Array<{
      label: string
      build: DBBuild
    }>
  }
  userId: string
}

export default function PageClient({ currentLinkedBuild, userId }: Props) {
  const router = useRouter()

  const [name, setName] = useState(currentLinkedBuild.name)

  const [linkedBuildItems, setLinkedBuildItems] = useState<LinkedBuildItem[]>(
    currentLinkedBuild.linkedBuilds.map((linkedBuildItem) => linkedBuildItem),
  )

  const { buildListState, setBuildListState } = useBuildListState()
  const { builds, totalBuildCount, isLoading } = buildListState

  const itemsPerPage = 16

  const { orderBy, handleOrderByChange } = useOrderByFilter('newest')
  const { timeRange, handleTimeRangeChange } = useTimeRangeFilter('all-time')

  const {
    currentPage,
    firstVisibleItemNumber,
    lastVisibleItemNumber,
    pageNumbers,
    totalPages,
    handleSpecificPageClick,
    handleNextPageClick,
    handlePreviousPageClick,
  } = usePagination({
    totalItemCount: totalBuildCount,
    itemsPerPage,
  })

  useEffect(() => {
    const getItemsAsync = async () => {
      setBuildListState((prevState) => ({ ...prevState, isLoading: true }))
      const response = await getCreatedBuilds({
        itemsPerPage,
        orderBy,
        pageNumber: currentPage,
        timeRange,
        userId,
      })
      setBuildListState((prevState) => ({
        ...prevState,
        isLoading: false,
        builds: response.items,
        totalBuildCount: response.totalItemCount,
      }))
    }
    getItemsAsync()
  }, [currentPage, itemsPerPage, orderBy, setBuildListState, timeRange, userId])

  function handleAddLinkedBuildItem(buildToAdd: DBBuild) {
    // If the build is already linked, don't add it again
    if (
      linkedBuildItems.some(
        (linkedBuildItem) => linkedBuildItem.build.id === buildToAdd.id,
      )
    ) {
      toast.error('Build is already linked.')
      return
    }

    // If the max number of linked builds has been reached, don't add another
    if (linkedBuildItems.length >= MAX_LINKED_BUILD_ITEMS) {
      toast.error('Maximum linked builds reached.')
      return
    }

    const newLinkedBuildItems = [
      ...linkedBuildItems,
      { label: `Variation #${linkedBuildItems.length + 1}`, build: buildToAdd },
    ]
    setLinkedBuildItems(newLinkedBuildItems)
  }

  function handleRemoveLinkedBuildItem(buildToRemove: DBBuild) {
    // If only one build remaining, don't remove it
    if (linkedBuildItems.length === 1) {
      toast.error('At least one build must be linked.')
      return
    }

    const newLinkedBuildItems = linkedBuildItems.filter(
      (linkedBuildItem) => linkedBuildItem.build.id !== buildToRemove.id,
    )
    setLinkedBuildItems(newLinkedBuildItems)
  }

  async function handleSaveLinkedBuild() {
    const response = await updatedLinkedBuild({
      name,
      id: currentLinkedBuild.id,
      createdById: userId,
      linkedBuildItems: linkedBuildItems.map((linkedBuildItem) => ({
        label: linkedBuildItem.label,
        buildId: linkedBuildItem.build.id,
      })),
    })

    if (response.status === 'error') {
      toast.error(response.message)
      return
    }
    if (!response.linkedBuild) {
      toast.error('An error occurred while creating the linked build.')
      return
    }
    toast.success(response.message)
    router.push(`/builder/linked/${response.linkedBuild.id}`)
  }

  return (
    <div className="flex w-full flex-col gap-y-8">
      <BaseField className="max-w-[500px]">
        <BaseLabel>Linked Build Name</BaseLabel>
        <BaseInput
          name="linked-build-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </BaseField>
      <div className="flex w-full flex-col items-start justify-start border-b border-b-primary-500 py-2">
        <ul
          role="list"
          className="my-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {linkedBuildItems.map((linkedBuild) => (
            <div
              key={linkedBuild.build.id}
              className="flex h-full w-full flex-col gap-y-4"
            >
              <BuildCard
                build={linkedBuild.build}
                isLoading={isLoading}
                showBuildVisibility={false}
                footerActions={
                  <div className="flex w-full items-center justify-center gap-6 p-2 text-sm">
                    <Tooltip content="Copy Build URL">
                      <BaseButton
                        color="red"
                        aria-label="Copy build URL to clipboard"
                        onClick={() =>
                          handleRemoveLinkedBuildItem(linkedBuild.build)
                        }
                      >
                        <FaUnlink className="h-4 w-4" />
                      </BaseButton>
                    </Tooltip>
                  </div>
                }
              />
              <BaseField>
                <BaseInput
                  name={`${linkedBuild.build.id}-label`}
                  value={linkedBuild.label}
                  maxLength={MAX_LINKED_BUILD_LABEL_LENGTH}
                  onChange={(e) => {
                    const newLinkedBuildItems = linkedBuildItems.map(
                      (linkedBuildItem) => {
                        if (linkedBuildItem.build.id === linkedBuild.build.id) {
                          return { ...linkedBuildItem, label: e.target.value }
                        }
                        return linkedBuildItem
                      },
                    )
                    setLinkedBuildItems(newLinkedBuildItems)
                  }}
                />
              </BaseField>
            </div>
          ))}
        </ul>
        <div className="flex w-full items-center justify-end">
          <BaseButton color="green" onClick={handleSaveLinkedBuild}>
            Save Linked Build
          </BaseButton>
        </div>
      </div>
      <BuildList
        currentPage={currentPage}
        isLoading={isLoading}
        label="Created Builds"
        pageNumbers={pageNumbers}
        totalItems={totalBuildCount}
        totalPages={totalPages}
        firstVisibleItemNumber={firstVisibleItemNumber}
        lastVisibleItemNumber={lastVisibleItemNumber}
        onPreviousPage={handlePreviousPageClick}
        onNextPage={handleNextPageClick}
        onSpecificPage={handleSpecificPageClick}
        headerActions={
          <div className="flex w-full flex-col items-end justify-end gap-x-2 gap-y-1 sm:flex-row sm:gap-y-0">
            <div className="w-full max-w-[250px]">
              <TimeRangeFilter
                value={timeRange}
                onChange={handleTimeRangeChange}
              />
            </div>
            <div className="w-full max-w-[250px]">
              <OrderByFilter value={orderBy} onChange={handleOrderByChange} />
            </div>
          </div>
        }
      >
        <ul
          role="list"
          className="mb-4 mt-8 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {builds.map((build) => (
            <div key={build.id} className="h-full w-full">
              <BuildCard
                build={build}
                isLoading={isLoading}
                showBuildVisibility={false}
                footerActions={
                  <div className="flex w-full items-center justify-center gap-6 p-2 text-sm">
                    <Tooltip content="Copy Build URL">
                      <BaseButton
                        color="green"
                        aria-label="Copy build URL to clipboard"
                        onClick={() => handleAddLinkedBuildItem(build)}
                      >
                        <FaLink className="h-4 w-4" />
                      </BaseButton>
                    </Tooltip>
                  </div>
                }
              />
            </div>
          ))}
        </ul>
      </BuildList>
    </div>
  )
}
