import AuthWrapper from '../(components)/AuthWrapper'
import PageHeader from '../(components)/PageHeader'
import BuildList from './(components)/BuildList'
import ProfileHeader from './(components)/ProfileHeader'

// const navigation = [{ name: 'Builds', href: '/profile', current: true }]

export default function Page() {
  return (
    <AuthWrapper>
      <PageHeader title="Your Profile" />
      <div className="w-full divide-y divide-white/5">
        <div className="w-full max-w-7xl">
          <ProfileHeader />
          <div className="mt-8">
            <BuildList />
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
    </AuthWrapper>
  )
}
