import React from 'react';
import Select from './Select';
import { SortOption, OrderOption } from '../types';
import FiltersContainer from './FiltersContainer';

interface SortOptionType {
  value: string;
  label: string;
}

interface SortControlsProps {
  sort: SortOption;
  order: OrderOption;
  onSortChange: (sort: SortOption) => void;
  onOrderChange: (order: OrderOption) => void;
  sortOptions: SortOptionType[];
  disabled: boolean;
}

const SortControls: React.FC<SortControlsProps> = ({
  sort,
  order,
  onSortChange,
  onOrderChange,
  sortOptions,
  disabled,
}) => {
  return (
    <FiltersContainer>
      <Select
        options={sortOptions}
        value={sort}
        onChange={(e) => onSortChange(e.target.value as SortOption)}
        disabled={disabled}
      />
      <div className="flex flex-col items-center">
        <span
          className={`cursor-pointer text-sm transition-colors ${
            order === 'asc' ? 'text-blue-500' : 'text-gray-500'
          } ${disabled ? 'cursor-not-allowed text-gray-300' : 'hover:text-blue-400'}`}
          onClick={() => !disabled && onOrderChange('asc')}
          title="Сортировка по возрастанию"
        >
          ▲
        </span>
        <span
          className={`cursor-pointer text-sm transition-colors ${
            order === 'desc' ? 'text-blue-500' : 'text-gray-500'
          } ${disabled ? 'cursor-not-allowed text-gray-300' : 'hover:text-blue-400'}`}
          onClick={() => !disabled && onOrderChange('desc')}
          title="Сортировка по убыванию"
        >
          ▼
        </span>
      </div>
    </FiltersContainer>
  );
};

export default SortControls;
