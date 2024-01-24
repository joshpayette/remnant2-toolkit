import { useEffect } from 'react'
import Loading from '../../../app/loading'
import BuildListPagination from './BuildListPagination'

interface Props {
  children: React.ReactNode
  currentPage: number
  firstVisibleItemNumber: number
  lastVisibleItemNumber: number
  headerActions: React.ReactNode | undefined
  isLoading: boolean
  label: string
  pageNumbers: number[]
  totalItems: number
  totalPages: number
  onPreviousPage: () => void
  onNextPage: () => void
  onSpecificPage: (pageNumber: number) => void
}

export default function BuildList({
  children,
  currentPage,
  firstVisibleItemNumber,
  lastVisibleItemNumber,
  headerActions,
  isLoading,
  label,
  pageNumbers,
  totalItems,
  totalPages,
  onPreviousPage,
  onNextPage,
  onSpecificPage,
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
      <BuildListPagination
        currentPage={currentPage}
        firstVisibleItemNumber={firstVisibleItemNumber}
        lastVisibleItemNumber={lastVisibleItemNumber}
        pageNumbers={pageNumbers}
        totalItems={totalItems}
        totalPages={totalPages}
        onPreviousPage={onPreviousPage}
        onNextPage={onNextPage}
        onSpecificPage={onSpecificPage}
      />
      <ul
        role="list"
        className="my-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        {isLoading ? <Loading /> : children}
      </ul>
      <BuildListPagination
        currentPage={currentPage}
        firstVisibleItemNumber={firstVisibleItemNumber}
        lastVisibleItemNumber={lastVisibleItemNumber}
        pageNumbers={pageNumbers}
        totalItems={totalItems}
        totalPages={totalPages}
        onPreviousPage={onPreviousPage}
        onNextPage={onNextPage}
        onSpecificPage={onSpecificPage}
      />
    </>
  )
}
