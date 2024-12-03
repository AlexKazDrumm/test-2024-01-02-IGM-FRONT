import React, { FC } from 'react';
import { MediaItem } from '@/types';
import { formatDate } from '@/utils/formatDate';

interface SearchResultItemProps {
  item: MediaItem;
  onClick: () => void;
}

const SearchResultItem: FC<SearchResultItemProps> = ({ item, onClick }) => {
  return (
    <li
      className="cursor-pointer text-gray-200 hover:text-blue-400"
      onClick={onClick}
    >
      {item.title} {item.release_date ? `(${formatDate(item.release_date)})` : ''}
    </li>
  );
};

export default SearchResultItem;