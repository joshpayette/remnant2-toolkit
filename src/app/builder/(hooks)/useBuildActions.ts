import { useState } from 'react'
import { toast } from 'react-toastify'
import copy from 'clipboard-copy'
import { useLocalStorage } from '@/app/(hooks)/useLocalStorage'
import useBuildScreenshot from './useBuildScreenshot'
import useBuildSearchParams from './useBuildSearchParams'

export default function useBuildActions() {
  const { builderStorage, setBuilderStorage } = useLocalStorage()

  const { handleImageExport: onImageExport } = useBuildScreenshot()
  const { currentBuildState } = useBuildSearchParams()

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

  function handleExportImage() {
    onImageExport(`${currentBuildState.name}.png`)
  }

  function handleEditBuild() {
    // TODO
  }

  return {
    showLabels,
    setShowLabels,
    handleToggleLabels,
    showControls,
    setShowControls,
    handleToggleControls,
    handleCopyBuildUrl,
    handleExportImage,
    handleEditBuild,
  }
}
