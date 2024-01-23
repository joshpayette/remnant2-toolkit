import { Suspense } from 'react'
import AuthWrapper from '../(components)/AuthWrapper'
import PageHeader from '../(components)/PageHeader'
import Header from './(components)/Header'
import Skeleton from '../(components)/Skeleton'
import Tabs from './(components)/Tabs'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AuthWrapper>
      <div className="flex w-full flex-col items-center">
        <PageHeader
          title="Your Profile"
          subtitle="Change your display name or view your builds."
        />
        <div className="flex w-full items-center justify-start">
          <Suspense fallback={<Skeleton />}>
            <Header />
          </Suspense>
        </div>
        {children}
      </div>
    </AuthWrapper>
  )
}
