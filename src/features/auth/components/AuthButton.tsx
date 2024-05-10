'use client'

import { Menu, Transition } from '@headlessui/react'
import { useSession } from 'next-auth/react'
import { Fragment } from 'react'

import { Link } from '@/app/(components)/_base/link'
import { NAV_ITEMS } from '@/app/(types)/navigation'
import { PlaceHolderIcon } from '@/features/ui/PlaceholderIcon'
import { cn } from '@/lib/classnames'

function AuthButtonComponent({ variant }: { variant: 'mobile' | 'desktop' }) {
  const { data: session, status } = useSession()

  const iconClasses =
    'h-8 w-8 overflow-hidden rounded-full border border-secondary p-1'

  const AvatarImage = session?.user?.image ? (
    <img
      src={session?.user.image}
      className={cn(iconClasses)}
      alt={`${session?.user.name} Avatar`}
    />
  ) : (
    <span className={cn(iconClasses, 'bg-gray-100')}>
      <PlaceHolderIcon />
    </span>
  )

  if (variant === 'mobile')
    return (
      <div className="space-y-2">
        {session?.user?.id ? (
          <Link
            href={`/profile/${session?.user?.id}?t=${Date.now()}`}
            className="flex flex-row items-center justify-start"
          >
            <NAV_ITEMS.profile.icon
              className="mr-2 h-7 w-5 flex-none text-primary"
              aria-hidden="true"
            />
            <div className="flex flex-col items-start justify-start px-3 py-2">
              {NAV_ITEMS.profile.label}

              <p className="mt-1 text-xs text-on-background">
                {NAV_ITEMS.profile.description}
              </p>
            </div>
          </Link>
        ) : null}

        {session?.user?.id ? (
          <Link
            href={`/profile/${session?.user
              ?.id}/created-builds?t=${Date.now()}`}
            className="flex flex-row items-center justify-start"
          >
            <NAV_ITEMS.myBuilds.icon
              className="mr-2 h-7 w-5 flex-none text-primary"
              aria-hidden="true"
            />
            <div className="flex flex-col items-start justify-start px-3 py-2">
              {NAV_ITEMS.myBuilds.label}

              <p className="mt-1 text-xs text-on-background">
                {NAV_ITEMS.myBuilds.description}
              </p>
            </div>
          </Link>
        ) : null}

        {session?.user?.id ? (
          <Link
            href={`/profile/${session?.user
              ?.id}/favorited-builds?t=${Date.now()}`}
            className="flex flex-row items-center justify-start"
          >
            <NAV_ITEMS.favoritedBuilds.icon
              className="mr-2 h-7 w-5 flex-none text-primary"
              aria-hidden="true"
            />
            <div className="flex flex-col items-start justify-start px-3 py-2">
              {NAV_ITEMS.favoritedBuilds.label}

              <p className="mt-1 text-xs text-on-background">
                {NAV_ITEMS.favoritedBuilds.description}
              </p>
            </div>
          </Link>
        ) : null}

        {session?.user?.id ? (
          <Link
            href={`/profile/${session?.user?.id}/loadouts?t=${Date.now()}`}
            className="flex flex-row items-center justify-start"
          >
            <NAV_ITEMS.loadouts.icon
              className="mr-2 h-7 w-5 flex-none text-primary"
              aria-hidden="true"
            />
            <div className="flex flex-col items-start justify-start px-3 py-2">
              {NAV_ITEMS.loadouts.label}

              <p className="mt-1 text-xs text-on-background">
                {NAV_ITEMS.loadouts.description}
              </p>
            </div>
          </Link>
        ) : null}

        {status !== 'authenticated' || !session?.user ? (
          <Link
            href={NAV_ITEMS.signin.href}
            className="flex flex-row items-center justify-start"
          >
            <NAV_ITEMS.signin.icon
              className="mr-2 h-7 w-5 flex-none text-primary"
              aria-hidden="true"
            />
            <div className="flex flex-col items-start justify-start px-3 py-2 text-sm">
              {NAV_ITEMS.signin.label}
            </div>
          </Link>
        ) : (
          <Link
            href={NAV_ITEMS.signout.href}
            className="flex flex-row items-center justify-start"
          >
            <NAV_ITEMS.signout.icon
              className="mr-2 h-7 w-5 flex-none text-primary"
              aria-hidden="true"
            />
            <div className="flex flex-col items-start justify-start px-3 py-2">
              {NAV_ITEMS.signout.label}
            </div>
          </Link>
        )}
      </div>
    )

  // Desktop
  return status !== 'authenticated' || !session?.user ? (
    <Link
      href={NAV_ITEMS.signin.href}
      className={cn(
        'hidden flex-row items-center justify-start rounded-lg bg-secondary p-2 text-xs font-semibold text-background hover:bg-secondary lg:flex',
      )}
    >
      {NAV_ITEMS.signin.label}
    </Link>
  ) : (
    <Menu as="div" className="relative hidden lg:block">
      <Menu.Button className="flex h-8 w-8 rounded-full bg-background text-sm focus:outline-none focus:ring-2 focus:ring-background-container focus:ring-offset-2 focus:ring-offset-background-container">
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
        <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-background py-1 shadow-lg ring-1 ring-background-container ring-opacity-5 focus:outline-none">
          {session?.user?.id ? (
            <Menu.Item>
              {({ active }) => (
                <Link
                  href={`/profile/${session?.user?.id}?t=${Date.now()}`}
                  className={cn(
                    active ? 'bg-primary-container/20' : 'bg-background',
                    'flex flex-row items-center justify-start px-4 py-2 text-sm text-on-background',
                  )}
                >
                  <NAV_ITEMS.profile.icon className="mr-1 h-4 w-4 text-primary" />
                  {NAV_ITEMS.profile.label}
                </Link>
              )}
            </Menu.Item>
          ) : null}
          {session?.user?.id ? (
            <Menu.Item>
              {({ active }) => (
                <Link
                  href={`/profile/${session?.user?.id}/created-builds`}
                  className={cn(
                    active ? 'bg-primary-container/20' : 'bg-background',
                    'flex flex-row items-center justify-start px-4 py-2 text-sm text-on-background',
                  )}
                >
                  <NAV_ITEMS.myBuilds.icon className="mr-1 h-4 w-4 text-primary" />
                  {NAV_ITEMS.myBuilds.label}
                </Link>
              )}
            </Menu.Item>
          ) : null}
          {session?.user?.id ? (
            <Menu.Item>
              {({ active }) => (
                <Link
                  href={`/profile/${session?.user
                    ?.id}/favorited-builds?t=${Date.now()}`}
                  className={cn(
                    active ? 'bg-primary-container/20' : 'bg-background',
                    'flex flex-row items-center justify-start px-4 py-2 text-sm text-on-background',
                  )}
                >
                  <NAV_ITEMS.favoritedBuilds.icon className="mr-1 h-4 w-4 text-primary" />
                  Favorited Builds
                </Link>
              )}
            </Menu.Item>
          ) : null}
          {session?.user?.id ? (
            <Menu.Item>
              {({ active }) => (
                <Link
                  href={`/profile/${session?.user
                    ?.id}/loadouts?t=${Date.now()}`}
                  className={cn(
                    active ? 'bg-primary-container/20' : 'bg-background',
                    'flex flex-row items-center justify-start  px-4 py-2 text-sm text-on-background',
                  )}
                >
                  <NAV_ITEMS.loadouts.icon className="mr-1 h-4 w-4 text-primary" />
                  Loadouts
                </Link>
              )}
            </Menu.Item>
          ) : null}
          <Menu.Item>
            {({ active }) => (
              <Link
                href={NAV_ITEMS.signout.href}
                className={cn(
                  active ? 'bg-primary-container/20' : 'bg-background',
                  'flex flex-row items-center justify-start px-4 py-2 text-sm text-on-background',
                )}
              >
                <NAV_ITEMS.signout.icon className="mr-1 h-4 w-4 text-primary" />
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
