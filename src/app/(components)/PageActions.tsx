import { cn } from '../(lib)/utils'

export default function PageActions({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div
      className={cn(
        'fixed bottom-0 right-0 z-10 flex flex-row items-center justify-end gap-x-2 gap-y-0 bg-black p-1',
        'sm:bottom-0 sm:right-0 sm:w-auto sm:flex-col sm:items-end sm:justify-end sm:gap-x-0 sm:gap-y-2',
      )}
    >
      {children}
    </div>
  )
}
