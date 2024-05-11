'use client'

import { TrashIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'

import { BaseButton } from '@/app/(components)/_base/button'
import { DeleteBuildAlert } from '@/app/(components)/alerts/delete-build-alert'
import { Tooltip } from '@/app/(components)/tooltip'
import { useBuildActions } from '@/app/(hooks)/use-build-actions'

export function DeleteBuildButton({
  buildId,
  onDelete,
}: {
  buildId: string
  onDelete: (buildId: string) => void
}) {
  const [deleteAlertOpen, setDeleteAlertOpen] = useState(false)
  const { handleDeleteBuild } = useBuildActions()

  return (
    <>
      <DeleteBuildAlert
        open={deleteAlertOpen}
        onClose={() => setDeleteAlertOpen(false)}
        onDelete={() => {
          setDeleteAlertOpen(false)
          handleDeleteBuild({ buildId, onDelete })
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
  )
}
