'use client'

import copy from 'clipboard-copy'
import { toast } from 'react-toastify'

export function CopyBuildUrlButton({ buildId }: { buildId: string }) {
  function handleCopyBuild() {
    const url = `${window.location.origin}/builder/${buildId}`
    copy(`${url}?t=${Date.now()}`)
    toast.success('Copied build URL to clipboard!')
  }

  return (
    <button
      className="text-green-500 hover:text-green-300"
      aria-label="Copy build URL to clipboard"
      onClick={handleCopyBuild}
    >
      Share
    </button>
  )
}
