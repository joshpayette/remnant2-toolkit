'use client'

import { useRouter } from 'next/navigation'

export function EditBuildButton({ buildId }: { buildId: string }) {
  const router = useRouter()

  function handleEditBuild() {
    router.push(`/builder/edit/${buildId}`)
  }

  return (
    <button
      className="text-purple-500 hover:text-purple-300"
      onClick={handleEditBuild}
      aria-label="Edit Build"
    >
      Edit
    </button>
  )
}
