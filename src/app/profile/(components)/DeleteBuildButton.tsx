'use client'

import { isErrorResponse } from '@/app/(types)'
import { deleteBuild } from '@/app/builder/actions'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

export default function DeleteBuildButton({
  buildId,
}: {
  buildId: string | null
}) {
  const router = useRouter()

  async function handleDeleteBuild() {
    const confirmed = confirm('Are you sure you want to delete this build?')
    if (!confirmed) return

    const response = await deleteBuild(JSON.stringify({ buildId }))

    if (isErrorResponse(response)) {
      console.error(response.errors)
      toast.error('Error deleting build. Please try again later.')
    } else {
      toast.success(response.message)
    }
  }

  return (
    <button
      type="button"
      className="text-red-500 hover:text-red-300"
      onClick={handleDeleteBuild}
    >
      Delete
    </button>
  )
}
