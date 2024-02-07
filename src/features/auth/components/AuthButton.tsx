'use client'

import { useSession } from 'next-auth/react'
import PlaceHolderIcon from '../../ui/PlaceholderIcon'
import { cn } from '../../../lib/classnames'
import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import Link from 'next/link'
import Skeleton from '../../ui/Skeleton'
import { NAV_ITEMS } from '@/features/navigation/constants'

function AuthButtonComponent({ variant }: { variant: 'mobile' | 'desktop' }) {
  const { data: session, status } = useSession()

  if (status === 'loading')
    return (
      <div className="w-full max-w-[100px]">
        <Skeleton />
      </div>
    )

  if (status !== 'authenticated' || !session?.user) {
    return (
      <Link
        href="/api/auth/signin"
        className="rounded border border-purple-300 bg-purple-700 p-2 text-center text-sm text-gray-200 hover:bg-purple-500"
      >
        Sign in
      </Link>
    )
  }

  const iconClasses =
    'h-8 w-8 overflow-hidden rounded-full border border-purple-900 p-1'

  const AvatarImage = session.user.image ? (
    <img
      src={session.user.image}
      className={cn(iconClasses)}
      alt={`${session.user.name} Avatar`}
    />
  ) : (
    <span className={cn(iconClasses, 'bg-gray-100')}>
      <PlaceHolderIcon />
    </span>
  )

  if (variant === 'mobile')
    return (
      <div className="space-y-2">
        <Link
          href={NAV_ITEMS.profile.href}
          className="flex flex-row items-center justify-start"
        >
          <NAV_ITEMS.profile.icon
            className="mr-2 h-7 w-5 flex-none text-green-500"
            aria-hidden="true"
          />
          <div className="flex flex-col items-start justify-start px-3 py-2">
            {NAV_ITEMS.profile.label}

            <p className="mt-1 text-xs text-gray-400">
              {NAV_ITEMS.profile.description}
            </p>
          </div>
        </Link>

        <Link
          href={NAV_ITEMS.myBuilds.href}
          className="flex flex-row items-center justify-start"
        >
          <NAV_ITEMS.myBuilds.icon
            className="mr-2 h-7 w-5 flex-none text-green-500"
            aria-hidden="true"
          />
          <div className="flex flex-col items-start justify-start px-3 py-2">
            {NAV_ITEMS.myBuilds.label}

            <p className="mt-1 text-xs text-gray-400">
              {NAV_ITEMS.myBuilds.description}
            </p>
          </div>
        </Link>

        <Link
          href={NAV_ITEMS.favoritedBuilds.href}
          className="flex flex-row items-center justify-start"
        >
          <NAV_ITEMS.favoritedBuilds.icon
            className="mr-2 h-7 w-5 flex-none text-green-500"
            aria-hidden="true"
          />
          <div className="flex flex-col items-start justify-start px-3 py-2">
            {NAV_ITEMS.favoritedBuilds.label}

            <p className="mt-1 text-xs text-gray-400">
              {NAV_ITEMS.favoritedBuilds.description}
            </p>
          </div>
        </Link>

        <Link
          href={NAV_ITEMS.signout.href}
          className="flex flex-row items-center justify-start"
        >
          <NAV_ITEMS.signout.icon
            className="mr-2 h-7 w-5 flex-none text-green-500"
            aria-hidden="true"
          />
          <div className="flex flex-col items-start justify-start px-3 py-2">
            {NAV_ITEMS.signout.label}
          </div>
        </Link>
      </div>
    )

  // Desktop
  return (
    <Menu as="div" className="relative hidden lg:block">
      <Menu.Button className="flex h-8 w-8 rounded-full bg-background text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
        <span className="absolute -inset-1.5" />
        <span className="sr-only">Open user menu</span>
        {AvatarImage}
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
                href={NAV_ITEMS.profile.href}
                className={cn(
                  active ? 'bg-gray-800' : '',
                  'flex flex-row items-center justify-start px-4 py-2 text-sm text-gray-300',
                )}
              >
                <NAV_ITEMS.profile.icon className="mr-1 h-4 w-4 text-green-600" />
                {NAV_ITEMS.profile.label}
              </Link>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <Link
                href={NAV_ITEMS.myBuilds.href}
                className={cn(
                  active ? 'bg-gray-800' : '',
                  'flex flex-row items-center justify-start px-4 py-2 text-sm text-gray-300',
                )}
              >
                <NAV_ITEMS.myBuilds.icon className="mr-1 h-4 w-4 text-green-600" />
                {NAV_ITEMS.myBuilds.label}
              </Link>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <Link
                href={NAV_ITEMS.favoritedBuilds.href}
                className={cn(
                  active ? 'bg-gray-800' : '',
                  'flex flex-row items-center justify-start  px-4 py-2 text-sm text-gray-300',
                )}
              >
                <NAV_ITEMS.favoritedBuilds.icon className="mr-1 h-4 w-4 text-green-600" />
                Favorited Builds
              </Link>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <Link
                href={NAV_ITEMS.signout.href}
                className={cn(
                  active ? 'bg-gray-800' : '',
                  'flex flex-row items-center justify-start px-4 py-2 text-sm text-gray-300',
                )}
              >
                <NAV_ITEMS.signout.icon className="mr-1 h-4 w-4 text-green-600" />
                {NAV_ITEMS.signout.label}
              </Link>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export const AuthButton = {
  Desktop: () => <AuthButtonComponent variant="desktop" />,
  Mobile: () => <AuthButtonComponent variant="mobile" />,
}
