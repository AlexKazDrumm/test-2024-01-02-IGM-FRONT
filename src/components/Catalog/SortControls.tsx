import React from 'react';
import Select from '../UI/Select';
import { SortOption, OrderOption } from '@/types';
import FiltersContainer from './FiltersContainer';
import SortOrderToggle from './SortOrderToggle';

interface SortOptionType {
  value: SortOption;
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
  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSortChange(e.target.value as SortOption);
  };

  return (
    <FiltersContainer>
      <Select
        options={sortOptions}
        value={sort}
        onChange={handleSortChange}
        disabled={disabled}
      />
      <SortOrderToggle
        currentOrder={order}
        onOrderChange={onOrderChange}
        disabled={disabled}
      />
    </FiltersContainer>
  );
};

export default SortControls;