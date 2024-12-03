import React from 'react';
import { OrderOption } from '@/types';

interface SortOrderToggleProps {
  currentOrder: OrderOption;
  onOrderChange: (order: OrderOption) => void;
  disabled: boolean;
}

const SortOrderToggle: React.FC<SortOrderToggleProps> = ({ currentOrder, onOrderChange, disabled }) => {
  const ORDER_OPTIONS: { value: OrderOption; label: string; title: string }[] = [
    { value: 'asc', label: '▲', title: 'Сортировка по возрастанию' },
    { value: 'desc', label: '▼', title: 'Сортировка по убыванию' },
  ];

  const handleClick = (order: OrderOption) => {
    if (!disabled && order !== currentOrder) {
      onOrderChange(order);
    }
  };

  return (
    <div className="flex flex-col items-center">
      {ORDER_OPTIONS.map(({ value, label, title }) => (
        <span
          key={value}
          className={`text-sm transition-colors ${
            currentOrder === value ? 'text-blue-500' : 'text-gray-500'
          } ${disabled ? 'cursor-not-allowed text-gray-300' : 'cursor-pointer hover:text-blue-400'}`}
          onClick={() => handleClick(value)}
          title={title}
        >
          {label}
        </span>
      ))}
    </div>
  );
};

export default SortOrderToggle;
