import React, { useEffect, useState } from "react";
import "./Pagination.css";

interface PaginationProps<T> {
  ListDTO: {
    totalItems: number;
    itemsPerPage: number;
    data: T[];
  };
  fetchPage: (currentPage: number) => Promise<void>;
  renderItem: (item: T) => React.ReactNode;
  keySelector: (item: T) => string | number;
}

const Pagination = <T,>({
  ListDTO,
  fetchPage,
  renderItem,
  keySelector,
}: PaginationProps<T>) => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(ListDTO.totalItems / ListDTO.itemsPerPage);

  useEffect(() => {
    fetchPage(currentPage);
  }, [currentPage, fetchPage]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div>
      <div className="pagination-items">
        {ListDTO.data.map((item) => (
          <div key={keySelector(item)}>{renderItem(item)}</div>
        ))}
      </div>
      <div className="pagination-controls">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={currentPage === index + 1 ? "active" : ""}
          >
            {index + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
