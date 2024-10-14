import React, { useState, useMemo, useRef } from 'react';
import ControlledPagination from './components/ControlledPagination';
import ProgressivePagination from './components/ProgressivePagination';
import PaginationType from './components/PaginationType';
import IconButton from '@mui/material/IconButton';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import Link from '@mui/material/Link';
import BookmarkRemove from '@mui/icons-material/BookmarkRemove';
import data from './data.json';
import './style.scss';

export default function App() {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10); // default page size is 10
  const [paginationType, setPaginationType] = useState("Controlled"); // Controlled pagination by default
  const [highlightedRow, setHighlightedRow] = useState(null);
  const [hoveredRowIndex, setHoveredRowIndex] = useState(null);
  const rowRef = useRef([]);

  const [bookmarkedItems, setBookmarkedItems] = useState(
    data.reduce((acc, row) => {
      acc[row.id] = { bookmarked: false}; // Default state
      return acc;
    }, {})
  );

  const onUpdateItemsPerPage =  (pageSize) => {
    setPageSize(pageSize);
    setCurrentPage(1);
  };

  const onUpdatePaginationType =  (paginationType) => {
    setPaginationType(paginationType);
  };

  const handleBookmarkClick = (id) => {
    setBookmarkedItems((prev) => ({
      ...prev,
      [id]: {
        bookmarked: !prev[id].bookmarked,
      },
    }));
  }

  const handleBookmarkReferenceClick = (id) => {
    const pNo = Math.ceil(id/pageSize);
    setCurrentPage(pNo);
    setHighlightedRow(id);

    setTimeout(() => {
    if (rowRef.current[id]) {
      rowRef.current[id].scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  });
    
    setTimeout(() => {
      setHighlightedRow(null);
    }, 2000);
  }

  const handleMouseEnter = (id) => {
    setHoveredRowIndex(id);
  };

  const handleMouseLeave = () => {
    setHoveredRowIndex(null);
  };

  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    return data.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, pageSize]);

  return (
    <>
      <div style={{ margin: "10px", justifyContent: "center", display: "grid" }}>
        <h1>Pagination with Bookmarks</h1>
      </div>
      <div style={{ margin: "10px", justifyContent: "right", display: "grid" }}>
      <h5 style={{ marginBottom: "5px"}}>Select pagination type</h5>
        <PaginationType onChangeCallback={onUpdatePaginationType}/>
      </div>
      <div style={{margin: "10px"}}>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Bookmark</th>
            </tr>
          </thead>
          <tbody>
            {currentTableData.map(user => {
              const userId = user.id;
              return (
                <tr key={userId} ref={el => (rowRef.current[userId] = el)}
                style={{backgroundColor:(Number(highlightedRow) === userId) ? "yellow" : (userId % 2 === 0) ? '#b0e6e0' : '#ffffff'}}
                onMouseEnter={() => handleMouseEnter(userId)}
                onMouseLeave={() => handleMouseLeave()}
                >
                  <td>{userId}</td>
                  <td>{user.first_name + " " + user.last_name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>
                    {hoveredRowIndex === userId && (
                      <IconButton aria-label="Add bookmark" onClick={() => handleBookmarkClick(userId)}>
                        {bookmarkedItems[userId].bookmarked ? <BookmarkRemove /> : <BookmarkAddIcon /> }
                      </IconButton>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        </div>
        <div>
        {(paginationType === "Controlled") ? 
        <ControlledPagination
          currentPage={currentPage}
          totalDataCount={data.length}
          pageSize={pageSize}
          onPageChange={page => setCurrentPage(page)}
          onUpdateItemsPerPage = {onUpdateItemsPerPage}
        /> 
        : 
        <ProgressivePagination
          currentPage={currentPage}
          totalDataCount={data.length}
          pageSize={pageSize}
          onPageChange={page => setCurrentPage(page)}
          onUpdateItemsPerPage = {onUpdateItemsPerPage}
        />}
        </div>
        <div className='footnotes'>
          {Object.entries(bookmarkedItems).map(([id, state]) => state.bookmarked? (
            <div>
              <Link
                component="button"
                variant="body2"
                onClick={() => {handleBookmarkReferenceClick(id)}}
              >
                  Foot note for bookmarked item in row {id}
              </Link> 
            </div>
          ) : null
        )}
      </div>
    </>
  );
}
