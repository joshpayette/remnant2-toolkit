import { useLocalStorage } from '@/app/(hooks)/useLocalStorage'
import { useRouter } from 'next/navigation'
import { buildToQueryParams } from '@/app/(lib)/utils'
import { BuildState } from '../../(types)/build-state'
import { useEffect, useState } from 'react'
import html2canvas from 'html2canvas'
import copy from 'clipboard-copy'
import { toast } from 'react-toastify'

export default function useBuildActions() {
  // Hooks for monitoring the URL query string
  const router = useRouter()

  const { builderStorage, setBuilderStorage } = useLocalStorage()

  // Used to inform the UI when a screenshot is being taken
  // so that it can resize on mobile devices, show logo, and more.
  const [isScreenshotMode, setIsScreenshotMode] = useState<{
    el: HTMLDivElement | null
    imageFileName: string
  } | null>(null)

  function handleCopyBuildUrl(url: string | null, message?: string) {
    if (!url) {
      toast.error('Could not copy build url. Try again.')
      return
    }
    const defaultMessage =
      'Build url copied to clipboard. Sign in next time for a shorter URL!'
    copy(url)
    toast.success(!message ? defaultMessage : message)
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

  const handleImageExport = async (
    el: HTMLDivElement | null,
    imageFileName: string,
  ) => {
    setIsScreenshotMode({ el, imageFileName })
  }

  /**
   * Export the build as an image
   */
  useEffect(() => {
    async function exportImage() {
      if (!isScreenshotMode) return
      const { el, imageFileName } = isScreenshotMode

      if (!el) return

      const canvas = await html2canvas(el, {
        useCORS: true,
        allowTaint: true,
        logging: false,
      })
      const image = canvas.toDataURL('image/png', 1.0)

      // Need a fakeLink to trigger the download
      const fakeLink = window.document.createElement('a')
      fakeLink.download = imageFileName
      fakeLink.href = image
      document.body.appendChild(fakeLink)
      fakeLink.click()
      document.body.removeChild(fakeLink)
      fakeLink.remove()

      setIsScreenshotMode(null)
    }
    exportImage()
  }, [isScreenshotMode])

  return {
    handleCopyBuildUrl,
    handleDuplicateBuild,
    handleEditBuild,
    handleImageExport,
    isScreenshotMode: Boolean(isScreenshotMode),
    showControls: Boolean(isScreenshotMode) === false,
  }
}
