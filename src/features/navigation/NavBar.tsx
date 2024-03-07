'use client'

import { Dialog, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/solid'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'
import { Fragment, useEffect, useState } from 'react'

import { NAV_ITEMS } from '@/features/navigation/constants'
import { Logo } from '@/features/ui/Logo'
import { cn } from '@/lib/classnames'

import { AuthButton } from '../auth/components/AuthButton'

export function NavBar() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const { data: session, status } = useSession()

  // Close the navmenu on route change
  // * useEffect is necessary to close the menu on route change
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
        <div className="flex min-w-[250px]">
          <Logo />
        </div>
        <div className="flex w-full justify-end lg:hidden">
          <button
            type="button"
            aria-label="Open main menu"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden items-center justify-center lg:flex lg:flex-grow lg:gap-x-12">
          <Menu as="div" className="relative">
            <Menu.Button className="hover:text-primary-500 flex bg-background text-lg font-semibold text-white">
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
              <Menu.Items className="absolute left-0 z-20 mt-2 w-[290px] origin-top-left rounded-md bg-black p-2 shadow-lg ring-1 ring-gray-800 ring-opacity-5 focus:outline-none">
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
                      href={NAV_ITEMS.communityBuilds.href}
                      className={cn(
                        active ? 'bg-gray-800' : '',
                        'flex w-full flex-row items-start justify-start p-2 text-sm font-semibold text-white',
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
                        <NAV_ITEMS.collectionBuilds.icon className="text-primary-600 h-5 w-5" />
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
                      href={
                        status === 'loading' || status === 'authenticated'
                          ? NAV_ITEMS.createBuild.href
                          : '/builder'
                      }
                      className={cn(
                        active ? 'bg-gray-800' : '',
                        'flex w-full flex-row items-start justify-start p-2 text-sm font-semibold text-white',
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
              </Menu.Items>
            </Transition>
          </Menu>

          <Menu as="div" className="relative">
            <Menu.Button className="hover:text-primary-500 flex bg-background text-lg font-semibold text-white">
              <span className="absolute -inset-1.5" />
              <span className="sr-only">Open Builds menu</span>
              Trackers
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
              <Menu.Items className="absolute left-0 z-20 mt-2 w-[290px] origin-top-left rounded-md bg-black p-2 shadow-lg ring-1 ring-gray-800 ring-opacity-5 focus:outline-none">
                <Menu.Item>
                  {({ active }) => (
                    <Link
                      href={NAV_ITEMS.bossTracker.href}
                      className={cn(
                        active ? 'bg-gray-800' : '',
                        'flex w-full flex-row items-start justify-start p-2 text-sm font-semibold text-white',
                      )}
                    >
                      <div className="mr-4 w-[20px]">
                        <NAV_ITEMS.bossTracker.icon className="text-primary-600 h-5 w-5" />
                      </div>
                      <div className="flex flex-col items-start justify-start gap-y-1">
                        {NAV_ITEMS.bossTracker.label}
                        <p className="text-xs font-normal text-gray-400">
                          {NAV_ITEMS.bossTracker.description}
                        </p>
                      </div>
                    </Link>
                  )}
                </Menu.Item>
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
                        <NAV_ITEMS.itemTracker.icon className="text-primary-600 h-5 w-5" />
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
              </Menu.Items>
            </Transition>
          </Menu>

          <Menu as="div" className="relative">
            <Menu.Button className="hover:text-primary-500 flex bg-background text-lg font-semibold text-white">
              <span className="absolute -inset-1.5" />
              <span className="sr-only">Open Builds menu</span>
              Resources
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
              <Menu.Items className="absolute left-0 z-20 mt-2 w-[290px] origin-top-left rounded-md bg-black p-2 shadow-lg ring-1 ring-gray-800 ring-opacity-5 focus:outline-none">
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
                        <NAV_ITEMS.itemLookup.icon className="text-primary-600 h-5 w-5" />
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

                <Menu.Item>
                  {({ active }) => (
                    <Link
                      href={NAV_ITEMS.ampVsRes.href}
                      className={cn(
                        active ? 'bg-gray-800' : '',
                        'flex w-full flex-row items-start justify-start p-2 text-sm font-semibold text-white',
                      )}
                    >
                      <div className="mr-4 w-[20px]">
                        <NAV_ITEMS.ampVsRes.icon className="text-primary-600 h-5 w-5" />
                      </div>
                      <div className="flex flex-col items-start justify-start gap-y-1">
                        {NAV_ITEMS.ampVsRes.label}
                        <p className="text-xs font-normal text-gray-400">
                          {NAV_ITEMS.ampVsRes.description}
                        </p>
                      </div>
                    </Link>
                  )}
                </Menu.Item>

                <Menu.Item>
                  {({ active }) => (
                    <Link
                      href={NAV_ITEMS.enemyResistances.href}
                      target="_blank"
                      className={cn(
                        active ? 'bg-gray-800' : '',
                        'flex w-full flex-row items-start justify-start p-2 text-sm font-semibold text-white',
                      )}
                    >
                      <div className="mr-4 w-[20px]">
                        <NAV_ITEMS.enemyResistances.icon className="text-primary-600 h-5 w-5" />
                      </div>
                      <div className="flex flex-col items-start justify-start gap-y-1">
                        {NAV_ITEMS.enemyResistances.label}
                        <p className="text-xs font-normal text-gray-400">
                          {NAV_ITEMS.enemyResistances.description}
                        </p>
                      </div>
                    </Link>
                  )}
                </Menu.Item>

                <Menu.Item>
                  {({ active }) => (
                    <Link
                      href={NAV_ITEMS.wiki.href}
                      target="_blank"
                      className={cn(
                        active ? 'bg-gray-800' : '',
                        'flex w-full flex-row items-start justify-start p-2 text-sm font-semibold text-white',
                      )}
                    >
                      <div className="mr-4 flex w-[20px] items-center justify-start">
                        <Image
                          src={NAV_ITEMS.wiki.icon}
                          width={20}
                          height={20}
                          alt={`${NAV_ITEMS.wiki.label}, ${NAV_ITEMS.wiki.description}`}
                          className="text-primary-600 h-5 w-5"
                        />
                      </div>
                      <div className="flex max-w-[222px] flex-col items-start justify-start gap-y-1">
                        {NAV_ITEMS.wiki.label}
                        <p className="text-xs font-normal text-gray-400">
                          {NAV_ITEMS.wiki.description}
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
              'hover:text-primary-500 flex flex-row items-center justify-start text-lg font-semibold text-white',
            )}
          >
            {NAV_ITEMS.myBuilds.label}
          </Link>

          <Link
            href={NAV_ITEMS.favoritedBuilds.href}
            className={cn(
              'hover:text-primary-500 flex flex-row items-center justify-start text-lg font-semibold text-white',
            )}
          >
            {NAV_ITEMS.favoritedBuilds.label}
          </Link>

          <Link
            href={NAV_ITEMS.supportR2TK.href}
            className={cn(
              'text-primary-500 hover:text-primary-300 flex flex-row items-center justify-start text-lg font-semibold underline',
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
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="sm:ring-secondary-900/10 fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-surface px-6 py-6 text-white sm:max-w-sm sm:ring-1">
          <div className="flex items-center justify-between">
            <Logo />
            <button
              type="button"
              aria-label="Close menu"
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

                <Link
                  href={NAV_ITEMS.collectionBuilds.href}
                  className="flex flex-row items-center justify-start"
                >
                  <NAV_ITEMS.collectionBuilds.icon
                    className="text-primary-600 mr-2 h-7 w-5 flex-none"
                    aria-hidden="true"
                  />
                  <div className="flex flex-col items-start justify-start px-3 py-2">
                    {NAV_ITEMS.collectionBuilds.label}

                    <p className="text-xs text-gray-400">
                      {NAV_ITEMS.collectionBuilds.description}
                    </p>
                  </div>
                </Link>

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

                <hr className="border-secondary-900" />

                <Link
                  href={NAV_ITEMS.bossTracker.href}
                  className="flex flex-row items-center justify-start"
                >
                  <NAV_ITEMS.bossTracker.icon
                    className="text-primary-600 mr-2 h-7 w-5 flex-none"
                    aria-hidden="true"
                  />
                  <div className="flex flex-col items-start justify-start px-3 py-2">
                    {NAV_ITEMS.bossTracker.label}

                    <p className="text-xs text-gray-400">
                      {NAV_ITEMS.bossTracker.description}
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
                  href={NAV_ITEMS.ampVsRes.href}
                  className="flex flex-row items-center justify-start"
                >
                  <NAV_ITEMS.ampVsRes.icon
                    className="text-primary-600 mr-2 h-7 w-5 flex-none"
                    aria-hidden="true"
                  />
                  <div className="flex flex-col items-start justify-start px-3 py-2">
                    {NAV_ITEMS.ampVsRes.label}

                    <p className="text-xs text-gray-400">
                      {NAV_ITEMS.ampVsRes.description}
                    </p>
                  </div>
                </Link>

                <Link
                  href={NAV_ITEMS.enemyResistances.href}
                  target="_blank"
                  className="flex flex-row items-center justify-start"
                >
                  <NAV_ITEMS.enemyResistances.icon
                    className="text-primary-600 mr-2 h-7 w-5 flex-none"
                    aria-hidden="true"
                  />
                  <div className="flex flex-col items-start justify-start px-3 py-2">
                    {NAV_ITEMS.enemyResistances.label}

                    <p className="text-xs text-gray-400">
                      {NAV_ITEMS.enemyResistances.description}
                    </p>
                  </div>
                </Link>

                <Link
                  href={NAV_ITEMS.wiki.href}
                  target="_blank"
                  className="flex flex-row items-center justify-start"
                >
                  <Image
                    src={NAV_ITEMS.wiki.icon}
                    width={11}
                    height={20}
                    alt={`${NAV_ITEMS.wiki.label}, ${NAV_ITEMS.wiki.description}`}
                    className="text-primary-600 mr-2 h-7 w-5 flex-none"
                    aria-hidden="true"
                  />
                  <div className="flex max-w-[275px] flex-col items-start justify-start px-3 py-2">
                    {NAV_ITEMS.wiki.label}

                    <p className="text-xs text-gray-400">
                      {NAV_ITEMS.wiki.description}
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
