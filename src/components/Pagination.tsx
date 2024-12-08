import React, { useEffect, useState } from "react";
import "./Pagination.css";

interface Metadata {
  pageCount: number;
  pageSize: number;
  currentPage: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

interface PaginationProps<T> {
  ListDTO: {
    metadata: Metadata;
    data: T[];
  };
  fetchPage: (currentPage: number) => Promise<void>;
  renderItem: (item: T) => React.ReactNode;
}

const Pagination = <T,>({
  ListDTO,
  fetchPage,
  renderItem,
}: PaginationProps<T>) => {
  const [currentPage, setCurrentPage] = useState(ListDTO.metadata.currentPage);

  const totalPages = ListDTO.metadata.pageCount;

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
          <div> {renderItem(item)}</div>
        ))}
      </div>
      <div className="pagination-controls">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={!ListDTO.metadata.hasPreviousPage}
        >
          Previous
        </button>


        {/* {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            className={currentPage === index + 1 ? "active" : ""}
          >
            {index + 1}
          </button>
        ))} */}

        <div className="pagination-currentPage">
          {ListDTO.metadata.currentPage}
        </div>


        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={!ListDTO.metadata.hasNextPage}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Pagination;
