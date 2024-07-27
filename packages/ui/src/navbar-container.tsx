'use client'

import { Dialog } from '@headlessui/react'
import { BaseButton } from '@repo/ui/base/button'
import { cn } from '@repo/ui/classnames'
import { BarsIcon } from '@repo/ui/icons/bars'
import { CloseIcon } from '@repo/ui/icons/close'
import { ZINDEXES } from '@repo/ui/zindexes'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

interface Props {
  desktopProfileButton: React.ReactNode
  desktopChildren: React.ReactNode
  logo: React.ReactNode
  mobileProfileButton: React.ReactNode
  mobileChildren: React.ReactNode
}

export function NavbarContainer({
  desktopProfileButton,
  desktopChildren,
  logo,
  mobileProfileButton,
  mobileChildren,
}: Props) {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Close the navmenu on route change
  // * useEffect is necessary to close the menu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  return (
    <>
      {/* DESKTOP */}
      <nav
        className={cn(
          'ui-bg-background ui-fixed ui-mx-auto ui-flex ui-max-h-[80px] ui-w-full ui-max-w-7xl ui-items-center ui-justify-between ui-px-4 ui-py-6',
          ZINDEXES.NAVBAR,
        )}
        aria-label="Global"
      >
        <div className="ui-flex ui-min-w-[250px]">{logo}</div>
        <div className="ui-flex ui-w-full ui-justify-end lg:ui-hidden">
          <BaseButton
            plain
            type="button"
            aria-label="Open main menu"
            className="-ui-m-2.5 ui-inline-flex ui-items-center ui-justify-center"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="ui-sr-only">Open main menu</span>
            <BarsIcon className="ui-h-6 ui-w-6" aria-hidden="true" />
          </BaseButton>
        </div>
        <div className="ui-hidden ui-items-center ui-justify-between lg:ui-flex lg:ui-flex-grow lg:ui-gap-x-12">
          {desktopChildren}
        </div>
        <div className="ui-hidden ui-w-[80px] ui-grow ui-items-end ui-justify-end lg:ui-flex">
          {desktopProfileButton}
        </div>
      </nav>

      {/* MOBILE */}
      <Dialog
        as="div"
        className="lg:ui-hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className={cn('ui-fixed ui-inset-0', ZINDEXES.DIALOG_BACKDROP)} />
        <Dialog.Panel
          className={cn(
            'ui-bg-background-solid ui-text-surface-solid sm:ui-ring-secondary-900/10 ui-fixed ui-inset-y-0 ui-right-0 ui-w-full ui-overflow-y-auto ui-px-6 ui-py-6 sm:ui-max-w-sm sm:ui-ring-1',
            ZINDEXES.DIALOG,
          )}
        >
          <div className="ui-flex ui-items-center ui-justify-between">
            {logo}
            <BaseButton
              plain
              aria-label="Close menu"
              className="-ui-m-2.5"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="ui-sr-only">Close menu</span>
              <CloseIcon className="ui-h-6 ui-w-6" aria-hidden="true" />
            </BaseButton>
          </div>
          <div className="ui-mt-6 ui-flow-root">
            <div className="-ui-my-6">
              <div className="ui-space-y-2 ui-py-6">
                {mobileChildren}
                <hr className="ui-border-secondary-900" />
                {mobileProfileButton}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </>
  )
}
