export interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
}

export interface UsePaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  siblingCount?: number;
}

export interface PaginationItem {
  type: 'page' | 'ellipsis';
  value: number | string;
  isActive?: boolean;
} 