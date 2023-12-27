import { useLocalStorage } from '@/app/(hooks)/useLocalStorage'
import { useRouter } from 'next/navigation'
import { buildToQueryParams } from '@/app/(lib)/utils'
import { BuildState } from '../../(types)/build-state'
import { useEffect, useState } from 'react'
import html2canvas from 'html2canvas'
import copy from 'clipboard-copy'
import { toast } from 'react-toastify'

export default function useBuildActions() {
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
    const newBuildName = `${buildState.name} (copy)`
    const editBuildUrl = buildToQueryParams({
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

  async function handleSaveBuild({
    buildState,
    byOwner,
  }: {
    buildState: BuildState
    byOwner: boolean
  }) {
    const response = await fetch('/api/build', {
      method: byOwner ? 'PATCH' : 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(buildState),
    })
    const data = await response.json()

    if (!response.ok) {
      toast.error(data.message)
      return
    }
    toast.success(data.message)
    setBuilderStorage({
      ...builderStorage,
      tempDescription: null,
      tempIsPublic: null,
      tempBuildId: null,
      tempCreatedById: null,
    })
    router.push(`/builder/${data.buildId}`)
    router.refresh()
  }

  async function handleToggleVote(buildState: BuildState) {
    const voted = !buildState.upvoted

    const response = await fetch('/api/build', {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...buildState,
        upvoted: voted,
      }),
    })
    if (!response.ok) {
      toast.error('Error saving your vote. Try again.')
      return
    }

    const data = await response.json()
    toast.success(data.message)
    buildState.upvoted = data.voted
    buildState.totalUpvotes = data.totalUpvotes

    return buildState
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
    handleSaveBuild,
    handleToggleVote,
    isScreenshotMode: Boolean(isScreenshotMode),
    showControls: Boolean(isScreenshotMode) === false,
  }
}
