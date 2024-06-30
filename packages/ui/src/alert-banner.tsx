'use client'

import { XMarkIcon } from '@heroicons/react/24/solid'
import { BaseButton } from '@repo/ui/base/button'
import { BaseText } from '@repo/ui/base/text'
import { cn } from '@repo/ui/classnames'
import { ZINDEXES } from '@repo/ui/zindexes'
import { useLocalStorage } from 'usehooks-ts'

interface Props {
  bgColor?: string
  localStorageKey: string
  children?: React.ReactNode
}

export default function AlertBanner({
  bgColor = 'bg-primary-900',
  localStorageKey,
  children,
}: Props) {
  const [showBanner, setShowBanner] = useLocalStorage(localStorageKey, true)

  if (!showBanner) return null

  return (
    <div
      className={cn(
        'animate-slideIn fixed w-full p-1 text-sm',
        bgColor,
        ZINDEXES.ALERT_BANNER,
      )}
    >
      <div className="absolute right-0 top-0">
        <BaseButton onClick={() => setShowBanner(false)} plain>
          <XMarkIcon className="h-5 w-5" />
        </BaseButton>
      </div>
      <div className="flex w-full items-center justify-center text-center">
        <div className="max-w-[80%] md:max-w-[800px]">
          <BaseText>{children}</BaseText>
        </div>
      </div>
    </div>
  )
}
