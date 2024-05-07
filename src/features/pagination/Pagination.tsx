import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/solid'

import { cn } from '@/lib/classnames'

interface Props {
  currentPage: number
  isLoading: boolean
  firstVisibleItemNumber: number
  lastVisibleItemNumber: number
  pageNumbers: number[]
  totalItems: number
  totalPages: number
  onPreviousPage: () => void
  onNextPage: () => void
  onSpecificPage: (pageNumber: number) => void
}

export function Pagination({
  currentPage,
  isLoading,
  firstVisibleItemNumber,
  lastVisibleItemNumber,
  pageNumbers,
  totalItems,
  totalPages,
  onPreviousPage,
  onNextPage,
  onSpecificPage,
}: Props) {
  return (
    <div className="flex w-full items-center justify-between bg-black bg-opacity-40 px-4 py-4 sm:px-6">
      {/** Mobile */}
      <div className="flex flex-1 items-center justify-between gap-x-1 sm:hidden">
        <button
          onClick={onPreviousPage}
          aria-label="Previous page"
          className="relative inline-flex items-center rounded-md border border-primary/50 bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/50"
        >
          Previous
        </button>
        <div className="w-full text-center">
          <p className="text-xs text-gray-200">
            Showing{' '}
            <span id="start_page_count" className="font-medium">
              {firstVisibleItemNumber}
            </span>{' '}
            to{' '}
            <span id="end_page_count" className="font-medium">
              {lastVisibleItemNumber}
            </span>{' '}
            of{' '}
            <span className="font-medium">
              {totalItems > 1000 ? '1000+' : totalItems}
            </span>{' '}
            results
          </p>
        </div>
        <button
          onClick={onNextPage}
          aria-label="Next page"
          className="relative ml-3 inline-flex items-center rounded-md border border-primary/50 bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/50"
        >
          Next
        </button>
      </div>
      {/** Desktop */}
      <div className="hidden h-[36px] sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-200">
            Showing{' '}
            <span id="start_page_count" className="font-medium">
              {firstVisibleItemNumber}
            </span>{' '}
            to{' '}
            <span id="end_page_count" className="font-medium">
              {lastVisibleItemNumber}
            </span>{' '}
            of{' '}
            <span className="font-medium">
              {totalItems > 1000 ? '1000+' : totalItems}
            </span>{' '}
            results
          </p>
        </div>

        {isLoading ? null : (
          <div>
            <nav
              className="isolate inline-flex -space-x-px rounded-md shadow-sm"
              aria-label="Pagination"
            >
              <button
                onClick={() => onSpecificPage(1)}
                aria-label="First page"
                className="relative inline-flex w-[45px] items-center justify-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-primary hover:bg-gray-50 hover:text-gray-800 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">First</span>
                <ChevronDoubleLeftIcon className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                onClick={onPreviousPage}
                aria-label="Previous page"
                className="relative inline-flex w-[45px] items-center justify-center px-2 py-2 text-gray-400 ring-1 ring-inset ring-primary hover:bg-gray-50 hover:text-gray-800 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </button>
              {pageNumbers.map((pageNumber) => (
                <button
                  key={pageNumber}
                  aria-label={`Goto page ${pageNumber}`}
                  aria-current="page"
                  className={cn(
                    'relative inline-flex w-[45px] items-center justify-center px-4 py-2 text-sm font-semibold text-gray-200 ring-1 ring-inset ring-primary hover:bg-primary-50 hover:text-gray-800 focus:z-20 focus:outline-offset-0',
                    currentPage === pageNumber &&
                      'relative z-10 inline-flex bg-primary px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
                  )}
                  onClick={() => onSpecificPage(pageNumber)}
                >
                  {pageNumber}
                </button>
              ))}

              <button
                onClick={onNextPage}
                aria-label="Next page"
                className="relative inline-flex h-[36px] w-[45px] items-center justify-center px-2 py-2 text-gray-400 ring-1 ring-inset ring-primary hover:bg-primary-50 hover:text-gray-800 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Next</span>
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                onClick={() => onSpecificPage(totalPages)}
                aria-label="Last page"
                className="relative inline-flex w-[45px] items-center justify-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-primary hover:bg-primary-50 hover:text-gray-800 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Last</span>
                <ChevronDoubleRightIcon
                  className="h-5 w-5"
                  aria-hidden="true"
                />
              </button>
            </nav>
          </div>
        )}
      </div>
    </div>
  )
}
