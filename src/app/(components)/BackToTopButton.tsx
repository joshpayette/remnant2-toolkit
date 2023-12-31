'use client'

import { ArrowUpIcon } from '@heroicons/react/24/outline'

export default function BackToTopButton() {
  function handleBackToTopClick() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="flex items-center justify-start">
      <button
        className="flex w-auto items-center justify-center gap-1 rounded-md border-2 border-transparent  bg-yellow-500 p-2 text-sm font-bold text-black drop-shadow-md hover:border-yellow-300"
        onClick={handleBackToTopClick}
      >
        <ArrowUpIcon className="h-5 w-5" />
      </button>
    </div>
  )
}
