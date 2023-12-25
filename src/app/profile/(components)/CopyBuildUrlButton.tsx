'use client'

import copy from 'clipboard-copy'
import { toast } from 'react-toastify'

export default function CopyBuildUrlButton({ buildId }: { buildId: string }) {
  function handleCopyBuild() {
    const url = `${window.location.origin}/builder/${buildId}`
    copy(url)
    toast.success('Copied build URL to clipboard!')
  }

  return (
    <button
      className="text-green-500 hover:text-green-300"
      onClick={handleCopyBuild}
    >
      Share
    </button>
  )
}
