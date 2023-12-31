'use client'

import { useLocalStorage } from '@/app/(hooks)/useLocalStorage'
import { DEFAULT_DISPLAY_NAME } from '@/app/(lib)/constants'
import {
  buildStateToQueryParams,
  extendedBuildToBuildState,
} from '@/app/(lib)/utils'
import { ExtendedBuild } from '@/app/(types)'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function EditBuildButton({ build }: { build: ExtendedBuild }) {
  const router = useRouter()
  const { data: session } = useSession()
  const { builderStorage, setBuilderStorage } = useLocalStorage()

  function handleEditBuild(build: ExtendedBuild) {
    const buildState = extendedBuildToBuildState({
      ...build,
      createdByDisplayName: session?.user?.name ?? DEFAULT_DISPLAY_NAME,
    })

    let editBuildUrl = buildStateToQueryParams(buildState)

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
