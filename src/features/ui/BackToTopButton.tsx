'use client'

import { ArrowUpIcon } from '@heroicons/react/24/solid'

export function BackToTopButton() {
  function handleBackToTopClick() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="flex items-center justify-start">
      <button
        className="flex w-auto items-center justify-center gap-1 rounded-md border-2 border-black bg-yellow-500 p-2 text-sm font-bold text-black drop-shadow-lg hover:border-yellow-300"
        onClick={handleBackToTopClick}
        aria-label="Back to top"
      >
        <ArrowUpIcon className="h-5 w-5" />
      </button>
    </div>
  )
}
