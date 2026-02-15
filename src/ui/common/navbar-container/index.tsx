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
}

export function NavbarContainer({
  desktopProfileButton,
  desktopChildren,
  logo,
  mobileProfileButton,
  mobileChildren,
  showNotifications,
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
          'bg-background fixed mx-auto flex max-h-[80px] w-screen max-w-[1500px] items-center justify-between px-6 py-6',
          ZINDEXES.NAVBAR,
        )}
      >
        <div className="mr-8">{logo}</div>
        <div className="flex w-screen justify-end lg:hidden">
          <BaseButton
            aria-label="Open main menu"
            className="-m-2.5 inline-flex items-center justify-center"
            onClick={() => {
              setMobileMenuOpen(true);
            }}
            plain
            type="button"
          >
            <span className="sr-only">Open main menu</span>
            <BarsIcon aria-hidden="true" className="h-6 w-6" />
          </BaseButton>
        </div>
        <div className="hidden items-center justify-between lg:flex lg:flex-grow lg:gap-x-12">
          {desktopChildren}
        </div>
        <div className="hidden w-[100px] grow items-center justify-end lg:flex gap-x-4">
          {showNotifications ? <NotificationNavIcon /> : null}
          {desktopProfileButton}
        </div>
      </nav>

      {/* MOBILE */}
      <Dialog
        as="div"
        className="lg:hidden"
        onClose={setMobileMenuOpen}
        open={mobileMenuOpen}
      >
        <div className={cn('fixed inset-0', ZINDEXES.DIALOG_BACKDROP)} />
        <Dialog.Panel
          className={cn(
            'bg-background-solid text-surface-solid sm:ring-secondary-900/10 fixed inset-y-0 right-0 w-screen overflow-y-auto px-6 py-6 sm:max-w-sm sm:ring-1',
            ZINDEXES.DIALOG,
          )}
        >
          <div className="flex items-center justify-between">
            {logo}
            {showNotifications ? <NotificationNavIcon /> : null}
            <BaseButton
              aria-label="Close menu"
              className="-m-2.5"
              onClick={() => {
                setMobileMenuOpen(false);
              }}
              plain
            >
              <span className="sr-only">Close menu</span>
              <CloseIcon aria-hidden="true" className="h-6 w-6" />
            </BaseButton>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6">
              <div className="space-y-2 py-6">
                {mobileChildren}
                <hr className="border-secondary-900" />
                {mobileProfileButton}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </>
  );
}
