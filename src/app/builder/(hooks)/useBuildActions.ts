import { useLocalStorage } from '@/app/(hooks)/useLocalStorage'
import { useRouter } from 'next/navigation'
import { buildStateToQueryParams } from '@/app/(lib)/utils'
import { BuildState } from '../../(types)/build-state'
import { useEffect, useState } from 'react'
import html2canvas from 'html2canvas'
import copy from 'clipboard-copy'
import { toast } from 'react-toastify'

export default function useBuildActions() {
  const router = useRouter()

  const { builderStorage, setBuilderStorage } = useLocalStorage()

  // iOS does not automatically download images, so we need to
  // make a clickable link available
  const [imageLink, setImageLink] = useState<string | null>(null)

  // Need to show a loading indicator when exporting the image
  const [imageExportLoading, setImageExportLoading] = useState(false)

  // Used to inform the UI when a screenshot is being taken
  // so that it can resize on mobile devices, show logo, and more.
  const [isScreenshotMode, setIsScreenshotMode] = useState<{
    el: HTMLDivElement | null
    imageFileName: string
  } | null>(null)

  function handleClearImageLink() {
    setImageLink(null)
  }

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
    const newBuildName = `${buildState.name} (copy)`
    const editBuildUrl = buildStateToQueryParams({
      ...buildState,
      name: newBuildName,
    })

    setBuilderStorage({
      ...builderStorage,
      tempDescription: buildState.description,
      tempIsPublic: buildState.isPublic,
      tempBuildId: null,
      tempCreatedById: null,
    })

    router.push(editBuildUrl)
  }

  function handleEditBuild(buildState: BuildState) {
    let editBuildUrl = buildStateToQueryParams(buildState)

    setBuilderStorage({
      ...builderStorage,
      tempDescription: buildState.description,
      tempIsPublic: buildState.isPublic,
      tempBuildId: buildState.buildId,
      tempCreatedById: buildState.createdById,
    })

    router.push(editBuildUrl)
  }

  function handleImageExport(el: HTMLDivElement | null, imageFileName: string) {
    // We do this to trigger the effect below
    setIsScreenshotMode({ el, imageFileName })
  }
  /**
   * Export the build as an image
   * We do this in a useEffect so that the UI can update,
   * allowing us to show the logo, expand the build on mobile for
   * better screenshots, etc.
   */
  useEffect(() => {
    async function exportImage() {
      setImageExportLoading(false)
      if (!isScreenshotMode) return
      const { el, imageFileName } = isScreenshotMode

      if (!el) return

      const canvas = await html2canvas(el, {
        useCORS: true,
        allowTaint: true,
        logging: false,
      })
      const image = canvas.toDataURL('image/png', 1.0)
      setImageLink(image)
      setIsScreenshotMode(null)

      // Need a fakeLink to trigger the download
      // This does not work for ios
      const fakeLink = window.document.createElement('a')
      fakeLink.download = imageFileName
      fakeLink.href = image
      document.body.appendChild(fakeLink)
      fakeLink.click()
      document.body.removeChild(fakeLink)
      fakeLink.remove()
    }
    setImageExportLoading(true)
    setTimeout(exportImage, 1000)
  }, [isScreenshotMode, router])

  return {
    handleClearImageLink,
    handleCopyBuildUrl,
    handleDuplicateBuild,
    handleEditBuild,
    handleImageExport,
    isScreenshotMode: Boolean(isScreenshotMode),
    showControls: Boolean(isScreenshotMode) === false,
    imageLink,
    imageExportLoading,
  }
}
