import React from 'react';

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  options: Option[];
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  disabled?: boolean;
}

const Select: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  disabled,
}) => {
  return (
    <select
      className="px-3 py-2 border border-gray-700 bg-gray-800 text-gray-200 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:bg-gray-700 disabled:text-gray-400"
      value={value}
      onChange={onChange}
      disabled={disabled}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
