import { Inter } from 'next/font/google'
import NavBar from '@/app/(components)/NavBar'
import './globals.css'
import { cn } from '@/lib/utils'
import Footer from '@/app/(components)/Footer'
export { metadata } from './metadata'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          'flex min-h-screen flex-col items-center justify-center',
          inter.className,
        )}
      >
        <div className="w-full max-w-7xl">
          <header>
            <NavBar />
          </header>
          <main className="flex w-full flex-col items-center justify-start p-4">
            {children}
          </main>
        </div>
        <footer className="mt-12 flex w-full items-center justify-center border-t border-purple-900 bg-black p-4 text-left text-sm text-gray-400">
          <Footer />
        </footer>
      </body>
    </html>
  )
}
