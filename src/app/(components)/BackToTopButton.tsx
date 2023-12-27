'use client'

export default function BackToTopButton() {
  function handleBackToTopClick() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="fixed bottom-0 right-0 z-30 mb-2 mr-2 flex w-full items-center justify-end md:hidden">
      <button
        className="flex w-full max-w-[125px] items-center justify-center gap-1 rounded-md border border-green-500 bg-black p-2 text-sm font-bold text-green-500 hover:border-green-300 hover:text-green-300"
        onClick={handleBackToTopClick}
      >
        Back to Top
      </button>
    </div>
  )
}
