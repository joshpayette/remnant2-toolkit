import { Metadata } from 'next'

import { PageHeader } from '@/app/(components)/page-header'
import { NAV_ITEMS } from '@/app/(types)/navigation'

export async function generateMetadata(): Promise<Metadata> {
  const title = 'Item Quiz - Remnant 2 Toolkit'
  const description = NAV_ITEMS.itemQuiz.description

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      siteName: 'Remnant 2 Toolkit',
      url: `https://remnant2toolkit.com/guides/hardcore-veteran`,
      images: [
        {
          url: 'https://d2sqltdcj8czo5.cloudfront.net/toolkit/og-image-sm.jpg',
          width: 150,
          height: 150,
        },
      ],
      type: 'website',
    },
    twitter: {
      title,
      description,
    },
  }
}

export default async function Layout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div
      id="quiz-container"
      className="flex w-full flex-col items-center justify-center"
    >
      <PageHeader title="Item Quiz" subtitle={NAV_ITEMS.itemQuiz.description} />
      {/* {!session?.user?.id ? (
        <p className="mb-12 w-full text-center text-red-500">
          If you are not signed in <span className="font-bold">BEFORE</span>{' '}
          starting the game, your results will not be saved!
        </p>
      ) : null} */}
      <div className="flex h-full w-full items-center justify-center">
        {children}
      </div>
    </div>
  )
}
