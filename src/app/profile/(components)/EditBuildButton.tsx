'use client'

import { useLocalStorage } from '@/app/(hooks)/useLocalStorage'
import { DEFAULT_DISPLAY_NAME } from '@/app/(lib)/constants'
import { buildToQueryParams, dbBuildToBuildState } from '@/app/(lib)/utils'
import { DBBuild } from '@/app/(types)'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function EditBuildButton({ build }: { build: DBBuild }) {
  const router = useRouter()
  const { data: session } = useSession()
  const { builderStorage, setBuilderStorage } = useLocalStorage()

  function handleEditBuild(build: DBBuild) {
    const buildState = dbBuildToBuildState({
      ...build,
      createdByDisplayName: session?.user?.name ?? DEFAULT_DISPLAY_NAME,
    })

    let editBuildUrl = buildToQueryParams(buildState)

    setBuilderStorage({
      ...builderStorage,
      tempDescription: build.description,
      tempIsPublic: build.isPublic,
      tempBuildId: build.id,
      tempCreatedById: build.createdById,
    })

    router.push(editBuildUrl)
  }

  return (
    <button
      className="text-purple-500 hover:text-purple-300"
      onClick={() => handleEditBuild(build)}
    >
      Edit Build
    </button>
  )
}
