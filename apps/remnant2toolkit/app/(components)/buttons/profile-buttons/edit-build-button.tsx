'use client'

import { PencilIcon } from '@heroicons/react/24/solid'
import { useRouter } from 'next/navigation'

import { BaseButton } from '@/app/(components)/_base/button'
import { Tooltip } from '@/app/(components)/tooltip'

export function EditBuildButton({ buildId }: { buildId: string }) {
  const router = useRouter()

  function handleEditBuild() {
    router.push(`/builder/edit/${buildId}`)
  }

  return (
    <Tooltip content="Edit Build">
      <BaseButton
        color="green"
        onClick={handleEditBuild}
        aria-label="Edit Build"
      >
        <PencilIcon className="h-4 w-4" />
      </BaseButton>
    </Tooltip>
  )
}
