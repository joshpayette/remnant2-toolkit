'use client'

import { PencilIcon, ShareIcon, TrashIcon } from '@heroicons/react/24/solid'
import copy from 'clipboard-copy'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'react-toastify'

import { deleteLinkedBuild } from '@/app/(actions)/builds/delete-linked-build'
import { BaseButton } from '@/app/(components)/_base/button'
import {
  BaseTable,
  BaseTableBody,
  BaseTableCell,
  BaseTableHead,
  BaseTableHeader,
  BaseTableRow,
} from '@/app/(components)/_base/table'
import { BaseTextLink } from '@/app/(components)/_base/text'
import { DeleteBuildAlert } from '@/app/(components)/alerts/delete-build-alert'
import { DescriptionWithTokens } from '@/app/(components)/description-with-tokens'
import { Tooltip } from '@/app/(components)/tooltip'
import { urlNoCache } from '@/app/(utils)/url-no-cache'

interface Props {
  isEditable: boolean
  linkedBuilds: Array<{
    id: string
    createdById: string
    createdAt: Date
    updatedAt: Date
    name: string
    description: string | null
    LinkedBuildItems: Array<{
      id: string
      createdAt: Date
      updatedAt: Date
      linkedBuildId: string
      buildId: string
      label: string
    }>
  }>
}

export function PageClient({ isEditable, linkedBuilds }: Props) {
  const router = useRouter()

  const [deleteAlertOpen, setDeleteAlertOpen] = useState(false)

  async function handleDeleteBuild(linkedBuildId: string) {
    const response = await deleteLinkedBuild(linkedBuildId)
    if (response.errors) {
      toast.error(response.errors[0])
      return
    }
    toast.success(response.message)
    router.refresh()
  }

  function handleCopyBuild(linkedBuildId: string) {
    const url = urlNoCache(
      `${window.location.origin}/builder/linked/${linkedBuildId}`,
    )
    copy(url)
    toast.success('Copied linked build URL to clipboard!')
  }

  return (
    <>
      <BaseTable>
        <BaseTableHead>
          <BaseTableRow>
            <BaseTableHeader>Name</BaseTableHeader>
            <BaseTableHeader>Variants</BaseTableHeader>
            <BaseTableHeader>Actions</BaseTableHeader>
          </BaseTableRow>
        </BaseTableHead>
        <BaseTableBody>
          {linkedBuilds.map((linkedBuild) => (
            <BaseTableRow key={linkedBuild.id}>
              <BaseTableCell className="font-medium">
                <BaseTextLink href={`/builder/linked/${linkedBuild.id}`}>
                  {linkedBuild.name}
                </BaseTextLink>
              </BaseTableCell>
              <BaseTableCell>
                {linkedBuild.LinkedBuildItems.map((lbi) => lbi.label).join(
                  ', ',
                )}
              </BaseTableCell>
              <BaseTableCell className="flex flex-row gap-x-2 text-zinc-500">
                {isEditable && (
                  <>
                    <Tooltip content="Edit Build">
                      <BaseButton
                        color="green"
                        onClick={() =>
                          router.push(`/builder/linked/edit/${linkedBuild.id}`)
                        }
                        aria-label="Edit Linked Build"
                      >
                        <PencilIcon className="h-4 w-4" />
                      </BaseButton>
                    </Tooltip>

                    <DeleteBuildAlert
                      open={deleteAlertOpen}
                      onClose={() => setDeleteAlertOpen(false)}
                      onDelete={() => {
                        setDeleteAlertOpen(false)
                        handleDeleteBuild(linkedBuild.id)
                      }}
                    />
                    <Tooltip content="Delete Build">
                      <BaseButton
                        color="red"
                        aria-label="Delete Build"
                        onClick={() => setDeleteAlertOpen(true)}
                      >
                        <TrashIcon className="h-4 w-4" />
                      </BaseButton>
                    </Tooltip>
                  </>
                )}
                <Tooltip content="Copy Build URL">
                  <BaseButton
                    color="cyan"
                    aria-label="Copy build URL to clipboard"
                    onClick={() => handleCopyBuild(linkedBuild.id)}
                  >
                    <ShareIcon className="h-4 w-4" />
                  </BaseButton>
                </Tooltip>
              </BaseTableCell>
            </BaseTableRow>
          ))}
        </BaseTableBody>
      </BaseTable>
    </>
  )
}
