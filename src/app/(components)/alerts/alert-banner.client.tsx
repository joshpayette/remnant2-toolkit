'use client'

import { XMarkIcon } from '@heroicons/react/24/solid'
import { useLocalStorage } from 'usehooks-ts'

import { BaseButton } from '@/app/(components)/_base/button'
import { cn } from '@/app/(utils)/classnames'

interface Props {
  bgColor?: string
  localStorageKey: string
  children?: React.ReactNode
}

export default function AlertBanner({
  bgColor = 'bg-primary-950 dark:bg-blue-950',
  localStorageKey,
  children,
}: Props) {
  const [showBanner, setShowBanner] = useLocalStorage(localStorageKey, true)

  if (!showBanner) return null

  return (
    <div
      className={cn('animate-slideIn fixed z-[50] w-full p-1 text-sm', bgColor)}
    >
      <div className="absolute right-0 top-0">
        <BaseButton onClick={() => setShowBanner(false)} plain>
          <XMarkIcon className="h-5 w-5" />
        </BaseButton>
      </div>
      <div className="flex w-full items-center justify-center text-center">
        <div className="max-w-[80%] md:max-w-[800px]">{children}</div>
      </div>
    </div>
  )
}
