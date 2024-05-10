'use client'

import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { useState } from 'react'

import { BaseButton } from '@/app/(components)/_base/button'
import { DeleteBuildAlert } from '@/app/(components)/alerts/delete-build-alert'
import { useBuildActions } from '@/app/(hooks)/use-build-actions'

interface Props {
  buildId: string
}

export function DeleteBuildButton({ buildId }: Props) {
  const [deleteAlertOpen, setDeleteAlertOpen] = useState(false)
  const { handleDeleteBuild } = useBuildActions()

  const router = useRouter()
  const { data: session } = useSession()

  return (
    <>
      <DeleteBuildAlert
        open={deleteAlertOpen}
        onClose={() => setDeleteAlertOpen(false)}
        onDelete={async () => {
          setDeleteAlertOpen(false)
          await handleDeleteBuild({ buildId })
          if (session?.user?.id) {
            router.push(`/profile/${session.user.id}/created-builds`)
          }
        }}
      />
      <BaseButton
        color="red"
        aria-label="Delete build."
        onClick={() => setDeleteAlertOpen(true)}
        className="sm:w-full"
      >
        Delete Build
      </BaseButton>
    </>
  )
}
