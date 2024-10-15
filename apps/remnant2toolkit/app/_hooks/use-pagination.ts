import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useMemo } from 'react';

interface Props {
  itemsPerPage: number;
  itemsOnThisPage: number;
}

export function usePagination({ itemsPerPage = 16, itemsOnThisPage }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  /**
   * Creates a new query string by adding or updating a parameter.
   */
  const createQueryString = useCallback(
    (name: string, value: string | null) => {
      const params = new URLSearchParams(searchParams);
      if (value === null) {
        params.delete(name);
      } else {
        params.set(name, value);
      }

      return params.toString();
    },
    [searchParams],
  );

  const currentPageParam = searchParams.get('page');
  let currentPage = currentPageParam ? Number(currentPageParam) : 1;
  if (isNaN(currentPage)) currentPage = 1;
  if (currentPage < 1) currentPage = 1;

  const isNextPageDisabled = itemsOnThisPage < itemsPerPage;

  const firstVisibleItemNumber = useMemo(() => {
    if (itemsOnThisPage === 0) {
      return 0;
    }
    return currentPage * itemsPerPage - itemsPerPage + 1;
  }, [currentPage, itemsPerPage, itemsOnThisPage]);

  const lastVisibleItemNumber = useMemo(() => {
    if (itemsOnThisPage === 0) {
      return 0;
    }
    if (itemsOnThisPage < itemsPerPage) {
      return firstVisibleItemNumber + itemsOnThisPage - 1;
    }
    return currentPage * itemsPerPage;
  }, [currentPage, itemsPerPage, itemsOnThisPage, firstVisibleItemNumber]);

  // Shows 5 page numbers, -2 to +2 from the current page
  // If page number is less than 2, show 1 to 5
  // If the current page does not have enough items to fill the page, do not show the next pages
  const pageNumbers = useMemo(() => {
    const numbers: number[] = [];

    if (itemsOnThisPage === 0) {
      numbers.push(1);
      return numbers;
    }

    if (currentPage < 3) {
      for (let i = 1; i <= 5; i++) {
        numbers.push(i);
      }
      return numbers;
    }

    if (isNextPageDisabled) {
      for (let i = currentPage - 4; i <= currentPage; i++) {
        if (i > 0) {
          numbers.push(i);
        }
      }
      return numbers;
    }

    for (let i = currentPage - 2; i <= currentPage + 2; i++) {
      if (i > 0) {
        numbers.push(i);
      }
    }
    return numbers;
  }, [currentPage, isNextPageDisabled, itemsOnThisPage]);

  function handlePreviousPageClick() {
    if (currentPage <= 1) {
      return;
    }
    const previousPage = currentPage - 1;
    router.push(
      `${pathname}?${createQueryString('page', String(previousPage))}`,
      { scroll: false },
    );
  }

  function handleNextPageClick() {
    if (itemsOnThisPage < itemsPerPage) {
      return;
    }

    const nextPage = currentPage + 1;
    router.push(`${pathname}?${createQueryString('page', String(nextPage))}`, {
      scroll: false,
    });
  }

  function handleSpecificPageClick(newPageNumber: number) {
    if (newPageNumber < 1) {
      newPageNumber = 1;
    }
    router.push(
      `${pathname}?${createQueryString('page', String(newPageNumber))}`,
      { scroll: false },
    );
  }

  return {
    handlePreviousPageClick,
    handleNextPageClick,
    handleSpecificPageClick,
    currentPage,
    firstVisibleItemNumber,
    lastVisibleItemNumber,
    isNextPageDisabled,
    pageNumbers,
  };
}
