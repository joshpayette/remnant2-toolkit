'use client'

import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

export default function DeleteBuildButton({
  buildId,
}: {
  buildId: string | null
}) {
  const router = useRouter()

  async function handleDeleteBuild(buildId: string | null) {
    if (!buildId) return console.error('No buildId provided')

    const confirmed = confirm('Are you sure you want to delete this build?')
    if (!confirmed) return

    const response = await fetch(`/api/build`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ buildId }),
    })

    if (response.ok) {
      toast.success('Build deleted successfully!')
      router.refresh()
    } else {
      console.error(response)
      toast.error('Something went wrong. Please try again.')
    }
  }

  return (
    <button
      type="button"
      className="text-red-500 hover:text-red-300"
      onClick={() => handleDeleteBuild(buildId)}
    >
      Delete
    </button>
  )
}
