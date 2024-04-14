'use client'

import { TrashIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'

import { Button } from '@/app/(components)/_base/button'
import { DeleteBuildAlert } from '@/app/(components)/alerts/delete-build-alert'
import { useBuildActions } from '@/app/(hooks)/use-build-actions'
import { Tooltip } from '@/features/ui/Tooltip'

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
        onDelete={() => handleDeleteBuild({ buildId, onDelete })}
      />
      <Tooltip content="Delete Build">
        <Button
          color="red"
          aria-label="Delete Build"
          onClick={() => setDeleteAlertOpen(true)}
        >
          <TrashIcon className="h-4 w-4" />
        </Button>
      </Tooltip>
    </>
  )
}
