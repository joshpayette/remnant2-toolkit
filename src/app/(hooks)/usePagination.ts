import { useState } from 'react'

export interface PaginationResponse<ItemType> {
  items: ItemType[]
  totalItemCount: number
}

interface Props {
  itemsPerPage: number
  totalItemCount: number
}

/**
 * Generates an array of page numbers based on the current page
 */
export function generatePageNumbers({
  currentPage,
  totalItemCount,
  itemsPerPage,
}: {
  currentPage: number
  totalItemCount: number
  itemsPerPage: number
}) {
  const totalPages = Math.ceil(totalItemCount / itemsPerPage)
  let startPage = Math.max(1, currentPage - 2)
  let endPage = Math.min(totalPages, currentPage + 2)

  // Adjust startPage and endPage if there are less than 5 pages
  if (totalPages <= 5) {
    startPage = 1
    endPage = totalPages
  } else {
    if (currentPage <= 3) {
      endPage = 5
    } else if (currentPage > totalPages - 2) {
      startPage = totalPages - 4
    }
  }

  const pageNumbers = []
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i)
  }

  return pageNumbers
}

/**
 * Hook to assist with the boilerplate management of pagination
 * and related values.
 *
 * @param itemsPerPage The number of items to display per page
 * @param totalItemCount The total number of items to paginate
 *
 * @example
 *    const itemsPerPage = 5
 *    const [items, setItems] = useState<ExtendedBuild[]>([])
 *    const [totalItemCount, setTotalItemCount] = useState(0)
 *
 *    const {
 *      currentPage,
 *      firstVisiblePageNumber,
 *      lastVisiblePageNumber,
 *      pageNumbers,
 *      handleSpecificPageClick,
 *      handleNextPageClick,
 *      handlePreviousPageClick,
 *    } = usePagination({ itemsPerPage, totalItemCount })
 *
 *   // This is an example of how you would use this hook with
 *   // a useEffect to fetch data from an API
 *    useEffect(() => {
 *      const getItemsAsync = async () => {
 *        const response = await getItems({
 *          itemsPerPage,
 *          pageNumber: currentPage,
 *        })
 *        setItems(response.items)
 *        setTotalItemCount(response.totalItemCount)
 *      }
 *      getItemsAsync()
 *    }, [currentPage])
 */
export default function usePagination({
  itemsPerPage = 5,
  totalItemCount,
}: Props) {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.ceil(totalItemCount / itemsPerPage)
  const pageNumbers = generatePageNumbers({
    currentPage,
    totalItemCount,
    itemsPerPage,
  })
  const firstVisibleItemNumber = currentPage * itemsPerPage - itemsPerPage + 1
  const lastVisibleItemNumber =
    currentPage * itemsPerPage > totalItemCount
      ? totalItemCount
      : currentPage * itemsPerPage

  function handlePreviousPageClick() {
    setCurrentPage(currentPage - 1 > 0 ? currentPage - 1 : 1)
  }

  function handleNextPageClick() {
    setCurrentPage(currentPage + 1 > totalPages ? totalPages : currentPage + 1)
  }

  function handleSpecificPageClick(newPageNumber: number) {
    setCurrentPage(newPageNumber)
  }

  return {
    handleSpecificPageClick,
    handlePreviousPageClick,
    handleNextPageClick,
    currentPage,
    firstVisibleItemNumber,
    lastVisibleItemNumber,
    pageNumbers,
    totalItemCount,
    totalPages,
  }
}
