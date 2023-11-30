'use client'

import { Fragment, useEffect, useState } from 'react'
import { Dialog } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import Logo from '../components/Logo'
import { usePathname } from 'next/navigation'

const navigation = [
  { name: 'Item Tracker', href: '/tracker' },
  { name: 'Builds', href: '/builds' },
]

export default function NavBar() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Close the navmenu on route change
  useEffect(() => {
    setMobileMenuOpen(false)
  }, [pathname])

  return (
    <Fragment>
      <nav
        className="fixed z-40 mx-auto flex w-full max-w-7xl items-center justify-between bg-background p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex">
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
        <div className="hidden items-center justify-center lg:flex lg:flex-grow lg:gap-x-12">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-semibold leading-6 text-white hover:text-green-400"
            >
              {item.name}
            </Link>
          ))}
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
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-white hover:bg-purple-900"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </Fragment>
  )
}
