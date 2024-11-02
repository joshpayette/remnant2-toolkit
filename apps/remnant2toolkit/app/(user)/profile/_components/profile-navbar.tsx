'use client';

import { cn, EyeIcon, EyeOffIcon } from '@repo/ui';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useIsClient } from 'usehooks-ts';

import { NAV_ITEMS } from '@/app/_constants/nav-items';

interface Props {
  isEditable: boolean;
  isLoadoutPublic: boolean;
  showPrivateLinks: boolean;
  profileId: string;
}

export function ProfileNavbar({
  isEditable,
  isLoadoutPublic,
  showPrivateLinks,
  profileId,
}: Props) {
  const pathname = usePathname();
  const isClient = useIsClient();

  let navItems = [
    {
      name: 'Overview',
      href: {
        pathname: `/profile/${profileId}`,
        query: { t: Date.now() },
      },
      current: pathname === `/profile/${profileId}`,
    },
    {
      name: showPrivateLinks ? NAV_ITEMS.myBuilds.label : 'Created Builds',
      href: {
        pathname: `/profile/${profileId}/created-builds`,
        query: {
          t: Date.now(),
        },
      },
      current: pathname === `/profile/${profileId}/created-builds`,
    },
    {
      name: NAV_ITEMS.featuredBuilds.label,
      href: {
        pathname: `/profile/${profileId}/featured-builds`,
        query: {
          t: Date.now(),
        },
      },
      current: pathname === `/profile/${profileId}/featured-builds`,
    },
    {
      name: NAV_ITEMS.favoritedBuilds.label,
      href: {
        pathname: `/profile/${profileId}/favorited-builds`,
        query: {
          t: Date.now(),
        },
      },
      current: pathname === `/profile/${profileId}/favorited-builds`,
      private: true,
    },
    {
      name: NAV_ITEMS.loadouts.label,
      href: {
        pathname: `/profile/${profileId}/loadouts`,
        query: { t: Date.now() },
      },
      current: pathname === `/profile/${profileId}/loadouts`,
      private: !isLoadoutPublic,
    },
    {
      name: 'Linked Builds (Deprecated)',
      href: {
        pathname: `/profile/${profileId}/linked-builds`,
        query: { t: Date.now() },
      },
      current: pathname === `/profile/${profileId}/linked-builds`,
      private: false,
    },
  ];

  if (!showPrivateLinks) {
    navItems = navItems.filter((item) => !item.private);
  }

  return (
    <nav className="border-surface-solid/10 flex border-b py-4">
      <ul
        role="list"
        className="flex min-w-full flex-wrap items-center justify-center gap-x-6 gap-y-2 px-4 text-sm font-semibold leading-6 text-gray-400 sm:px-6 md:items-start md:justify-start md:gap-y-0 lg:px-8"
      >
        {isClient &&
          navItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className={cn(
                  'hover:text-primary-300 flex items-center justify-center hover:underline',
                  item.current ? 'text-primary-400' : '',
                )}
              >
                {isEditable ? (
                  <span className="mr-1">
                    {item.private ? (
                      <EyeOffIcon className="h-4 w-4" />
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
  );
}
