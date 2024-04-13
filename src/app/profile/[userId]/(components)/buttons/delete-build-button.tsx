'use client'

import { TrashIcon } from '@heroicons/react/24/solid'
import { toast } from 'react-toastify'

import { Button } from '@/app/(components)/base/button'
import { deleteBuild } from '@/features/build/actions/deleteBuild'
import { isErrorResponse } from '@/features/error-handling/isErrorResponse'
import { Tooltip } from '@/features/ui/Tooltip'

export function DeleteBuildButton({
  buildId,
  onDelete,
}: {
  buildId: string
  onDelete: (buildId: string) => void
}) {
  async function handleDeleteBuild() {
    const confirmed = confirm(
      'Are you sure you want to delete this build? This cannot be reversed!',
    )
    if (!confirmed) return

    const response = await deleteBuild(buildId)

    if (isErrorResponse(response)) {
      console.error(response.errors)
      toast.error('Error deleting build. Please try again later.')
    } else {
      toast.success(response.message)
      onDelete(buildId)
    }
  }

  return (
    <Tooltip content="Delete Build">
      <Button color="red" aria-label="Delete Build" onClick={handleDeleteBuild}>
        <TrashIcon className="h-4 w-4" />
      </Button>
    </Tooltip>
  )
}
