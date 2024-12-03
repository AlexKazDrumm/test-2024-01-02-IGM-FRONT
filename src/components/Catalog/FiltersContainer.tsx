import React from 'react';

interface FiltersContainerProps {
  children: React.ReactNode;
}

const FiltersContainer: React.FC<FiltersContainerProps> = ({ children }) => {
  return (
    <div className="flex items-center gap-4 bg-gray-800 p-3 rounded-lg shadow-inner">
      {children}
    </div>
  );
};

export default FiltersContainer;
