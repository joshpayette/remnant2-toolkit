'use client'

import { Fragment, Suspense, useEffect, useState } from 'react'
import { Dialog, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import Logo from '@/features/ui/Logo'
import { usePathname } from 'next/navigation'
import { AuthButton } from '../auth/components/AuthButton'
import LoadingIndicator from '../ui/LoadingIndicator'
import { cn } from '../../lib/classnames'
import { NAV_ITEMS } from '@/features/navigation/constants'

export default function NavBar() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Close the navmenu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  return (
    <>
      {/* DESKTOP */}
      <nav
        className="z-40 mx-auto flex w-full items-center justify-between bg-background px-4 py-6"
        aria-label="Global"
      >
        <div className="flex min-w-[300px]">
          <Logo />
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden items-center justify-start lg:flex lg:w-full lg:flex-grow lg:gap-x-12">
          <Menu as="div" className="relative">
            <Menu.Button className="flex bg-background text-lg font-semibold text-white hover:text-green-500">
              <span className="absolute -inset-1.5" />
              <span className="sr-only">Open Builds menu</span>
              Builds
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
              <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-black py-1 shadow-lg ring-1 ring-gray-800 ring-opacity-5 focus:outline-none">
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      href={NAV_ITEMS.featuredBuilds.href}
                      className={cn(
                        active ? 'bg-gray-800' : '',
                        'flex flex-row items-center justify-start px-4 py-2 text-sm text-gray-300',
                      )}
                    >
                      <NAV_ITEMS.featuredBuilds.icon className="mr-1 h-4 w-4 text-green-600" />
                      {NAV_ITEMS.featuredBuilds.label}
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      href={NAV_ITEMS.communityBuilds.href}
                      className={cn(
                        active ? 'bg-gray-800' : '',
                        'flex flex-row items-center justify-start px-4 py-2 text-sm text-gray-300',
                      )}
                    >
                      <NAV_ITEMS.communityBuilds.icon className="mr-1 h-4 w-4 text-green-600" />
                      {NAV_ITEMS.communityBuilds.label}
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      href={NAV_ITEMS.createBuild.href}
                      className={cn(
                        active ? 'bg-gray-800' : '',
                        'flex flex-row items-center justify-start px-4 py-2 text-sm text-gray-300',
                      )}
                    >
                      <NAV_ITEMS.createBuild.icon className="mr-1 h-4 w-4 text-green-600" />
                      {NAV_ITEMS.createBuild.label}
                    </Link>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>

          <Menu as="div" className="relative">
            <Menu.Button className="flex bg-background text-lg font-semibold text-white hover:text-green-500">
              <span className="absolute -inset-1.5" />
              <span className="sr-only">Open Builds menu</span>
              Items
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
              <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-black py-1 shadow-lg ring-1 ring-gray-800 ring-opacity-5 focus:outline-none">
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      href={NAV_ITEMS.itemTracker.href}
                      className={cn(
                        active ? 'bg-gray-800' : '',
                        'flex flex-row items-center justify-start px-4 py-2 text-sm text-gray-300',
                      )}
                    >
                      <NAV_ITEMS.itemTracker.icon className="mr-1 h-4 w-4 text-green-600" />
                      {NAV_ITEMS.itemTracker.label}
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      href={NAV_ITEMS.itemLookup.href}
                      className={cn(
                        active ? 'bg-gray-800' : '',
                        'flex flex-row items-center justify-start px-4 py-2 text-sm text-gray-300',
                      )}
                    >
                      <NAV_ITEMS.itemLookup.icon className="mr-1 h-4 w-4 text-green-600" />
                      {NAV_ITEMS.itemLookup.label}
                    </Link>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>

          <Link
            href={NAV_ITEMS.myBuilds.href}
            className={cn(
              'flex flex-row items-center justify-start text-lg font-semibold text-white',
            )}
          >
            {NAV_ITEMS.myBuilds.label}
          </Link>

          <Link
            href={NAV_ITEMS.changeLog.href}
            className={cn(
              'flex flex-row items-center justify-start text-lg font-semibold text-white',
            )}
          >
            {NAV_ITEMS.changeLog.label}
          </Link>

          <Link
            href={NAV_ITEMS.supportR2TK.href}
            className={cn(
              'flex flex-row items-center justify-start text-lg font-semibold text-green-500 underline',
            )}
          >
            {NAV_ITEMS.supportR2TK.label}
          </Link>

          <div className="flex grow items-end justify-end">
            <Suspense fallback={<LoadingIndicator />}>
              <AuthButton.Desktop />
            </Suspense>
          </div>
        </div>
      </nav>

      {/* MOBILE */}
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-surface px-6 py-6 text-white sm:max-w-sm sm:ring-1 sm:ring-purple-900/10">
          <div className="flex items-center justify-between">
            <Logo />
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6">
              <div className="space-y-2 py-6">
                <div
                  key={NAV_ITEMS.featuredBuilds.label}
                  className="flex flex-row items-center justify-start"
                >
                  <NAV_ITEMS.featuredBuilds.icon
                    className="mr-2 h-7 w-5 flex-none text-green-500"
                    aria-hidden="true"
                  />
                  <Link
                    href={NAV_ITEMS.featuredBuilds.href}
                    className={cn(
                      'block px-3 py-2 text-base font-semibold leading-7 text-white',
                    )}
                  >
                    {NAV_ITEMS.featuredBuilds.label}
                  </Link>
                </div>
                <div
                  key={NAV_ITEMS.communityBuilds.label}
                  className="flex flex-row items-center justify-start"
                >
                  <NAV_ITEMS.communityBuilds.icon
                    className="mr-2 h-7 w-5 flex-none text-green-500"
                    aria-hidden="true"
                  />
                  <Link
                    href={NAV_ITEMS.communityBuilds.href}
                    className={cn(
                      'block px-3 py-2 text-base font-semibold leading-7 text-white',
                    )}
                  >
                    {NAV_ITEMS.communityBuilds.label}
                  </Link>
                </div>
                <div
                  key={NAV_ITEMS.createBuild.label}
                  className="flex flex-row items-center justify-start"
                >
                  <NAV_ITEMS.createBuild.icon
                    className="mr-2 h-7 w-5 flex-none text-green-500"
                    aria-hidden="true"
                  />
                  <Link
                    href={NAV_ITEMS.createBuild.href}
                    className={cn(
                      'block px-3 py-2 text-base font-semibold leading-7 text-white',
                    )}
                  >
                    {NAV_ITEMS.createBuild.label}
                  </Link>
                </div>
                <div
                  key={NAV_ITEMS.itemTracker.label}
                  className="flex flex-row items-center justify-start"
                >
                  <NAV_ITEMS.itemTracker.icon
                    className="mr-2 h-7 w-5 flex-none text-green-500"
                    aria-hidden="true"
                  />
                  <Link
                    href={NAV_ITEMS.itemTracker.href}
                    className={cn(
                      'block px-3 py-2 text-base font-semibold leading-7 text-white',
                    )}
                  >
                    {NAV_ITEMS.itemTracker.label}
                  </Link>
                </div>
                <div
                  key={NAV_ITEMS.itemLookup.label}
                  className="flex flex-row items-center justify-start"
                >
                  <NAV_ITEMS.itemLookup.icon
                    className="mr-2 h-7 w-5 flex-none text-green-500"
                    aria-hidden="true"
                  />
                  <Link
                    href={NAV_ITEMS.itemLookup.href}
                    className={cn(
                      'block px-3 py-2 text-base font-semibold leading-7 text-white',
                    )}
                  >
                    {NAV_ITEMS.itemLookup.label}
                  </Link>
                </div>
                <div
                  key={NAV_ITEMS.supportR2TK.label}
                  className="flex flex-row items-center justify-start"
                >
                  <NAV_ITEMS.supportR2TK.icon
                    className="mr-2 h-7 w-5 flex-none text-green-500"
                    aria-hidden="true"
                  />
                  <Link
                    href={NAV_ITEMS.supportR2TK.href}
                    className={cn(
                      'block px-3 py-2 text-base font-semibold leading-7 text-green-500 underline',
                    )}
                  >
                    {NAV_ITEMS.supportR2TK.label}
                  </Link>
                </div>

                <hr className="border-purple-900" />

                <Suspense fallback={<LoadingIndicator />}>
                  <div className="pt-4">
                    <AuthButton.Mobile />
                  </div>
                </Suspense>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </>
  )
}
