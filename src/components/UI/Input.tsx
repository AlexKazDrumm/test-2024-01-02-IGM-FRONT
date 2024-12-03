import React from 'react';

interface InputProps {
  type: string;
  name?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = ({
  type,
  name,
  placeholder,
  value,
  onChange,
}) => {
  return (
    <input
      className="px-3 py-2 border border-gray-700 bg-gray-800 text-gray-200 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
    />
  );
};

export default Input;
