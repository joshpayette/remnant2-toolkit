import { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const title = 'Hardcore Veteran Guide - Remnant2Toolkit'
  const description =
    'This guide is intended to help players who have some experience with the game, but are new to hardcore. It is not a complete guide to the game, nor is it an exhaustive list of the many strategies you can use to clear hardcore veteran. It is intended to be an opinionated guide to best help you complete your hardcore veteran run.'

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
    <div className="flex w-full max-w-2xl flex-col items-start justify-start text-left">
      {children}
    </div>
  )
}
