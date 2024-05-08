'use client'

import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useIsClient } from 'usehooks-ts'

import { cn } from '@/lib/classnames'

interface Props {
  isEditable: boolean
  isLoadoutPublic: boolean
  showPrivateLinks: boolean
  userId: string
}

export function ProfileNavbar({
  isEditable,
  isLoadoutPublic,
  showPrivateLinks,
  userId,
}: Props) {
  const pathname = usePathname()
  const isClient = useIsClient()

  let navItems = [
    {
      name: 'Overview',
      href: {
        pathname: `/profile/${userId}`,
        query: { t: Date.now() },
      },
      current: pathname === `/profile/${userId}`,
    },
    {
      name: 'Created Builds',
      href: {
        pathname: `/profile/${userId}/created-builds`,
        query: {
          t: Date.now(),
        },
      },
      current: pathname === `/profile/${userId}/created-builds`,
    },
    {
      name: 'Featured Builds',
      href: {
        pathname: `/profile/${userId}/featured-builds`,
        query: {
          t: Date.now(),
        },
      },
      current: pathname === `/profile/${userId}/featured-builds`,
    },
    {
      name: 'Favorited Builds',
      href: {
        pathname: `/profile/${userId}/favorited-builds`,
        query: {
          t: Date.now(),
        },
      },
      current: pathname === `/profile/${userId}/favorited-builds`,
      private: true,
    },
    {
      name: 'Loadouts',
      href: {
        pathname: `/profile/${userId}/loadouts`,
        query: { t: Date.now() },
      },
      current: pathname === `/profile/${userId}/loadouts`,
      private: !isLoadoutPublic,
    },
  ]

  if (!showPrivateLinks) {
    navItems = navItems.filter((item) => !item.private)
  }

  return (
    <nav className="flex border-b border-white/10 py-4">
      <ul
        role="list"
        className="flex min-w-full flex-wrap items-center justify-center gap-x-6 gap-y-2 px-4 text-sm font-semibold leading-6 text-on-background-container sm:px-6 md:items-start md:justify-start md:gap-y-0 lg:px-8"
      >
        {isClient &&
          navItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className={cn(
                  'flex items-center justify-center hover:text-primary hover:underline',
                  item.current ? 'text-primary-container' : '',
                )}
              >
                {isEditable ? (
                  <span className="mr-1">
                    {item.private ? (
                      <EyeSlashIcon className="h-4 w-4" />
                    ) : (
                      <EyeIcon className="h-4 w-4" />
                    )}
                  </span>
                ) : null}
                {item.name}
              </Link>
            </li>
          ))}
      </ul>
    </nav>
  )
}
