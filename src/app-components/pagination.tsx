import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { PaginationProps } from '@/interface-and-types';

const Pagination = ({
  totalPages,
  entriesPerPage,
  totalEntries,
}: PaginationProps) => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  // Read from URL params - single source of truth
  const currentPage = Number(searchParams.get("page")) || 1;
  const pageSize = Number(searchParams.get("page_size")) || entriesPerPage;

  const generatePagination = (current: number, total: number): (number | string)[] => {
    if (total <= 7) {
      return Array.from({ length: total }, (_, i) => i + 1);
    }

    if (current <= 3) {
      return [1, 2, 3, '...', total - 1, total];
    }

    if (current >= total - 2) {
      return [1, 2, '...', total - 2, total - 1, total];
    }

    return [1, '...', current - 1, current, current + 1, '...', total];
  };

  // Update URL params when page changes
  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());
    navigate(`?${params.toString()}`, { replace: true });
  };

  // Update URL params when page size changes
  const handlePageSizeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newSize = Number(event.target.value);
    
    const params = new URLSearchParams(searchParams);
    params.set("page_size", newSize.toString());
    params.set("page", "1"); // Reset to page 1 when changing page size
    navigate(`?${params.toString()}`, { replace: true });
  };

  const allPages = generatePagination(currentPage, totalPages);
  // const startIndex = (currentPage - 1) * pageSize + 1;
  // const endIndex = Math.min(startIndex + pageSize - 1, totalEntries);

  return (
    <div className="pagination-container">
      <div className="pagination-left">
        <span className="pagination-text">Showing</span>
        <select 
          className="pagination-select" 
          value={pageSize}
          onChange={handlePageSizeChange}
        >
          <option value={10}>10</option>
          <option value={25}>25</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
          <option value={250}>250</option>
          <option value={500}>500</option>
        </select>
        <span className="pagination-text">out of {totalEntries}</span>
      </div>

      <div className="pagination-controls">
        <button
          className="pagination-arrow"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          type="button"
        >
          <ChevronLeft size={16} />
        </button>

        {allPages.map((page, index) => (
          <React.Fragment key={index}>
            {page === '...' ? (
              <span className="pagination-ellipsis">{page}</span>
            ) : (
              <button
                type="button"
                className={`pagination-number ${currentPage === page ? 'active' : ''}`}
                onClick={() => handlePageChange(page as number)}
              >
                {page}
              </button>
            )}
          </React.Fragment>
        ))}

        <button
          className="pagination-arrow"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          type="button"
        >
          <ChevronRight size={16} />
        </button>
      </div>

      <style>{`
        .pagination-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px 20px;
          font-family: 'Work Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }

        .pagination-left {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .pagination-text {
          font-size: 14px;
          color: #545F7D;
          font-weight: 400;
        }

        .pagination-select {
          background: #F5F5F7;
          border: 1px solid #E5E5E5;
          border-radius: 4px;
          padding: 6px 28px 6px 12px;
          font-size: 14px;
          color: #213F7D;
          font-weight: 500;
          cursor: pointer;
          outline: none;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg width='10' height='6' viewBox='0 0 10 6' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M1 1L5 5L9 1' stroke='%23213F7D' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 10px center;
          transition: all 0.2s ease;
        }

        .pagination-select:hover {
          background-color: #EBEBED;
        }

        .pagination-select:focus {
          border-color: #39CDCC;
        }

        .pagination-controls {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .pagination-arrow {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
          background: #FFFFFF;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          color: #213F7D;
          transition: all 0.2s ease;
        }

        .pagination-arrow:hover:not(:disabled) {
          background: #F5F5F7;
        }

        .pagination-arrow:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }

        .pagination-number {
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 24px;
          height: 24px;
          padding: 0 8px;
          background: #FFFFFF;
          border: none;
          border-radius: 4px;
          font-size: 14px;
          color: #545F7D;
          cursor: pointer;
          transition: all 0.2s ease;
          font-weight: 400;
        }

        .pagination-number:hover {
          background: #F5F5F7;
        }

        .pagination-number.active {
          background: #FFFFFF;
          color: #213F7D;
          font-weight: 500;
        }

        .pagination-ellipsis {
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 24px;
          height: 24px;
          font-size: 14px;
          color: #545F7D;
          user-select: none;
        }

        @media (max-width: 768px) {
          .pagination-container {
            flex-direction: column;
            gap: 16px;
            padding: 16px;
          }

          .pagination-left {
            width: 100%;
            justify-content: center;
          }

          .pagination-controls {
            width: 100%;
            justify-content: center;
            flex-wrap: wrap;
          }
        }

        @media (max-width: 480px) {
          .pagination-text {
            font-size: 13px;
          }

          .pagination-select {
            font-size: 13px;
            padding: 5px 24px 5px 10px;
          }

          .pagination-number,
          .pagination-arrow {
            min-width: 28px;
            height: 28px;
            font-size: 13px;
          }
        }
      `}</style>
    </div>
  );
};

export default Pagination;