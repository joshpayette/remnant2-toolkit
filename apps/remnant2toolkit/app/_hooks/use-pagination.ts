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

  const firstVisibleItemNumber = useMemo(() => {
    return currentPage * itemsPerPage - itemsPerPage + 1;
  }, [currentPage, itemsPerPage]);

  const lastVisibleItemNumber = useMemo(() => {
    if (itemsOnThisPage < itemsPerPage) {
      return firstVisibleItemNumber + itemsOnThisPage - 1;
    }
    return currentPage * itemsPerPage;
  }, [currentPage, itemsPerPage, itemsOnThisPage, firstVisibleItemNumber]);

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

  // function handleSpecificPageClick(newPageNumber: number) {
  //   if (newPageNumber < 1) {
  //     newPageNumber = 1
  //   } else if (newPageNumber > totalPages) {
  //     newPageNumber = totalPages
  //   }

  //   router.push(
  //     `${pathname}?${createQueryString('page', String(newPageNumber))}`,
  //     { scroll: false },
  //   )
  // }

  return {
    handlePreviousPageClick,
    handleNextPageClick,
    currentPage,
    firstVisibleItemNumber,
    lastVisibleItemNumber,
  };
}
