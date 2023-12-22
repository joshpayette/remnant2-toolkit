'use client'

import { useEffect, useState } from 'react'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import Logo from '@/app/(components)/Logo'
import { usePathname } from 'next/navigation'
import { navItems } from '../navitems'
import { AuthButton } from './AuthButton'

export default function NavBar() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Close the navmenu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  return (
    <>
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
          {navItems
            .filter((item) => item.name !== 'Change Log')
            .map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-lg font-semibold leading-6 text-white hover:text-green-400"
              >
                {item.name}
              </Link>
            ))}
          <div className="flex grow items-end justify-end">
            <AuthButton.Desktop />
          </div>
        </div>
      </nav>
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
                {navItems.map((item) => (
                  <div
                    key={item.name}
                    className="flex flex-row items-center justify-start"
                  >
                    <item.icon
                      className="mr-2 h-7 w-5 flex-none text-green-500"
                      aria-hidden="true"
                    />
                    <Link
                      href={item.href}
                      className="block px-3 py-2 text-base font-semibold leading-7 text-white hover:text-purple-500 hover:underline"
                    >
                      {item.name}
                    </Link>
                  </div>
                ))}

                <hr className="border-purple-900" />

                <div className="pt-4">
                  <AuthButton.Mobile />
                </div>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </>
  )
}
