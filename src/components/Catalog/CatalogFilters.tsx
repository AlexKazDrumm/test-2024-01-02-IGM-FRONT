import React from 'react';
import SearchBar from './SearchBar';
import SortControls from './SortControls';
import { SortOption, OrderOption } from '@/types';

interface SortOptionLabel {
  value: SortOption;
  label: string;
}

interface CatalogFiltersProps {
  localQuery: string;
  onSearch: (query: string) => void;
  onSortChange: (sort: SortOption) => void;
  onOrderChange: (order: OrderOption) => void;
  onReset: () => void;
  sort: SortOption;
  order: OrderOption;
  sortOptions: SortOptionLabel[];
  placeholder: string;
  showResetButton: boolean;
}

const CatalogFilters: React.FC<CatalogFiltersProps> = ({
  localQuery,
  onSearch,
  onSortChange,
  onOrderChange,
  onReset,
  sort,
  order,
  sortOptions,
  placeholder,
  showResetButton,
}) => {
  return (
    <div className="flex flex-wrap gap-4 items-center mb-6">
      <SearchBar
        initialQuery={localQuery}
        onSearch={onSearch}
        placeholder={placeholder}
      />
      <SortControls
        sort={sort}
        order={order}
        onSortChange={onSortChange}
        onOrderChange={onOrderChange}
        sortOptions={sortOptions}
        disabled={!!localQuery}
      />
      {showResetButton && (
        <button
          onClick={onReset}
          title="Сбросить фильтры"
          className="text-red-500 text-xl"
        >
          &#10005;
        </button>
      )}
    </div>
  );
};

export default CatalogFilters;