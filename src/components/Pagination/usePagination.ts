import { useMemo } from 'react';
import { UsePaginationProps, PaginationItem } from './types';

const DOTS = '...';

export const usePagination = ({
  totalItems,
  itemsPerPage,
  currentPage,
  siblingCount = 1
}: UsePaginationProps) => {
  const paginationRange = useMemo(() => {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    
    const totalPageNumbers = siblingCount + 5;

    if (totalPageNumbers >= totalPages) {
      return Array.from({ length: totalPages }, (_, i) => ({
        type: 'page' as const,
        value: i + 1,
        isActive: Number(i + 1) === Number(currentPage)
      }));
    }

    const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
    const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPages);

    const shouldShowLeftDots = leftSiblingIndex > 2;
    const shouldShowRightDots = rightSiblingIndex < totalPages - 1;

    const firstPageIndex = 1;
    const lastPageIndex = totalPages;

    if (!shouldShowLeftDots && shouldShowRightDots) {
      const leftItemCount = 3 + 2 * siblingCount;
      const leftRange = Array.from({ length: leftItemCount }, (_, i) => ({
        type: 'page' as const,
        value: i + 1,
        isActive: Number(i + 1) === Number(currentPage)
      }));

      return [...leftRange, { type: 'ellipsis' as const, value: DOTS }, { type: 'page' as const, value: lastPageIndex }];
    }

    if (shouldShowLeftDots && !shouldShowRightDots) {
      const rightItemCount = 3 + 2 * siblingCount;
      const rightRange = Array.from({ length: rightItemCount }, (_, i) => ({
        type: 'page' as const,
        value: totalPages - rightItemCount + i + 1,
        isActive: Number(totalPages - rightItemCount + i + 1) === Number(currentPage)
      }));

      return [{ type: 'page' as const, value: firstPageIndex }, { type: 'ellipsis' as const, value: DOTS }, ...rightRange];
    }

    const middleRange = Array.from({ length: rightSiblingIndex - leftSiblingIndex + 1 }, (_, i) => ({
      type: 'page' as const,
      value: leftSiblingIndex + i,
      isActive: Number(leftSiblingIndex + i) === Number(currentPage)
    }));

    return [
      { type: 'page' as const, value: firstPageIndex },
      { type: 'ellipsis' as const, value: DOTS },
      ...middleRange,
      { type: 'ellipsis' as const, value: DOTS },
      { type: 'page' as const, value: lastPageIndex }
    ];
  }, [totalItems, itemsPerPage, currentPage, siblingCount]);

  return paginationRange;
}; 