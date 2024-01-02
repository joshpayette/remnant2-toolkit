import { useState } from 'react'
import { ExtendedBuild } from '../(types)'
import { generatePageNumbers } from '../(lib)/utils'

export interface PageChangeResponse {
  builds: ExtendedBuild[]
  totalResults: number
}

interface Props {
  pageSize?: number
  totalResults: number
}

export default function usePagination({ pageSize = 5, totalResults }: Props) {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.ceil(totalResults / pageSize)
  const pageNumbers = generatePageNumbers(currentPage, totalResults, pageSize)
  const firstVisiblePageNumber = currentPage * pageSize - pageSize + 1
  const lastVisiblePageNumber =
    currentPage * pageSize > totalResults
      ? totalResults
      : currentPage * pageSize

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
    firstVisiblePageNumber,
    lastVisiblePageNumber,
    pageNumbers,
    totalResults,
    totalPages,
  }
}
