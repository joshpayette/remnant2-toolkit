'use client'

import { ArrowUpIcon } from '@heroicons/react/24/outline'

export default function BackToTopButton() {
  function handleBackToTopClick() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="fixed bottom-0 right-0 z-30 mb-2 mr-2 flex w-full items-center justify-end">
      <button
        className="flex w-auto items-center justify-center gap-1 rounded-md border border-yellow-300 bg-yellow-500 bg-gradient-to-b p-2 text-sm font-bold text-black drop-shadow-md hover:border-2"
        onClick={handleBackToTopClick}
      >
        <ArrowUpIcon className="h-5 w-5" />
      </button>
    </div>
  )
}
