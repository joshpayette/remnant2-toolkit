import type { ReactNode } from 'react'

export default function BuildContainer({ children }: { children: ReactNode }) {
  return (
    <div className="relative h-[675px] w-[1200px] bg-black bg-[url('/builder-background.jpg')]">
      {children}
    </div>
  )
}
