'use client'

import { Dialog, Menu, Transition } from '@headlessui/react'
import {
  Bars3Icon,
  ChevronDownIcon,
  XMarkIcon,
} from '@heroicons/react/24/solid'
import { BaseButton } from '@repo/ui/base/button'
import { Link } from '@repo/ui/base/link'
import { cn } from '@repo/ui/classnames'
import { Logo } from '@repo/ui/logo'
import { ZINDEXES } from '@repo/ui/zindexes'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { Fragment, useEffect, useState } from 'react'

import { AuthButton } from '@/app/(components)/auth-button'
import { NAV_ITEMS } from '@/app/(types)/navigation'

export function NavBar() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const { status } = useSession()

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
          'bg-background fixed mx-auto flex max-h-[80px] w-full max-w-7xl items-center justify-between px-4 py-6',
          ZINDEXES.NAVBAR,
        )}
        aria-label="Global"
      >
        <div className="flex min-w-[250px]">
          <Logo variant="remnant2toolkit" />
        </div>
        <div className="flex w-full justify-end lg:hidden">
          <BaseButton
            plain
            type="button"
            aria-label="Open main menu"
            className="-m-2.5 inline-flex items-center justify-center"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </BaseButton>
        </div>
        <div className="hidden items-center justify-between lg:flex lg:flex-grow lg:gap-x-12">
          <Menu as="div" className="relative">
            <Menu.Button className="text-md bg-background text-surface-solid hover:text-primary-500 flex font-semibold">
              {({ active }) => (
                <div className="flex items-center justify-center gap-1">
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Open Builds menu</span>
                  Builds
                  <ChevronDownIcon
                    className={cn('h-4 w-4', active && 'rotate-180 transform')}
                  />
                </div>
              )}
            </Menu.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items
                className={cn(
                  'bg-background-solid absolute left-0 mt-2 w-[290px] origin-top-left rounded-md p-2 shadow-lg ring-1 ring-gray-800 ring-opacity-5 focus:outline-none',
                  ZINDEXES.NAVBAR_MENU_ITEMS,
                )}
              >
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      href={
                        status === 'loading' || status === 'authenticated'
                          ? NAV_ITEMS.createBuild.href
                          : '/builder'
                      }
                      className={cn(
                        active ? 'bg-gray-800' : '',
                        'text-surface-solid flex w-full flex-row items-start justify-start p-2 text-sm font-semibold',
                      )}
                    >
                      <div className="mr-4 w-[20px]">
                        <NAV_ITEMS.createBuild.icon className="text-primary-600 h-5 w-5" />
                      </div>
                      <div className="flex flex-col items-start justify-start gap-y-1">
                        {NAV_ITEMS.createBuild.label}
                        <p className="text-xs font-normal text-gray-400">
                          {NAV_ITEMS.createBuild.description}
                        </p>
                      </div>
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      href={NAV_ITEMS.featuredBuilds.href}
                      className={cn(
                        active ? 'bg-gray-800' : '',
                        'text-surface-solid flex w-full flex-row items-start justify-start p-2 text-sm font-semibold',
                      )}
                    >
                      <div className="mr-4 w-[20px]">
                        <NAV_ITEMS.featuredBuilds.icon className="text-primary-600 h-5 w-5" />
                      </div>
                      <div className="flex flex-col items-start justify-start gap-y-1">
                        {NAV_ITEMS.featuredBuilds.label}
                        <p className="text-xs font-normal text-gray-400">
                          {NAV_ITEMS.featuredBuilds.description}
                        </p>
                      </div>
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      href={NAV_ITEMS.beginnerBuilds.href}
                      className={cn(
                        active ? 'bg-gray-800' : '',
                        'text-surface-solid flex w-full flex-row items-start justify-start p-2 text-sm font-semibold',
                      )}
                    >
                      <div className="mr-4 w-[20px]">
                        <NAV_ITEMS.beginnerBuilds.icon className="text-primary-600 h-5 w-5" />
                      </div>
                      <div className="flex flex-col items-start justify-start gap-y-1">
                        {NAV_ITEMS.beginnerBuilds.label}
                        <p className="text-xs font-normal text-gray-400">
                          {NAV_ITEMS.beginnerBuilds.description}
                        </p>
                      </div>
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      href={NAV_ITEMS.communityBuilds.href}
                      className={cn(
                        active ? 'bg-gray-800' : '',
                        'text-surface-solid flex w-full flex-row items-start justify-start p-2 text-sm font-semibold',
                      )}
                    >
                      <div className="mr-4 w-[20px]">
                        <NAV_ITEMS.communityBuilds.icon className="text-primary-600 h-5 w-5" />
                      </div>
                      <div className="flex flex-col items-start justify-start gap-y-1">
                        {NAV_ITEMS.communityBuilds.label}
                        <p className="text-xs font-normal text-gray-400">
                          {NAV_ITEMS.communityBuilds.description}
                        </p>
                      </div>
                    </Link>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>

          <Link
            href={NAV_ITEMS.itemLookup.href}
            className={cn(
              'text-md text-surface-solid hover:text-primary-500 flex flex-row items-center justify-start font-semibold',
            )}
          >
            {NAV_ITEMS.itemLookup.label}
          </Link>

          <Link
            href={NAV_ITEMS.itemTracker.href}
            className={cn(
              'text-md text-surface-solid hover:text-primary-500 flex flex-row items-center justify-start font-semibold',
            )}
          >
            {NAV_ITEMS.itemTracker.label}
          </Link>

          <Link
            href={NAV_ITEMS.itemQuiz.href}
            className={cn(
              'text-md text-surface-solid hover:text-primary-500 flex flex-row items-center justify-start font-semibold',
            )}
          >
            {NAV_ITEMS.itemQuiz.label}
          </Link>

          <Link
            href={NAV_ITEMS.resources.href}
            className={cn(
              'text-md text-surface-solid hover:text-primary-500 flex flex-row items-center justify-start font-semibold',
            )}
          >
            {NAV_ITEMS.resources.label}
          </Link>

          <Link
            href={NAV_ITEMS.supportR2TK.href}
            className={cn(
              'text-md text-accent1-500 hover:text-accent1-300 flex flex-row items-center justify-start font-semibold',
            )}
          >
            {NAV_ITEMS.supportR2TK.label}
          </Link>
        </div>
        <div className="hidden w-[80px] grow items-end justify-end lg:flex">
          <AuthButton.Desktop />
        </div>
      </nav>

      {/* MOBILE */}
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className={cn('fixed inset-0', ZINDEXES.DIALOG_BACKDROP)} />
        <Dialog.Panel
          className={cn(
            'bg-background-solid text-surface-solid sm:ring-secondary-900/10 fixed inset-y-0 right-0 w-full overflow-y-auto px-6 py-6 sm:max-w-sm sm:ring-1',
            ZINDEXES.DIALOG,
          )}
        >
          <div className="flex items-center justify-between">
            <Logo variant="remnant2toolkit" />
            <BaseButton
              plain
              aria-label="Close menu"
              className="-m-2.5"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </BaseButton>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6">
              <div className="space-y-2 py-6">
                <Link
                  href={
                    status === 'loading' || status === 'authenticated'
                      ? NAV_ITEMS.createBuild.href
                      : '/builder'
                  }
                  className="flex flex-row items-center justify-start"
                >
                  <NAV_ITEMS.createBuild.icon
                    className="text-primary-600 mr-2 h-7 w-5 flex-none"
                    aria-hidden="true"
                  />
                  <div className="flex flex-col items-start justify-start px-3 py-2">
                    {NAV_ITEMS.createBuild.label}

                    <p className="text-xs text-gray-400">
                      {NAV_ITEMS.createBuild.description}
                    </p>
                  </div>
                </Link>

                <Link
                  href={NAV_ITEMS.featuredBuilds.href}
                  className="flex flex-row items-center justify-start"
                >
                  <NAV_ITEMS.featuredBuilds.icon
                    className="text-primary-600 mr-2 h-7 w-5 flex-none"
                    aria-hidden="true"
                  />
                  <div className="flex flex-col items-start justify-start px-3 py-2">
                    {NAV_ITEMS.featuredBuilds.label}

                    <p className="text-xs text-gray-400">
                      {NAV_ITEMS.featuredBuilds.description}
                    </p>
                  </div>
                </Link>

                <Link
                  href={NAV_ITEMS.beginnerBuilds.href}
                  className="flex flex-row items-center justify-start"
                >
                  <NAV_ITEMS.beginnerBuilds.icon
                    className="text-primary-600 mr-2 h-7 w-5 flex-none"
                    aria-hidden="true"
                  />
                  <div className="flex flex-col items-start justify-start px-3 py-2">
                    {NAV_ITEMS.beginnerBuilds.label}

                    <p className="text-xs text-gray-400">
                      {NAV_ITEMS.beginnerBuilds.description}
                    </p>
                  </div>
                </Link>

                <Link
                  href={NAV_ITEMS.communityBuilds.href}
                  className="flex flex-row items-center justify-start"
                >
                  <NAV_ITEMS.communityBuilds.icon
                    className="text-primary-600 mr-2 h-7 w-5 flex-none"
                    aria-hidden="true"
                  />
                  <div className="flex flex-col items-start justify-start px-3 py-2">
                    {NAV_ITEMS.communityBuilds.label}

                    <p className="text-xs text-gray-400">
                      {NAV_ITEMS.communityBuilds.description}
                    </p>
                  </div>
                </Link>

                <hr className="border-secondary-900" />

                <Link
                  href={NAV_ITEMS.itemLookup.href}
                  className="flex flex-row items-center justify-start"
                >
                  <NAV_ITEMS.itemLookup.icon
                    className="text-primary-600 mr-2 h-7 w-5 flex-none"
                    aria-hidden="true"
                  />
                  <div className="flex flex-col items-start justify-start px-3 py-2">
                    {NAV_ITEMS.itemLookup.label}

                    <p className="text-xs text-gray-400">
                      {NAV_ITEMS.itemLookup.description}
                    </p>
                  </div>
                </Link>

                <Link
                  href={NAV_ITEMS.itemTracker.href}
                  className="flex flex-row items-center justify-start"
                >
                  <NAV_ITEMS.itemTracker.icon
                    className="text-primary-600 mr-2 h-7 w-5 flex-none"
                    aria-hidden="true"
                  />
                  <div className="flex flex-col items-start justify-start px-3 py-2">
                    {NAV_ITEMS.itemTracker.label}

                    <p className="text-xs text-gray-400">
                      {NAV_ITEMS.itemTracker.description}
                    </p>
                  </div>
                </Link>

                <Link
                  href={NAV_ITEMS.itemQuiz.href}
                  className="flex flex-row items-center justify-start"
                >
                  <NAV_ITEMS.itemQuiz.icon
                    className="text-primary-600 mr-2 h-7 w-5 flex-none"
                    aria-hidden="true"
                  />
                  <div className="flex flex-col items-start justify-start px-3 py-2">
                    {NAV_ITEMS.itemQuiz.label}

                    <p className="text-xs text-gray-400">
                      {NAV_ITEMS.itemQuiz.description}
                    </p>
                  </div>
                </Link>

                <Link
                  href={NAV_ITEMS.resources.href}
                  className="flex flex-row items-center justify-start"
                >
                  <NAV_ITEMS.resources.icon
                    className="text-primary-600 mr-2 h-7 w-5 flex-none"
                    aria-hidden="true"
                  />
                  <div className="flex flex-col items-start justify-start px-3 py-2">
                    {NAV_ITEMS.resources.label}

                    <p className="text-xs text-gray-400">
                      {NAV_ITEMS.resources.description}
                    </p>
                  </div>
                </Link>

                <hr className="border-secondary-900" />

                <Link
                  href={NAV_ITEMS.supportR2TK.href}
                  className="flex flex-row items-center justify-start"
                >
                  <NAV_ITEMS.supportR2TK.icon
                    className="text-primary-600 mr-2 h-7 w-5 flex-none"
                    aria-hidden="true"
                  />
                  <div className="flex flex-col items-start justify-start px-3 py-2">
                    {NAV_ITEMS.supportR2TK.label}

                    <p className="text-xs text-gray-400">
                      {NAV_ITEMS.supportR2TK.description}
                    </p>
                  </div>
                </Link>

                <hr className="border-secondary-900" />

                <AuthButton.Mobile />
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </>
  )
}
