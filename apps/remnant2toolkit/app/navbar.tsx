'use client';

import { Menu, Transition } from '@headlessui/react';
import {
  BaseLink,
  ChevronDownIcon,
  cn,
  Logo,
  NavbarContainer,
  ZINDEXES,
} from '@repo/ui';
import { useSession } from 'next-auth/react';
import { Fragment } from 'react';

import { ProfileButton } from '@/app/_components/profile-button';
import { NAV_ITEMS } from '@/app/_types/navigation';

export function Navbar({ showNotifications }: { showNotifications: boolean }) {
  const { status } = useSession();

  return (
    <NavbarContainer
      showNotifications={showNotifications}
      logo={<Logo variant="remnant2toolkit" />}
      desktopProfileButton={<ProfileButton.Desktop />}
      mobileProfileButton={<ProfileButton.Mobile />}
      desktopChildren={
        <>
          <Menu as="div" className="relative">
            <Menu.Button className="bg-background text-surface-solid hover:text-primary-500 flex text-sm font-semibold">
              {({ active }) => (
                <div className="flex items-center justify-center gap-1">
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">Open Builds menu</span>
                  Builds
                  <ChevronDownIcon
                    className={cn('h-3 w-3', active && 'rotate-180 transform')}
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
                    <BaseLink
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
                    </BaseLink>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <BaseLink
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
                    </BaseLink>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <BaseLink
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
                    </BaseLink>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <BaseLink
                      href={NAV_ITEMS.collectionBuilds.href}
                      className={cn(
                        active ? 'bg-gray-800' : '',
                        'text-surface-solid flex w-full flex-row items-start justify-start p-2 text-sm font-semibold',
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
                    </BaseLink>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <BaseLink
                      href={NAV_ITEMS.gimmickBuilds.href}
                      className={cn(
                        active ? 'bg-gray-800' : '',
                        'text-surface-solid flex w-full flex-row items-start justify-start p-2 text-sm font-semibold',
                      )}
                    >
                      <div className="mr-4 w-[20px]">
                        <NAV_ITEMS.gimmickBuilds.icon className="text-primary-600 h-5 w-5" />
                      </div>
                      <div className="flex flex-col items-start justify-start gap-y-1">
                        {NAV_ITEMS.gimmickBuilds.label}
                        <p className="text-xs font-normal text-gray-400">
                          {NAV_ITEMS.gimmickBuilds.description}
                        </p>
                      </div>
                    </BaseLink>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <BaseLink
                      href={NAV_ITEMS.baseGameBuilds.href}
                      className={cn(
                        active ? 'bg-gray-800' : '',
                        'text-surface-solid flex w-full flex-row items-start justify-start p-2 text-sm font-semibold',
                      )}
                    >
                      <div className="mr-4 w-[20px]">
                        <NAV_ITEMS.baseGameBuilds.icon className="text-primary-600 h-5 w-5" />
                      </div>
                      <div className="flex flex-col items-start justify-start gap-y-1">
                        {NAV_ITEMS.baseGameBuilds.label}
                        <p className="text-xs font-normal text-gray-400">
                          {NAV_ITEMS.baseGameBuilds.description}
                        </p>
                      </div>
                    </BaseLink>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <BaseLink
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
                    </BaseLink>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <BaseLink
                      href={NAV_ITEMS.randomBuild.href}
                      className={cn(
                        active ? 'bg-gray-800' : '',
                        'text-surface-solid flex w-full flex-row items-start justify-start p-2 text-sm font-semibold',
                      )}
                    >
                      <div className="mr-4 w-[20px]">
                        <NAV_ITEMS.randomBuild.icon className="text-primary-600 h-5 w-5" />
                      </div>
                      <div className="flex flex-col items-start justify-start gap-y-1">
                        {NAV_ITEMS.randomBuild.label}
                        <p className="text-xs font-normal text-gray-400">
                          {NAV_ITEMS.randomBuild.description}
                        </p>
                      </div>
                    </BaseLink>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
          <BaseLink
            href={NAV_ITEMS.itemLookup.href}
            className={cn(
              'text-surface-solid hover:text-primary-500 flex flex-row items-center justify-start text-sm font-semibold',
            )}
          >
            {NAV_ITEMS.itemLookup.label}
          </BaseLink>
          <BaseLink
            href={NAV_ITEMS.itemTracker.href}
            className={cn(
              'text-surface-solid hover:text-primary-500 flex flex-row items-center justify-start text-sm font-semibold',
            )}
          >
            {NAV_ITEMS.itemTracker.label}
          </BaseLink>
          <BaseLink
            href={NAV_ITEMS.itemQuiz.href}
            className={cn(
              'text-surface-solid hover:text-primary-500 flex flex-row items-center justify-start text-sm font-semibold',
            )}
          >
            {NAV_ITEMS.itemQuiz.label}
          </BaseLink>
          <BaseLink
            href={NAV_ITEMS.resources.href}
            className={cn(
              'text-surface-solid hover:text-primary-500 flex flex-row items-center justify-start text-sm font-semibold',
            )}
          >
            {NAV_ITEMS.resources.label}
          </BaseLink>
          <BaseLink
            href={NAV_ITEMS.supportR2TK.href}
            className={cn(
              'text-accent1-500 hover:text-accent1-300 flex flex-row items-center justify-start text-sm font-semibold',
            )}
          >
            {NAV_ITEMS.supportR2TK.label}
          </BaseLink>
        </>
      }
      mobileChildren={
        <>
          <BaseLink
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
          </BaseLink>

          <BaseLink
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
          </BaseLink>

          <BaseLink
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
          </BaseLink>

          <BaseLink
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
          </BaseLink>

          <BaseLink
            href={NAV_ITEMS.gimmickBuilds.href}
            className="flex flex-row items-center justify-start"
          >
            <NAV_ITEMS.gimmickBuilds.icon
              className="text-primary-600 mr-2 h-7 w-5 flex-none"
              aria-hidden="true"
            />
            <div className="flex flex-col items-start justify-start px-3 py-2">
              {NAV_ITEMS.gimmickBuilds.label}

              <p className="text-xs text-gray-400">
                {NAV_ITEMS.gimmickBuilds.description}
              </p>
            </div>
          </BaseLink>

          <BaseLink
            href={NAV_ITEMS.baseGameBuilds.href}
            className="flex flex-row items-center justify-start"
          >
            <NAV_ITEMS.baseGameBuilds.icon
              className="text-primary-600 mr-2 h-7 w-5 flex-none"
              aria-hidden="true"
            />
            <div className="flex flex-col items-start justify-start px-3 py-2">
              {NAV_ITEMS.baseGameBuilds.label}

              <p className="text-xs text-gray-400">
                {NAV_ITEMS.baseGameBuilds.description}
              </p>
            </div>
          </BaseLink>

          <BaseLink
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
          </BaseLink>

          <BaseLink
            href={NAV_ITEMS.randomBuild.href}
            className="flex flex-row items-center justify-start"
          >
            <NAV_ITEMS.randomBuild.icon
              className="text-primary-600 mr-2 h-7 w-5 flex-none"
              aria-hidden="true"
            />
            <div className="flex flex-col items-start justify-start px-3 py-2">
              {NAV_ITEMS.randomBuild.label}

              <p className="text-xs text-gray-400">
                {NAV_ITEMS.randomBuild.description}
              </p>
            </div>
          </BaseLink>

          <hr className="border-secondary-900" />

          <BaseLink
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
          </BaseLink>

          <BaseLink
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
          </BaseLink>

          <BaseLink
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
          </BaseLink>

          <BaseLink
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
          </BaseLink>

          <hr className="border-secondary-900" />

          <BaseLink
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
          </BaseLink>
        </>
      }
    />
  );
}
