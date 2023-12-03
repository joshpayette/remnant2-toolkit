import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import NavBar from './NavBar'
import './globals.css'
import FavIcon from './FavIcon'
import { cn } from '@/lib/utils'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Remnant II Toolkit',
  description: 'Utilities for Remnant II',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const aClass = 'text-gray-300 hover:text-green-400 underline'

  return (
    <html lang="en">
      <body className={inter.className}>
        <header>
          <FavIcon />
          <NavBar />
        </header>
        <main className="flex w-full flex-col items-center justify-start p-4 pt-24">
          {children}
        </main>
        <footer className="mt-12 flex w-full items-center justify-center border-t border-purple-900 bg-black py-4 text-left text-sm text-gray-400">
          <div className="my-4 max-w-2xl gap-2">
            <p className="pb-4">
              Remnant 2 Toolkit is an{' '}
              <a
                href="https://github.com/joshpayette/remnant2-toolkit"
                target="_blank"
                className={cn(aClass)}
              >
                open source project
              </a>{' '}
              created and managed by Josh Payette.
            </p>
            <hr className="border-gray-900 pb-4" />
            <p>
              These tools would not be possible without the{' '}
              <a
                href="https://remnant2.wiki.fextralife.com/Remnant+2+Wiki"
                target="_blank"
                className={cn(aClass)}
              >
                Fextralife Remnant 2 Wiki
              </a>
              , as well as the amazingly detailed{' '}
              <a
                href="https://docs.google.com/spreadsheets/d/1hgcUe-PvFnm3QSf3iamtaX3Q8tf_RS_y1fdwS1QHXMU/edit#gid=389923786"
                target="_blank"
                className={cn(aClass)}
              >
                Google Sheet
              </a>{' '}
              compiled by Matthew Whyment.
            </p>
            <hr className="border-gray-900 pb-4" />
            <p className="pb-4">
              {`This project was inspired by Robin Kuiper's `}
              <a
                href="https://remnant.rkuiper.nl/"
                target="_blank"
                className={cn(aClass)}
              >
                Remnant 2 Tools
              </a>
              .
            </p>
          </div>
        </footer>
      </body>
    </html>
  )
}
