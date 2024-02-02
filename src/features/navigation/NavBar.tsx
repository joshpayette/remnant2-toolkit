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
              <Menu.Items className="absolute right-0 z-10 mt-2 w-[290px] origin-top-right rounded-md bg-black p-2 shadow-lg ring-1 ring-gray-800 ring-opacity-5 focus:outline-none">
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      href={NAV_ITEMS.featuredBuilds.href}
                      className={cn(
                        active ? 'bg-gray-800' : '',
                        'flex w-full flex-row items-start justify-start p-2 text-sm font-semibold text-white',
                      )}
                    >
                      <div className="mr-4 w-[20px]">
                        <NAV_ITEMS.featuredBuilds.icon className="h-5 w-5 text-green-600" />
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
                      href={NAV_ITEMS.communityBuilds.href}
                      className={cn(
                        active ? 'bg-gray-800' : '',
                        'flex w-full flex-row items-start justify-start p-2 text-sm font-semibold text-white',
                      )}
                    >
                      <div className="mr-4 w-[20px]">
                        <NAV_ITEMS.communityBuilds.icon className="h-5 w-5 text-green-600" />
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
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      href={NAV_ITEMS.collectionBuilds.href}
                      className={cn(
                        active ? 'bg-gray-800' : '',
                        'flex w-full flex-row items-start justify-start p-2 text-sm font-semibold text-white',
                      )}
                    >
                      <div className="mr-4 w-[20px]">
                        <NAV_ITEMS.collectionBuilds.icon className="h-5 w-5 text-green-600" />
                      </div>
                      <div className="flex flex-col items-start justify-start gap-y-1">
                        {NAV_ITEMS.collectionBuilds.label}
                        <p className="text-xs font-normal text-gray-400">
                          {NAV_ITEMS.collectionBuilds.description}
                        </p>
                      </div>
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      href={NAV_ITEMS.createBuild.href}
                      className={cn(
                        active ? 'bg-gray-800' : '',
                        'flex w-full flex-row items-start justify-start p-2 text-sm font-semibold text-white',
                      )}
                    >
                      <div className="mr-4 w-[20px]">
                        <NAV_ITEMS.createBuild.icon className="h-5 w-5 text-green-600" />
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
              <Menu.Items className="absolute right-0 z-10 mt-2 w-[290px] origin-top-right rounded-md bg-black p-2 shadow-lg ring-1 ring-gray-800 ring-opacity-5 focus:outline-none">
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      href={NAV_ITEMS.itemTracker.href}
                      className={cn(
                        active ? 'bg-gray-800' : '',
                        'flex w-full flex-row items-start justify-start p-2 text-sm font-semibold text-white',
                      )}
                    >
                      <div className="mr-4 w-[20px]">
                        <NAV_ITEMS.itemTracker.icon className="h-5 w-5 text-green-600" />
                      </div>
                      <div className="flex flex-col items-start justify-start gap-y-1">
                        {NAV_ITEMS.itemTracker.label}
                        <p className="text-xs font-normal text-gray-400">
                          {NAV_ITEMS.itemTracker.description}
                        </p>
                      </div>
                    </Link>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      href={NAV_ITEMS.itemLookup.href}
                      className={cn(
                        active ? 'bg-gray-800' : '',
                        'flex w-full flex-row items-start justify-start p-2 text-sm font-semibold text-white',
                      )}
                    >
                      <div className="mr-4 w-[20px]">
                        <NAV_ITEMS.itemLookup.icon className="h-5 w-5 text-green-600" />
                      </div>
                      <div className="flex flex-col items-start justify-start gap-y-1">
                        {NAV_ITEMS.itemLookup.label}
                        <p className="text-xs font-normal text-gray-400">
                          {NAV_ITEMS.itemLookup.description}
                        </p>
                      </div>
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
                <Link
                  href={NAV_ITEMS.featuredBuilds.href}
                  className="flex flex-row items-center justify-start"
                >
                  <NAV_ITEMS.featuredBuilds.icon
                    className="mr-2 h-7 w-5 flex-none text-green-500"
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
                  href={NAV_ITEMS.communityBuilds.href}
                  className="flex flex-row items-center justify-start"
                >
                  <NAV_ITEMS.communityBuilds.icon
                    className="mr-2 h-7 w-5 flex-none text-green-500"
                    aria-hidden="true"
                  />
                  <div className="flex flex-col items-start justify-start px-3 py-2">
                    {NAV_ITEMS.communityBuilds.label}

                    <p className="text-xs text-gray-400">
                      {NAV_ITEMS.communityBuilds.description}
                    </p>
                  </div>
                </Link>

                <Link
                  href={NAV_ITEMS.createBuild.href}
                  className="flex flex-row items-center justify-start"
                >
                  <NAV_ITEMS.createBuild.icon
                    className="mr-2 h-7 w-5 flex-none text-green-500"
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
                  href={NAV_ITEMS.itemTracker.href}
                  className="flex flex-row items-center justify-start"
                >
                  <NAV_ITEMS.itemTracker.icon
                    className="mr-2 h-7 w-5 flex-none text-green-500"
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
                  href={NAV_ITEMS.itemLookup.href}
                  className="flex flex-row items-center justify-start"
                >
                  <NAV_ITEMS.itemLookup.icon
                    className="mr-2 h-7 w-5 flex-none text-green-500"
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
                  href={NAV_ITEMS.supportR2TK.href}
                  className="flex flex-row items-center justify-start"
                >
                  <NAV_ITEMS.supportR2TK.icon
                    className="mr-2 h-7 w-5 flex-none text-green-500"
                    aria-hidden="true"
                  />
                  <div className="flex flex-col items-start justify-start px-3 py-2">
                    {NAV_ITEMS.supportR2TK.label}

                    <p className="text-xs text-gray-400">
                      {NAV_ITEMS.supportR2TK.description}
                    </p>
                  </div>
                </Link>

                <hr className="border-purple-900" />

                <Suspense fallback={<LoadingIndicator />}>
                  <AuthButton.Mobile />
                </Suspense>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </>
  )
}
