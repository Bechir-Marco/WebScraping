import React from 'react';
import { Pagination } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';

const PaginatedComponent = () => {
  const totalPages = 6000;
  const visiblePageCount = 10;
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const [currentPage, setCurrentPage] = React.useState(1);
  const navigate = useNavigate();
  const location = useLocation();

  const handlePageClick = (pageNumber: number) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Store the page number in local storage
    localStorage.setItem('currentPage', pageNumber.toString());
    setCurrentPage(pageNumber);
    
    let newPath = location.pathname;
    
    let storedCategoryName = localStorage.getItem(
      'alkitab_selectedCategoryName'
    );

    if (storedCategoryName === undefined || storedCategoryName === null)
      storedCategoryName = '';
      console.log('cat',storedCategoryName);
    let searchVal = localStorage.getItem('storedSearchValue');
    console.log('search',searchVal);
    if (searchVal === undefined || searchVal === null) searchVal = '';

    if (
      location.pathname.includes('jumia') ||
      location.pathname.includes('tunisianet') ||
      location.pathname.includes('alkitab') ||
      location.pathname.includes('mytek')    
    ) {
      
        newPath = `${newPath}?categoryName=${
          storedCategoryName
        }&page=${pageNumber}&search=${searchVal}`;
        
    }
  
    // Navigate to the new path
    navigate(newPath);
  };

  const startIndex = Math.max(
    currentPage - Math.floor(visiblePageCount / 2),
    0
  );
  const endIndex = Math.min(startIndex + visiblePageCount - 1, totalPages - 1);

  const visiblePages = pages.slice(startIndex, endIndex + 1);

  return (
    <Pagination style={{ justifyContent: 'center' }}>
      <Pagination.Prev
        disabled={currentPage === 1}
        onClick={() => handlePageClick(currentPage - 1)}
      />

      {visiblePages.map((page) => (
        <Pagination.Item
          key={page}
          active={page === currentPage}
          onClick={() => handlePageClick(page)}
        >
          {page}
        </Pagination.Item>
      ))}

      <Pagination.Next
        disabled={currentPage === totalPages}
        onClick={() => handlePageClick(currentPage + 1)}
      />
    </Pagination>
  );
};

export default PaginatedComponent;
