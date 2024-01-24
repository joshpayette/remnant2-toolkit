import {
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@heroicons/react/24/solid'
import { cn } from '../../../lib/utils'

interface Props {
  currentPage: number
  firstVisibleItemNumber: number
  lastVisibleItemNumber: number
  pageNumbers: number[]
  totalItems: number
  totalPages: number
  onPreviousPage: () => void
  onNextPage: () => void
  onSpecificPage: (pageNumber: number) => void
}

export default function BuildListPagination({
  currentPage,
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
      <div className="flex flex-1 justify-between sm:hidden">
        <button
          onClick={onPreviousPage}
          className="relative inline-flex items-center rounded-md border border-green-300 bg-green-500 px-4 py-2 text-sm font-medium text-white hover:bg-green-300"
        >
          Previous
        </button>
        <button
          onClick={onNextPage}
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
              {totalItems !== 0 ? firstVisibleItemNumber : 0}
            </span>{' '}
            to{' '}
            <span id="end_page_count" className="font-medium">
              {lastVisibleItemNumber}
            </span>{' '}
            of <span className="font-medium">{totalItems}</span> results
          </p>
        </div>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <button
              onClick={() => onSpecificPage(1)}
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-green-500 hover:bg-gray-50 hover:text-gray-800 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">First</span>
              <ChevronDoubleLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              onClick={onPreviousPage}
              className="relative inline-flex items-center px-2 py-2 text-gray-400 ring-1 ring-inset ring-green-500 hover:bg-gray-50 hover:text-gray-800 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            {pageNumbers.map((pageNumber) => (
              <button
                key={pageNumber}
                aria-current="page"
                className={cn(
                  'relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-200 ring-1 ring-inset ring-green-500 hover:bg-green-50 hover:text-gray-800 focus:z-20 focus:outline-offset-0',
                  currentPage === pageNumber &&
                    'relative z-10 inline-flex items-center bg-green-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600',
                )}
                onClick={() => onSpecificPage(pageNumber)}
              >
                {pageNumber}
              </button>
            ))}

            <button
              onClick={onNextPage}
              className="relative inline-flex items-center px-2 py-2 text-gray-400 ring-1 ring-inset ring-green-500 hover:bg-green-50 hover:text-gray-800 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              onClick={() => onSpecificPage(totalPages)}
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-green-500 hover:bg-green-50 hover:text-gray-800 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Last</span>
              <ChevronDoubleRightIcon className="h-5 w-5" aria-hidden="true" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  )
}
