'use client'

import {
  EyeIcon,
  PencilIcon,
  ShareIcon,
  TrashIcon,
} from '@heroicons/react/24/solid'
import copy from 'clipboard-copy'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { deleteLinkedBuild } from '@/app/(actions)/builds/delete-linked-build'
import { BaseButton } from '@/app/(components)/_base/button'
import { Link } from '@/app/(components)/_base/link'
import { DeleteBuildAlert } from '@/app/(components)/alerts/delete-build-alert'
import { BuildList } from '@/app/(components)/build-list'
import { LinkedBuildCard } from '@/app/(components)/cards/linked-build-card'
import { Skeleton } from '@/app/(components)/skeleton'
import { Tooltip } from '@/app/(components)/tooltip'
import type { LinkedBuildState } from '@/app/(types)/linked-builds'
import { usePagination } from '@/app/(utils)/pagination/use-pagination'
import { urlNoCache } from '@/app/(utils)/url-no-cache'
import getLinkedBuilds from '@/app/profile/[userId]/linked-builds/[[...optionalBuildId]]/actions/get-linked-builds'

interface Props {
  itemsPerPage?: number
  isEditable: boolean
  userId: string
  buildId: string | undefined
}

export function PageClient({
  buildId,
  isEditable,
  itemsPerPage = 8,
  userId,
}: Props) {
  const router = useRouter()

  const [linkedBuilds, setLinkedBuilds] = useState<LinkedBuildState[]>([])

  const [totalBuildCount, setTotalBuildCount] = useState(0)
  const [requestedBuildName, setRequestedBuildName] = useState<
    string | undefined
  >(undefined)
  const [isLoading, setIsLoading] = useState(true)

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

  // Fetch data
  useEffect(() => {
    const getItemsAsync = async () => {
      setIsLoading(true)
      const response = await getLinkedBuilds({
        buildId,
        itemsPerPage,
        pageNumber: currentPage,
        userId,
      })
      setIsLoading(false)
      setTotalBuildCount(response.totalCount)
      setLinkedBuilds(response.linkedBuilds)
      setRequestedBuildName(response.requestedBuildName)
    }
    getItemsAsync()
  }, [
    buildId,
    currentPage,
    itemsPerPage,
    setLinkedBuilds,
    setTotalBuildCount,
    userId,
  ])

  const [isDeleteAlertOpen, setIsDeletePromptOpen] = useState(false)
  const [linkedBuildToDelete, setLinkedBuildToDelete] = useState<string | null>(
    null,
  )

  async function handleDeleteBuild() {
    if (!linkedBuildToDelete) return
    const response = await deleteLinkedBuild(linkedBuildToDelete)
    if (response.errors) {
      toast.error(response.errors[0])
      return
    }
    setLinkedBuilds((prev) =>
      prev.filter((linkedBuild) => linkedBuild.id !== linkedBuildToDelete),
    )
    setIsDeletePromptOpen(false)
    setLinkedBuildToDelete(null)
    toast.success(response.message)
  }

  function handleCopyBuild(linkedBuildId: string) {
    const url = urlNoCache(
      `${window.location.origin}/builder/linked/${linkedBuildId}`,
    )
    copy(url)
    toast.success('Copied linked build URL to clipboard!')
  }

  if (isLoading) {
    return <Skeleton className="min-h-[1100px] w-full" />
  }

  return (
    <>
      {requestedBuildName && (
        <div className="border-b border-gray-800 bg-gray-950 px-4 py-4 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-7xl items-center justify-between">
            <h1 className="text-2xl font-semibold text-gray-300">
              Linked Builds for{' '}
              <Link
                href={`/builder/${buildId}`}
                className="text-primary-500 hover:underline"
              >
                {requestedBuildName}
              </Link>
            </h1>
            <BaseButton
              color="red"
              onClick={() => router.push(`/profile/${userId}/linked-builds`)}
            >
              Clear Filter
            </BaseButton>
          </div>
        </div>
      )}
      <BuildList
        currentPage={currentPage}
        isLoading={isLoading}
        pageNumbers={pageNumbers}
        totalItems={totalBuildCount}
        totalPages={totalPages}
        firstVisibleItemNumber={firstVisibleItemNumber}
        lastVisibleItemNumber={lastVisibleItemNumber}
        onPreviousPage={handlePreviousPageClick}
        onNextPage={handleNextPageClick}
        onSpecificPage={handleSpecificPageClick}
        headerActions={undefined}
      >
        <ul
          role="list"
          className="my-4 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
        >
          {linkedBuilds.map((linkedBuildState) => (
            <div key={linkedBuildState.id} className="w-full">
              <LinkedBuildCard
                linkedBuildState={linkedBuildState}
                isLoading={false}
                footerActions={
                  <>
                    <div className="flex w-full items-center justify-center gap-6 p-2 text-sm">
                      <Tooltip content="View Build">
                        <BaseButton
                          color="violet"
                          onClick={() =>
                            router.push(
                              `/builder/linked/${linkedBuildState.id}`,
                            )
                          }
                          aria-label="View Linked Build"
                        >
                          <EyeIcon className="h-4 w-4" />
                        </BaseButton>
                      </Tooltip>
                      <Tooltip content="Copy Build URL">
                        <BaseButton
                          color="cyan"
                          aria-label="Copy build URL to clipboard"
                          onClick={() => handleCopyBuild(linkedBuildState.id)}
                        >
                          <ShareIcon className="h-4 w-4" />
                        </BaseButton>
                      </Tooltip>
                      {isEditable && (
                        <>
                          <Tooltip content="Edit Build">
                            <BaseButton
                              color="green"
                              onClick={() =>
                                router.push(
                                  `/builder/linked/edit/${linkedBuildState.id}`,
                                )
                              }
                              aria-label="Edit Linked Build"
                            >
                              <PencilIcon className="h-4 w-4" />
                            </BaseButton>
                          </Tooltip>

                          <DeleteBuildAlert
                            open={isDeleteAlertOpen}
                            onClose={() => setIsDeletePromptOpen(false)}
                            onDelete={() => handleDeleteBuild()}
                          />
                          <Tooltip content="Delete Build">
                            <BaseButton
                              color="red"
                              aria-label="Delete Build"
                              onClick={() => {
                                setLinkedBuildToDelete(linkedBuildState.id)
                                setIsDeletePromptOpen(true)
                              }}
                            >
                              <TrashIcon className="h-4 w-4" />
                            </BaseButton>
                          </Tooltip>
                        </>
                      )}
                    </div>
                  </>
                }
              />
            </div>
          ))}
        </ul>
      </BuildList>
    </>
  )
}
