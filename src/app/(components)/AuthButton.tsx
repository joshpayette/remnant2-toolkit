'use client'

import { useSession } from 'next-auth/react'
import PlaceHolderIcon from './PlaceholderIcon'
import { cn } from '../(lib)/utils'
import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import Link from 'next/link'
import {
  ArrowLeftOnRectangleIcon,
  ListBulletIcon,
  StarIcon,
  UserCircleIcon,
} from '@heroicons/react/24/solid'
import Skeleton from './Skeleton'

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
        className="rounded border border-green-500 bg-background p-2 text-sm text-white hover:bg-green-800"
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
        <div className="flex flex-row items-center justify-start">
          <UserCircleIcon
            className="mr-2 h-7 w-5 flex-none text-green-500"
            aria-hidden="true"
          />
          <Link
            href="/profile"
            className="block px-3 py-2 text-base font-semibold leading-7 text-white hover:text-purple-500 hover:underline"
          >
            Your Profile
          </Link>
        </div>
        <div className="flex flex-row items-center justify-start">
          <ListBulletIcon
            className="mr-2 h-7 w-5 flex-none text-green-500"
            aria-hidden="true"
          />
          <Link
            href="/profile/created-builds"
            className="block px-3 py-2 text-base font-semibold leading-7 text-white hover:text-purple-500 hover:underline"
          >
            Created Builds
          </Link>
        </div>
        <div className="flex flex-row items-center justify-start">
          <StarIcon
            className="mr-2 h-7 w-5 flex-none text-green-500"
            aria-hidden="true"
          />
          <Link
            href="/profile/favorited-builds"
            className="block px-3 py-2 text-base font-semibold leading-7 text-white hover:text-purple-500 hover:underline"
          >
            Favorited Builds
          </Link>
        </div>
        <div className="flex flex-row items-center justify-start">
          <ArrowLeftOnRectangleIcon
            className="mr-2 h-7 w-5 flex-none text-green-500"
            aria-hidden="true"
          />
          <Link
            href="/api/auth/signout"
            className="block px-3 py-2 text-base font-semibold leading-7 text-white hover:text-purple-500 hover:underline"
          >
            Signout
          </Link>
        </div>
      </div>
    )

  return (
    <Menu as="div" className="relative ml-3">
      <div>
        <Menu.Button className="relative flex rounded-full bg-background text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
          <span className="absolute -inset-1.5" />
          <span className="sr-only">Open user menu</span>
          {AvatarImage}
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <Menu.Item>
            {({ active }) => (
              <>
                <Link
                  href="/profile"
                  className={cn(
                    active ? 'bg-gray-100' : '',
                    'block px-4 py-2 text-sm text-gray-700',
                  )}
                >
                  Your Profile
                </Link>
              </>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <Link
                href="/profile/created-builds"
                className={cn(
                  active ? 'bg-gray-100' : '',
                  'block px-4 py-2 text-sm text-gray-700',
                )}
              >
                Created Builds
              </Link>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <Link
                href="/profile/favorited-builds"
                className={cn(
                  active ? 'bg-gray-100' : '',
                  'block px-4 py-2 text-sm text-gray-700',
                )}
              >
                Favorited Builds
              </Link>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <Link
                href="/api/auth/signout"
                className={cn(
                  active ? 'bg-gray-100' : '',
                  'block px-4 py-2 text-sm text-gray-700',
                )}
              >
                Signout
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
