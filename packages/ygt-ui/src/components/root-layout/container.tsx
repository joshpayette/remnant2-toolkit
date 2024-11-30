import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { CONFIG } from '@ygt/toolkits/configs/yourgamingtoolkit';
import { cn } from '@ygt/ui/cn';

const user = {
  name: 'Tom Cook',
  email: 'tom@example.com',
  imageUrl:
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
};

const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
];

export function Container({ children }: { children: React.ReactNode }) {
  return (
    <div className="ui-min-h-full">
      <Disclosure
        as="nav"
        className="ui-border-b ui-border-gray-200 ui-bg-white"
      >
        <div className="ui-mx-auto ui-max-w-7xl ui-px-4 sm:ui-px-6 lg:ui-px-8">
          <div className="ui-flex ui-h-16 ui-justify-between">
            <div className="ui-flex">
              <div className="ui-flex ui-shrink-0 ui-items-center">
                <img
                  alt="Your Company"
                  className="ui-block ui-h-8 ui-w-auto lg:ui-hidden"
                  src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                />
                <img
                  alt="Your Company"
                  className="ui-hidden ui-h-8 ui-w-auto lg:ui-block"
                  src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
                />
              </div>
              <div className="ui-hidden sm:-ui-my-px sm:ui-ml-6 sm:ui-flex sm:ui-space-x-8">
                {Object.keys(CONFIG.NAV_ITEMS).map((key) => {
                  const item = CONFIG.NAV_ITEMS[key];
                  const current = false; // TODO

                  return (
                    <a
                      aria-current={current ? 'page' : undefined}
                      className={cn(
                        current
                          ? 'ui-border-indigo-500 ui-text-gray-900'
                          : 'ui-border-transparent ui-text-gray-500 hover:ui-border-gray-300 hover:ui-text-gray-700',
                        'ui-inline-flex ui-items-center ui-border-b-2 ui-px-1 ui-pt-1 ui-text-sm ui-font-medium',
                      )}
                      href={item.href}
                      key={item.label}
                    >
                      {item.label}
                    </a>
                  );
                })}
              </div>
            </div>
            <div className="ui-hidden sm:ui-ml-6 sm:ui-flex sm:ui-items-center">
              <button
                className="ui-relative ui-rounded-full ui-bg-white ui-p-1 ui-text-gray-400 hover:ui-text-gray-500 focus:ui-outline-none focus:ui-ring-2 focus:ui-ring-indigo-500 focus:ui-ring-offset-2"
                type="button"
              >
                <span className="ui-absolute -ui-inset-1.5" />
                <span className="ui-sr-only">View notifications</span>
                <BellIcon aria-hidden="true" className="ui-size-6" />
              </button>

              {/* Profile dropdown */}
              <Menu as="div" className="ui-relative ui-ml-3">
                <div>
                  <MenuButton className="ui-relative ui-flex ui-max-w-xs ui-items-center ui-rounded-full ui-bg-white ui-text-sm focus:ui-outline-none focus:ui-ring-2 focus:ui-ring-indigo-500 focus:ui-ring-offset-2">
                    <span className="ui-absolute -ui-inset-1.5" />
                    <span className="ui-sr-only">Open user menu</span>
                    <img
                      alt=""
                      className="ui-size-8 ui-rounded-full"
                      src={user.imageUrl}
                    />
                  </MenuButton>
                </div>
                <MenuItems
                  className="ui-absolute ui-right-0 ui-z-10 ui-mt-2 ui-w-48 ui-origin-top-right ui-rounded-md ui-bg-white ui-py-1 ui-shadow-lg ui-ring-1 ui-ring-black/5 ui-transition focus:ui-outline-none data-[closed]:ui-scale-95 data-[closed]:ui-transform data-[closed]:ui-opacity-0 data-[enter]:ui-duration-200 data-[leave]:ui-duration-75 data-[enter]:ui-ease-out data-[leave]:ui-ease-in"
                  transition
                >
                  {userNavigation.map((item) => (
                    <MenuItem key={item.name}>
                      <a
                        className="ui-block ui-px-4 ui-py-2 ui-text-sm ui-text-gray-700 data-[focus]:ui-bg-gray-100 data-[focus]:ui-outline-none"
                        href={item.href}
                      >
                        {item.name}
                      </a>
                    </MenuItem>
                  ))}
                </MenuItems>
              </Menu>
            </div>
            <div className="-ui-mr-2 ui-flex ui-items-center sm:ui-hidden">
              {/* Mobile menu button */}
              <DisclosureButton className="ui-group ui-relative ui-inline-flex ui-items-center ui-justify-center ui-rounded-md ui-bg-white ui-p-2 ui-text-gray-400 hover:ui-bg-gray-100 hover:ui-text-gray-500 focus:ui-outline-none focus:ui-ring-2 focus:ui-ring-indigo-500 focus:ui-ring-offset-2">
                <span className="ui-absolute -ui-inset-0.5" />
                <span className="ui-sr-only">Open main menu</span>
                <Bars3Icon
                  aria-hidden="true"
                  className="ui-size-6 ui-block group-data-[open]:ui-hidden"
                />
                <XMarkIcon
                  aria-hidden="true"
                  className="ui-size-6 ui-hidden group-data-[open]:ui-block"
                />
              </DisclosureButton>
            </div>
          </div>
        </div>

        <DisclosurePanel className="sm:hidden">
          <div className="ui-space-y-1 ui-pb-3 ui-pt-2">
            {Object.keys(CONFIG.NAV_ITEMS).map((key) => {
              const item = CONFIG.NAV_ITEMS[key];
              const current = false; // TODO

              return (
                <DisclosureButton
                  aria-current={current ? 'page' : undefined}
                  as="a"
                  className={cn(
                    current
                      ? 'ui-border-indigo-500 ui-bg-indigo-50 ui-text-indigo-700'
                      : 'ui-border-transparent ui-text-gray-600 hover:ui-border-gray-300 hover:ui-bg-gray-50 hover:ui-text-gray-800',
                    'ui-block ui-border-l-4 ui-py-2 ui-pl-3 ui-pr-4 ui-text-base ui-font-medium',
                  )}
                  href={item.href}
                  key={item.label}
                >
                  {item.label}
                </DisclosureButton>
              );
            })}
          </div>
          <div className="ui-border-t ui-border-gray-200 ui-pb-3 ui-pt-4">
            <div className="ui-flex ui-items-center ui-px-4">
              <div className="ui-shrink-0">
                <img
                  alt=""
                  className="ui-size-10 ui-rounded-full"
                  src={user.imageUrl}
                />
              </div>
              <div className="ui-ml-3">
                <div className="ui-text-base ui-font-medium ui-text-gray-800">
                  {user.name}
                </div>
                <div className="ui-text-sm ui-font-medium ui-text-gray-500">
                  {user.email}
                </div>
              </div>
              <button
                className="ui-relative ui-ml-auto ui-shrink-0 ui-rounded-full ui-bg-white ui-p-1 ui-text-gray-400 hover:ui-text-gray-500 focus:ui-outline-none focus:ui-ring-2 focus:ui-ring-indigo-500 focus:ui-ring-offset-2"
                type="button"
              >
                <span className="ui-absolute -ui-inset-1.5" />
                <span className="ui-sr-only">View notifications</span>
                <BellIcon aria-hidden="true" className="ui-size-6" />
              </button>
            </div>
            <div className="ui-mt-3 ui-space-y-1">
              {userNavigation.map((item) => (
                <DisclosureButton
                  as="a"
                  className="ui-block ui-px-4 ui-py-2 ui-text-base ui-font-medium ui-text-gray-500 hover:ui-bg-gray-100 hover:ui-text-gray-800"
                  href={item.href}
                  key={item.name}
                >
                  {item.name}
                </DisclosureButton>
              ))}
            </div>
          </div>
        </DisclosurePanel>
      </Disclosure>

      <div className="ui-py-10">
        <header>
          <div className="ui-mx-auto ui-max-w-7xl ui-px-4 sm:ui-px-6 lg:ui-px-8">
            <h1 className="ui-text-3xl ui-font-bold ui-tracking-tight ui-text-gray-900">
              Dashboard
            </h1>
          </div>
        </header>
        <main>
          <div className="ui-mx-auto ui-max-w-7xl ui-px-4 ui-py-8 sm:ui-px-6 lg:ui-px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
