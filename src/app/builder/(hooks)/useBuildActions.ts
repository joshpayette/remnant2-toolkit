import { useState } from 'react'
import { toast } from 'react-toastify'
import copy from 'clipboard-copy'
import { useLocalStorage } from '@/app/(hooks)/useLocalStorage'
import { useRouter } from 'next/navigation'
import { BuildState } from '@/app/(types)'
import { buildToQueryParams } from '@/app/(lib)/utils'

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

  function handleCopyBuildUrl() {
    copy(window.location.href)
    toast.success('Copied Build URL to clipboard')
  }

  function handleDuplicateBuild(buildState: BuildState) {
    const editBuildUrl = buildToQueryParams(buildState)

    setBuilderStorage({
      ...builderStorage,
      tempDescription: buildState.description,
      tempPublic: buildState.isPublic,
    })

    router.push(editBuildUrl)
  }

  return {
    showLabels,
    setShowLabels,
    handleToggleLabels,
    showControls,
    setShowControls,
    handleToggleControls,
    handleCopyBuildUrl,
    handleDuplicateBuild,
  }
}
