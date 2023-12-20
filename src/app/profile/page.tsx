'use client'

import { useSession } from 'next-auth/react'
import PageHeader from '../(components)/PageHeader'
import BuildsList from './(components)/BuildsList'

// const navigation = [{ name: 'Builds', href: '/profile', current: true }]

export default function Page() {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  if (status !== 'authenticated') {
    return (
      <div className="bg-red-500 p-2 text-white">
        Access denied. Sign in to view this page.
      </div>
    )
  }

  return (
    <>
      <PageHeader title="Your Profile" />
      <div className="w-full divide-y divide-white/5">
        <div className="w-full max-w-7xl">
          {session.user?.image && (
            <div className="flex items-center gap-x-8">
              <img
                src={session.user?.image}
                alt=""
                className="h-24 w-24 flex-none rounded-lg bg-gray-800 object-cover"
              />
              <div className="flex flex-col gap-y-2">
                <h2 className="text-2xl font-semibold text-white">
                  {session.user?.name}
                </h2>
                <p className="text-sm text-gray-400">{session.user?.email}</p>
              </div>
            </div>
          )}

          <div className="mt-8">
            <BuildsList />
          </div>
        </div>

        {/* <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
          <div>
            <h2 className="text-base font-semibold leading-7 text-white">
              Delete account
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-400">
              No longer want to use our service? You can delete your account
              here. This action is not reversible. All information related to
              this account will be deleted permanently.
            </p>
          </div>

          <form className="flex items-start md:col-span-2">
            <button
              type="submit"
              className="rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-400"
            >
              Yes, delete my account
            </button>
          </form>
        </div> */}
      </div>
    </>
  )
}
