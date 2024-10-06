import { ChevronLeftIcon, ChevronRightIcon, Skeleton } from '@repo/ui';

interface Props {
  currentPage: number;
  isLoading: boolean;
  firstVisibleItemNumber: number;
  lastVisibleItemNumber: number;
  onPreviousPage: () => void;
  onNextPage: () => void;
}

export function Pagination({
  currentPage,
  isLoading,
  firstVisibleItemNumber,
  lastVisibleItemNumber,
  onPreviousPage,
  onNextPage,
}: Props) {
  return (
    <div className="bg-background-solid flex w-full items-center justify-between bg-opacity-40 px-4 py-4 sm:px-6">
      {/** Mobile */}
      <div className="flex flex-1 items-center justify-between gap-x-1 sm:hidden">
        <button
          onClick={onPreviousPage}
          aria-label="Previous page"
          className="border-primary-300 bg-primary-500 text-surface-solid hover:bg-primary-300 relative inline-flex items-center rounded-md border px-4 py-2 text-sm font-medium"
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
            </span>
          </p>
        </div>
        <button
          onClick={onNextPage}
          aria-label="Next page"
          className="border-primary-300 bg-primary-500 text-surface-solid hover:bg-primary-300 relative ml-3 inline-flex items-center rounded-md border px-4 py-2 text-sm font-medium"
        >
          Next
        </button>
      </div>
      {/** Desktop */}
      <div className="hidden h-[36px] sm:flex sm:flex-1 sm:items-center sm:justify-between">
        {isLoading ? (
          <Skeleton className="h-full w-[250px]" />
        ) : (
          <div>
            <p className="text-sm text-gray-200">
              Showing{' '}
              <span id="start_page_count" className="font-medium">
                {firstVisibleItemNumber}
              </span>{' '}
              to{' '}
              <span id="end_page_count" className="font-medium">
                {lastVisibleItemNumber}
              </span>
            </p>
          </div>
        )}

        {isLoading ? (
          <Skeleton className="h-full w-[250px]" />
        ) : (
          <div>
            <nav
              className="isolate inline-flex -space-x-px rounded-md shadow-sm"
              aria-label="Pagination"
            >
              <button
                onClick={onPreviousPage}
                aria-label="Previous page"
                className="ring-primary-500 relative inline-flex w-[45px] items-center justify-center px-2 py-2 text-gray-400 ring-1 ring-inset hover:bg-gray-50 hover:text-gray-800 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Previous</span>
                <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
              </button>

              <div className="text-surface-solid ring-primary-500 flex h-[36px] w-[125px] items-center justify-center px-2 py-2 text-sm ring-1 ring-inset">
                <span className="text-surface-solid">
                  Current Page: {currentPage}
                </span>
              </div>

              <button
                onClick={onNextPage}
                aria-label="Next page"
                className="ring-primary-500 hover:bg-primary-50 relative inline-flex h-[36px] w-[45px] items-center justify-center px-2 py-2 text-gray-400 ring-1 ring-inset hover:text-gray-800 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Next</span>
                <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </nav>
          </div>
        )}
      </div>
    </div>
  );
}
