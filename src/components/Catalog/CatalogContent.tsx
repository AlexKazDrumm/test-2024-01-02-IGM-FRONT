import React from 'react';
import Card from '../Card/Card';
import Pagination from './Pagination';
import { MediaItem, CatalogType } from '@/types';

interface CatalogContentProps {
  items: MediaItem[];
  type: CatalogType;
  placeholderUrl: string;
  current_page: number;
  num_pages: number;
  onPageChange: (page: number) => void;
  typeTitle: string;
}

const CatalogContent: React.FC<CatalogContentProps> = ({
  items,
  type,
  placeholderUrl,
  current_page,
  num_pages,
  onPageChange,
  typeTitle,
}) => {
  if (items.length === 0) {
    return (
      <p className="text-center text-lg text-gray-500">
        {typeTitle} не найдены.
      </p>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map((item) => (
          <Card
            key={`${type}-${item.id}`}
            item={item}
            placeholderUrl={placeholderUrl}
          />
        ))}
      </div>
      <div className="mt-8">
        <Pagination
          currentPage={current_page}
          numPages={num_pages}
          onPageChange={onPageChange}
        />
      </div>
    </>
  );
};

export default CatalogContent;