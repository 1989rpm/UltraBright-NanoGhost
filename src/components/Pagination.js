import React, { useState } from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const [jumpPage, setJumpPage] = useState('');

  if (totalPages <= 1) return null;

  const handleJump = () => {
    const pageNum = Number(jumpPage);
    if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= totalPages) {
      onPageChange(pageNum);
      setJumpPage('');
    }
  };

  return (
    <div style={{ display: 'flex', gap: '6px', justifyContent: 'center', alignItems: 'center', marginTop: '1rem' }}>
      {/* Prev button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Prev
      </button>

      {/* First page */}
      {currentPage > 2 && (
        <>
          <button onClick={() => onPageChange(1)}>1</button>
          {currentPage > 3 && <span>...</span>}
        </>
      )}

      {/* Previous page */}
      {currentPage > 1 && (
        <button onClick={() => onPageChange(currentPage - 1)}>
          {currentPage - 1}
        </button>
      )}

      {/* Current page */}
      <button style={{ fontWeight: 'bold' }}>{currentPage}</button>

      {/* Next page */}
      {currentPage < totalPages && (
        <button onClick={() => onPageChange(currentPage + 1)}>
          {currentPage + 1}
        </button>
      )}

      {/* Last page */}
      {currentPage < totalPages - 1 && (
        <>
          {currentPage < totalPages - 2 && <span>...</span>}
          <button onClick={() => onPageChange(totalPages)}>{totalPages}</button>
        </>
      )}

      {/* Next button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Next
      </button>

      {/* Jump to Page */}
      <div style={{ display: 'flex', gap: '2px', alignItems: 'center', marginLeft: '30px', padding: '6px 8px', backgroundColor: '#f9f9f9'}}>
        <input
          type="number"
          value={jumpPage}
          onChange={(e) => setJumpPage(e.target.value)}
          placeholder="Jump to"
          style={{ width: '60px', padding: '4px', border: '1px solid #ccc', borderRadius: '4px' }}
        />
        <button onClick={handleJump}
                style={{ padding: '4px 8px', border: '1px solid #ccc', borderRadius: '4px', backgroundColor: '#e6e6e6', cursor: 'pointer'}}
        >
          Go
        </button>
      </div>
    </div>
  );
};

export default Pagination;
