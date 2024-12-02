import React from 'react';

interface ButtonProps {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  disabled,
  className = '',
  type = 'button',
  variant = 'primary',
}) => {
  const baseClasses = "px-4 py-2 rounded-lg transition duration-300 ease-in-out disabled:cursor-not-allowed";
  const variantClasses = variant === 'primary'
    ? "bg-blue-600 text-white hover:bg-blue-500 disabled:bg-gray-700"
    : "bg-gray-700 text-gray-200 hover:bg-gray-600 disabled:bg-gray-600";

  return (
    <button
      type={type}
      className={`${baseClasses} ${variantClasses} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
