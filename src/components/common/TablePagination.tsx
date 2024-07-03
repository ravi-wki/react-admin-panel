import * as React from 'react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '../ui/pagination';

interface PropType {
  currentPage: number;
  setCurrentPage: (page: number) => void;
  totalRecords: number;
  TABLE_DEFAULT_LIMIT: number;
}

export function TablePagination({
  currentPage,
  setCurrentPage,
  totalRecords,
  TABLE_DEFAULT_LIMIT,
}: PropType) {
  const totalPages = Math.ceil(totalRecords / TABLE_DEFAULT_LIMIT);

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  const generatePaginationLinks = () => {
    const links = [];

    // Previous page link
    links.push(
      <PaginationItem key="prev">
        <PaginationPrevious onClick={() => handlePageClick(currentPage - 1)} />
      </PaginationItem>,
    );

    // First page link
    links.push(
      <PaginationItem key={1}>
        <PaginationLink
          isActive={currentPage === 1}
          onClick={() => handlePageClick(1)}
        >
          1
        </PaginationLink>
      </PaginationItem>,
    );

    // Middle page links or ellipsis
    const maxVisiblePages = 5; // Adjust as needed
    let startPage = Math.max(2, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(
      totalPages - 1,
      currentPage + Math.floor(maxVisiblePages / 2),
    );

    if (startPage <= 2) {
      endPage = Math.min(endPage + (2 - startPage), totalPages - 1);
      startPage = 2;
    } else if (endPage >= totalPages - 1) {
      startPage = Math.max(startPage - (endPage - (totalPages - 1)), 2);
      endPage = totalPages - 1;
    }

    if (startPage > 2) {
      links.push(
        <PaginationItem key="ellipsis-start">
          <PaginationEllipsis />
        </PaginationItem>,
      );
    }

    for (let page = startPage; page <= endPage; page++) {
      links.push(
        <PaginationItem key={page}>
          <PaginationLink
            isActive={currentPage === page}
            onClick={() => handlePageClick(page)}
          >
            {page}
          </PaginationLink>
        </PaginationItem>,
      );
    }

    if (endPage < totalPages - 1) {
      links.push(
        <PaginationItem key="ellipsis-end">
          <PaginationEllipsis />
        </PaginationItem>,
      );
    }

    // Last page link
    if (totalPages > 1) {
      links.push(
        <PaginationItem key={totalPages}>
          <PaginationLink
            isActive={currentPage === totalPages}
            onClick={() => handlePageClick(totalPages)}
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>,
      );
    }

    // Next page link
    links.push(
      <PaginationItem key="next">
        <PaginationNext onClick={() => handlePageClick(currentPage + 1)} />
      </PaginationItem>,
    );

    return links;
  };

  return (
    <Pagination>
      <PaginationContent>{generatePaginationLinks()}</PaginationContent>
    </Pagination>
  );
}
