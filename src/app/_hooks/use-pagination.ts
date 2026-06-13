import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useMemo } from 'react';

interface Props {
  itemsPerPage: number;
  totalItems: number;
}

export function usePagination({ itemsPerPage = 16, totalItems }: Props) {
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

  const totalPageCount = useMemo(() => {
    return Math.ceil(totalItems / itemsPerPage);
  }, [itemsPerPage, totalItems]);

  const currentPageParam = searchParams.get('page');
  let currentPage = currentPageParam ? Number(currentPageParam) : 1;
  if (isNaN(currentPage)) currentPage = 1;
  if (currentPage < 1) currentPage = 1;

  const isNextPageDisabled = useMemo(() => {
    return currentPage >= totalPageCount;
  }, [currentPage, totalPageCount]);

  const firstVisibleItemNumber = useMemo(() => {
    if (totalItems === 0) {
      return 0;
    }
    return (currentPage - 1) * itemsPerPage + 1;
  }, [currentPage, itemsPerPage, totalItems]);

  const lastVisibleItemNumber = useMemo(() => {
    if (totalItems === 0) {
      return 0;
    }
    return Math.min(currentPage * itemsPerPage, totalItems);
  }, [currentPage, itemsPerPage, totalItems]);

  // Shows 5 page numbers, -2 to +2 from the current page
  // If page number is less than 2, show 1 to 5
  // If page number is greater than totalPageCount - 2, show totalPageCount - 4 to totalPageCount
  const pageNumbers = useMemo(() => {
    let numbers: number[] = [];

    if (totalPageCount <= 5) {
      numbers = Array.from({ length: totalPageCount }, (_, i) => i + 1);
    } else if (currentPage <= 2) {
      numbers = [1, 2, 3, 4, 5];
    } else if (currentPage >= totalPageCount - 2) {
      numbers = [
        totalPageCount - 4,
        totalPageCount - 3,
        totalPageCount - 2,
        totalPageCount - 1,
        totalPageCount,
      ];
    } else {
      numbers = [
        currentPage - 2,
        currentPage - 1,
        currentPage,
        currentPage + 1,
        currentPage + 2,
      ];
    }

    return numbers;
  }, [currentPage, totalPageCount]);

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
    if (isNextPageDisabled) {
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
    if (newPageNumber > totalPageCount) {
      newPageNumber = totalPageCount;
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
