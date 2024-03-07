'use client'

import { PencilIcon } from '@heroicons/react/24/solid'
import { useRouter } from 'next/navigation'

import { Tooltip } from '@/features/ui/Tooltip'

export function EditBuildButton({ buildId }: { buildId: string }) {
  const router = useRouter()

  function handleEditBuild() {
    router.push(`/builder/edit/${buildId}`)
  }

  return (
    <Tooltip content="Edit Build">
      <button
        className="text-accent2-500 hover:text-accent2-300"
        onClick={handleEditBuild}
        aria-label="Edit Build"
      >
        <PencilIcon className="h-5 w-5" />
      </button>
    </Tooltip>
  )
}
