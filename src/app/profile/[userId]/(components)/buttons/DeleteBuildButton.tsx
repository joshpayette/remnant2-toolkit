'use client'

import { TrashIcon } from '@heroicons/react/24/solid'
import { usePathname } from 'next/navigation'
import { toast } from 'react-toastify'

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
  const pathname = usePathname()

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
      <button
        type="button"
        aria-label="Delete Build"
        className="flex flex-col items-center gap-y-1 text-xs text-red-500 hover:text-red-300"
        onClick={handleDeleteBuild}
      >
        <TrashIcon className="h-4 w-4" /> Delete
      </button>
    </Tooltip>
  )
}
