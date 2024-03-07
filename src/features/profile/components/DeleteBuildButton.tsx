'use client'

import { TrashIcon } from '@heroicons/react/24/solid'
import { toast } from 'react-toastify'

import { deleteBuild } from '@/features/build/actions/deleteBuild'
import { isErrorResponse } from '@/features/error-handling/isErrorResponse'
import { Tooltip } from '@/features/ui/Tooltip'

export function DeleteBuildButton({
  buildId,
  onDeleteBuild,
}: {
  buildId: string
  onDeleteBuild: (buildId: string) => void
}) {
  async function handleDeleteBuild() {
    const confirmed = confirm(
      'Are you sure you want to delete this build? This cannot be reversed!',
    )
    if (!confirmed) return

    const response = await deleteBuild(JSON.stringify({ buildId }))

    if (isErrorResponse(response)) {
      console.error(response.errors)
      toast.error('Error deleting build. Please try again later.')
    } else {
      toast.success(response.message)
      onDeleteBuild(buildId)
    }
  }

  return (
    <Tooltip content="Delete Build">
      <button
        type="button"
        aria-label="Delete Build"
        className="text-red-500 hover:text-red-300"
        onClick={handleDeleteBuild}
      >
        <TrashIcon className="h-5 w-5" />
      </button>
    </Tooltip>
  )
}
