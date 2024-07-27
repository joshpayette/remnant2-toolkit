'use client'

import { BaseButton } from '@repo/ui/base/button'
import { BaseText } from '@repo/ui/base/text'
import { cn } from '@repo/ui/classnames'
import { CloseIcon } from '@repo/ui/icons/close'
import { ZINDEXES } from '@repo/ui/zindexes'
import { useLocalStorage } from 'usehooks-ts'

interface Props {
  bgColor?: string
  localStorageKey: string
  children?: React.ReactNode
}

export default function AlertBanner({
  bgColor = 'ui-bg-primary-900',
  localStorageKey,
  children,
}: Props) {
  const [showBanner, setShowBanner] = useLocalStorage(localStorageKey, true)

  if (!showBanner) return null

  return (
    <div
      className={cn(
        'ui-animate-slideIn ui-fixed ui-w-full ui-p-1 ui-text-sm',
        bgColor,
        ZINDEXES.ALERT_BANNER,
      )}
    >
      <div className="ui-absolute ui-right-0 ui-top-0">
        <BaseButton onClick={() => setShowBanner(false)} plain>
          <CloseIcon className="ui-h-5 ui-w-5" />
        </BaseButton>
      </div>
      <div className="ui-flex ui-w-full ui-items-center ui-justify-center ui-text-center">
        <div className="ui-max-w-[80%] md:ui-max-w-[800px]">
          <BaseText>{children}</BaseText>
        </div>
      </div>
    </div>
  )
}
