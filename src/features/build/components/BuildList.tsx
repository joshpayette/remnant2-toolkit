import { Pagination } from '@/features/pagination/Pagination'
import { cn } from '@/lib/classnames'

interface Props {
  children: React.ReactNode
  currentPage: number
  firstVisibleItemNumber: number
  lastVisibleItemNumber: number
  headerActions: React.ReactNode | undefined
  isLoading: boolean
  label?: string
  pageNumbers: number[]
  totalItems: number
  totalPages: number
  onPreviousPage: () => void
  onNextPage: () => void
  onSpecificPage: (pageNumber: number) => void
}

export function BuildList({
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
    <div className={cn(isLoading ? 'min-h-[1000px]' : 'min-h-0')}>
      <div className="flex w-full flex-row items-end justify-center border-b border-b-primary py-2">
        {label ? <div className="w-full text-xl">{label}</div> : null}
        {headerActions}
      </div>
      <Pagination
        isLoading={isLoading}
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
      {children}
      <Pagination
        currentPage={currentPage}
        isLoading={isLoading}
        firstVisibleItemNumber={firstVisibleItemNumber}
        lastVisibleItemNumber={lastVisibleItemNumber}
        pageNumbers={pageNumbers}
        totalItems={totalItems}
        totalPages={totalPages}
        onPreviousPage={onPreviousPage}
        onNextPage={onNextPage}
        onSpecificPage={onSpecificPage}
      />
    </div>
  )
}
