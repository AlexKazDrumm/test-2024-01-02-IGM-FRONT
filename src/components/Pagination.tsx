import React from 'react';

interface PaginationProps {
  currentPage: number;
  numPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  numPages,
  onPageChange,
}) => {
  const getPaginationItems = () => {
    const pages: (number | string)[] = [];

    if (numPages <= 7) {
      for (let i = 1; i <= numPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push('...');
      for (
        let i = Math.max(2, currentPage - 1);
        i <= Math.min(numPages - 1, currentPage + 1);
        i++
      ) {
        pages.push(i);
      }
      if (currentPage < numPages - 2) pages.push('...');
      pages.push(numPages);
    }

    return pages;
  };

  return (
    <div className="flex gap-2 justify-center mt-5">
      {getPaginationItems().map((page, index) =>
        page === '...' ? (
          <span key={index} className="px-3 py-1 text-gray-500">
            ...
          </span>
        ) : (
          <button
            key={index}
            onClick={() => onPageChange(Number(page))}
            className={`px-3 py-2 border rounded-md cursor-pointer transition ${
              currentPage === page
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-gray-700 text-gray-200 border-gray-700 hover:bg-gray-600'
            }`}
          >
            {page}
          </button>
        )
      )}
    </div>
  );
};

export default Pagination;
