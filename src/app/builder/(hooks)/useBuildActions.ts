import { useState } from 'react'
import { useLocalStorage } from '@/app/(hooks)/useLocalStorage'
import { useRouter } from 'next/navigation'
import { buildToQueryParams } from '@/app/(lib)/utils'
import { BuildState } from '../(types)'

export default function useBuildActions() {
  // Hooks for monitoring the URL query string
  const router = useRouter()

  const { builderStorage, setBuilderStorage } = useLocalStorage()

  const [showLabels, setShowLabels] = useState(builderStorage.showLabels)
  function handleToggleLabels() {
    setShowLabels(!showLabels)
    setBuilderStorage({
      ...builderStorage,
      showLabels: !showLabels,
    })
  }

  const [showControls, setShowControls] = useState(builderStorage.showControls)
  function handleToggleControls() {
    setShowControls(!showControls)
    setBuilderStorage({
      ...builderStorage,
      showControls: !showControls,
    })
  }

  function handleDuplicateBuild(buildState: BuildState) {
    const editBuildUrl = buildToQueryParams(buildState)

    setBuilderStorage({
      ...builderStorage,
      tempDescription: buildState.description,
      tempIsPublic: buildState.isPublic,
    })

    router.push(editBuildUrl)
  }

  function handleEditBuild(buildState: BuildState) {
    let editBuildUrl = buildToQueryParams(buildState)

    setBuilderStorage({
      ...builderStorage,
      tempDescription: buildState.description,
      tempIsPublic: buildState.isPublic,
      tempBuildId: buildState.buildId,
      tempCreatedById: buildState.createdById,
    })

    router.push(editBuildUrl)
  }

  return {
    showControls,
    showLabels,
    handleDuplicateBuild,
    handleEditBuild,
    handleToggleControls,
    handleToggleLabels,
    setShowLabels,
    setShowControls,
  }
}
