'use client'

export default function BackToTopButton() {
  function handleBackToTopClick() {
    console.info('scrolling')
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="fixed bottom-0 right-0 z-30 mb-4 mr-4 flex w-full items-center justify-end sm:hidden">
      <button
        className="flex w-full max-w-[125px] items-center justify-center gap-1 rounded-md border border-green-500 bg-background p-2 text-sm font-bold text-green-500 hover:border-green-300 hover:text-green-300"
        onClick={handleBackToTopClick}
      >
        Back to Top
      </button>
    </div>
  )
}
