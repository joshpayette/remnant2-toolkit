'use client'

import { ArrowUpIcon } from '@heroicons/react/24/solid'

export function BackToTopButton() {
  function handleBackToTopClick() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="flex items-center justify-start">
      <button
        className="bg-accent1-500 hover:border-accent1-300 flex w-auto items-center justify-center gap-1 rounded-md border-2 border-black p-2 text-sm font-bold text-black drop-shadow-lg"
        onClick={handleBackToTopClick}
        aria-label="Back to top"
      >
        <ArrowUpIcon className="h-5 w-5" />
      </button>
    </div>
  )
}
