'use client';

import { Dialog } from '@headlessui/react';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BarsIcon } from '../icons/bars';
import { BaseButton } from '../../base/button';
import { cn } from '../../utils/classnames';
import { CloseIcon } from '../icons/close';
import { ZINDEXES } from '../z-indexes';
import { NotificationNavIcon } from '../notifications/notification-nav-icon';

interface NavbarContainerProps {
  desktopProfileButton: React.ReactNode;
  desktopChildren: React.ReactNode;
  logo: React.ReactNode;
  mobileProfileButton: React.ReactNode;
  mobileChildren: React.ReactNode;
  showNotifications: boolean;
  hasUnreadNotifications: boolean;
  notificationDestination: string;
}

export function NavbarContainer({
  desktopProfileButton,
  desktopChildren,
  logo,
  mobileProfileButton,
  mobileChildren,
  showNotifications,
  hasUnreadNotifications,
  notificationDestination
}: NavbarContainerProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // * useEffect is necessary to close the menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      {/* DESKTOP */}
      <nav
        aria-label="Global"
        className={cn(
          'ui-bg-background ui-fixed ui-mx-auto ui-flex ui-max-h-[80px] ui-w-screen ui-max-w-[1500px] ui-items-center ui-justify-between ui-px-6 ui-py-6',
          ZINDEXES.NAVBAR,
        )}
      >
        <div className="mr-4">{logo}</div>
        <div className="ui-flex ui-w-screen ui-justify-end lg:ui-hidden">
          <BaseButton
            aria-label="Open main menu"
            className="-ui-m-2.5 ui-inline-flex ui-items-center ui-justify-center"
            onClick={() => {
              setMobileMenuOpen(true);
            }}
            plain
            type="button"
          >
            <span className="ui-sr-only">Open main menu</span>
            <BarsIcon aria-hidden="true" className="ui-h-6 ui-w-6" />
          </BaseButton>
        </div>
        <div className="ui-hidden ui-items-center ui-justify-between lg:ui-flex lg:ui-flex-grow lg:ui-gap-x-12">
          {desktopChildren}
        </div>
        <div className="ui-hidden ui-w-[100px] ui-grow ui-items-center ui-justify-end lg:ui-flex gap-x-4">
          {showNotifications ? <NotificationNavIcon hasUnread={hasUnreadNotifications} href={notificationDestination} /> : null}
          {desktopProfileButton}
        </div>
      </nav>

      {/* MOBILE */}
      <Dialog
        as="div"
        className="lg:ui-hidden"
        onClose={setMobileMenuOpen}
        open={mobileMenuOpen}
      >
        <div className={cn('ui-fixed ui-inset-0', ZINDEXES.DIALOG_BACKDROP)} />
        <Dialog.Panel
          className={cn(
            'ui-bg-background-solid ui-text-surface-solid sm:ui-ring-secondary-900/10 ui-fixed ui-inset-y-0 ui-right-0 ui-w-screen ui-overflow-y-auto ui-px-6 ui-py-6 sm:ui-max-w-sm sm:ui-ring-1',
            ZINDEXES.DIALOG,
          )}
        >
          <div className="ui-flex ui-items-center ui-justify-between">
            {logo}
            {showNotifications ? <NotificationNavIcon hasUnread={hasUnreadNotifications} href={notificationDestination} /> : null}
            <BaseButton
              aria-label="Close menu"
              className="-ui-m-2.5"
              onClick={() => {
                setMobileMenuOpen(false);
              }}
              plain
            >
              <span className="ui-sr-only">Close menu</span>
              <CloseIcon aria-hidden="true" className="ui-h-6 ui-w-6" />
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
  );
}
