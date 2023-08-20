import React from 'react';
import { Pagination } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const PaginatedComponent = () => {
  const totalPages = 2698;
  const visiblePageCount = 10;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const [currentPage, setCurrentPage] = React.useState(1);
  const navigate = useNavigate(); // Get the navigate function from React Router

  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);

    // Update the URL with the page number as a query parameter
    navigate(`/jumia?page=${pageNumber}`);
  };


  const startIndex = Math.max(currentPage - Math.floor(visiblePageCount / 2), 0);
  const endIndex = Math.min(startIndex + visiblePageCount - 1, totalPages - 1);

  const visiblePages = pages.slice(startIndex, endIndex + 1);

  return (
    <Pagination style={{ justifyContent: 'center' }}>
      <Pagination.Prev disabled={currentPage === 1} onClick={() => handlePageClick(currentPage - 1)} />

      {visiblePages.map((page) => (
        <Pagination.Item
          key={page}
          active={page === currentPage}
          onClick={() => handlePageClick(page)}
        >
          {page}
        </Pagination.Item>
      ))}

      <Pagination.Next disabled={currentPage === totalPages} onClick={() => handlePageClick(currentPage + 1)} />
    </Pagination>
  );
};

export default PaginatedComponent;
