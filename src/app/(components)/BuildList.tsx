import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'
import { useEffect, useState } from 'react'
import { cn, generatePageNumbers } from '../(lib)/utils'
import { PageChangeResponse } from '../(hooks)/usePagination'

interface FooterProps {
  pageSize?: number
  totalBuilds: number
  onUpdateBuilds(): Promise<PageChangeResponse>
}

function Footer({ pageSize = 5, totalBuilds, onUpdateBuilds }: FooterProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.ceil(totalBuilds / pageSize)
  const pageNumbers = generatePageNumbers(currentPage, totalBuilds, pageSize)

  useEffect(() => {
    onUpdateBuilds()
  }, [onUpdateBuilds])

  function previousPage() {
    setCurrentPage(currentPage - 1 > 0 ? currentPage - 1 : 1)
  }

  function nextPage() {
    setCurrentPage(currentPage + 1 > totalPages ? totalPages : currentPage + 1)
  }

  return (
    <div className="flex items-center justify-between border-t border-green-500 bg-black px-4 py-4 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          onClick={previousPage}
          className="relative inline-flex items-center rounded-md border border-green-300 bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-300"
        >
          Previous
        </button>
        <button
          onClick={nextPage}
          className="relative ml-3 inline-flex items-center rounded-md border border-green-300 bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-300"
        >
          Next
        </button>
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-200">
            Showing{' '}
            <span id="start_page_count" className="font-medium">
              {currentPage * pageSize - pageSize + 1}
            </span>{' '}
            to{' '}
            <span id="end_page_count" className="font-medium">
              {currentPage * pageSize > totalBuilds
                ? totalBuilds
                : currentPage * pageSize}
            </span>{' '}
            of <span className="font-medium">{totalBuilds}</span> results
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <button
              onClick={previousPage}
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-green-500 hover:bg-gray-50 hover:text-gray-800 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            {/* Current: "z-10 bg-green-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
            {pageNumbers.map((pageNumber) => (
              <button
                key={pageNumber}
                aria-current="page"
                className={cn(
                  'relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-200 ring-1 ring-inset ring-green-500 hover:bg-green-50 hover:text-gray-800 focus:z-20 focus:outline-offset-0',
                  currentPage === pageNumber &&
                    'relative z-10 inline-flex items-center bg-green-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600',
                )}
                onClick={() => setCurrentPage(pageNumber)}
              >
                {pageNumber}
              </button>
            ))}

            <button
              onClick={nextPage}
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-green-500 hover:bg-green-50 hover:text-gray-800 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  )
}

interface Props extends FooterProps {
  children: React.ReactNode
  headerActions: React.ReactNode | undefined
  label: string
}

export default function BuildList({
  children,
  headerActions,
  label,
  pageSize = 5,
  totalBuilds,
  onUpdateBuilds,
}: Props) {
  return (
    <>
      <div className="flex w-full flex-row items-center justify-center border-b border-b-green-500 py-2">
        <h2 className="flex w-full items-center justify-start text-2xl">
          {label}
        </h2>
        <div className="flex w-full items-center justify-end">
          {headerActions}
        </div>
      </div>
      <ul
        role="list"
        className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        {children}
      </ul>
      <Footer
        pageSize={pageSize}
        totalBuilds={totalBuilds}
        onUpdateBuilds={onUpdateBuilds}
      />
    </>
  )
}
