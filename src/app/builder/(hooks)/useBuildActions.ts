import { useLocalStorage } from '@/app/(hooks)/useLocalStorage'
import { useRouter } from 'next/navigation'
import { buildToQueryParams } from '@/app/(lib)/utils'
import { BuildState } from '../../(types)/build-state'
import { useEffect, useState } from 'react'
import html2canvas from 'html2canvas'
import copy from 'clipboard-copy'
import { toast } from 'react-toastify'
import { set } from 'zod'

export default function useBuildActions() {
  const router = useRouter()

  const { builderStorage, setBuilderStorage } = useLocalStorage()

  // iOS does not automatically download images, so we need to
  // make a clickable link available
  const [imageLink, setImageLink] = useState<string | null>(null)

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

      try {
        const canvas = await html2canvas(el, {
          useCORS: true,
          allowTaint: true,
          logging: false,
        })
        const image = canvas.toDataURL('image/png', 1.0)
        // Redirect to the image
        setIsScreenshotMode(null)
        router.push(image)
      } catch (error) {
        console.log('Image generating error!', error)
        alert(error)
      }

      // // Need a fakeLink to trigger the download
      // // This does not work for ios
      // const fakeLink = window.document.createElement('a')
      // fakeLink.download = imageFileName
      // fakeLink.href = image
      // document.body.appendChild(fakeLink)
      // fakeLink.click()
      // document.body.removeChild(fakeLink)
      // fakeLink.remove()

      // setImageLink(image)
      // setIsScreenshotMode(null)
    }
    setTimeout(exportImage, 500)
  }, [isScreenshotMode, router])

  async function handleSaveBuild({
    buildState,
    byOwner,
  }: {
    buildState: BuildState
    byOwner: boolean
  }) {
    const response = await fetch(
      byOwner ? '/api/build/edit' : '/api/build/new',
      {
        method: byOwner ? 'PATCH' : 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(buildState),
      },
    )
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

  async function handleToggleReport(buildState: BuildState) {
    const newReported = !buildState.reported

    // prompt for the reason
    const reason = newReported
      ? prompt('Please enter a reason for reporting this build.')
      : null

    if (newReported && !reason) {
      toast.error('You must enter a reason for reporting this build.')
      return
    }

    const response = await fetch('/api/build/report', {
      method: newReported ? 'PUT' : 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        reason,
        buildId: buildState.buildId,
      }),
    })
    const data = await response.json()
    if (!response.ok) {
      toast.error(data.message)
      return
    }

    toast.success(data.message)
    buildState.reported = newReported
    router.refresh()
  }

  async function handleToggleVote(buildState: BuildState) {
    const newVote = !buildState.upvoted

    const response = await fetch('/api/build/vote', {
      method: newVote ? 'PUT' : 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        buildId: buildState.buildId,
        upvoted: newVote,
      }),
    })
    if (!response.ok) {
      toast.error('Error saving your vote. Try again.')
      return
    }

    const data = await response.json()
    buildState.upvoted = newVote
    buildState.totalUpvotes = data.totalUpvotes

    router.refresh()
  }

  return {
    handleClearImageLink,
    handleCopyBuildUrl,
    handleDuplicateBuild,
    handleEditBuild,
    handleImageExport,
    handleToggleReport,
    handleSaveBuild,
    handleToggleVote,
    isScreenshotMode: Boolean(isScreenshotMode),
    showControls: Boolean(isScreenshotMode) === false,
    imageLink,
  }
}
