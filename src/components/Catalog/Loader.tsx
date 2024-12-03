import React from 'react';

const Loader: React.FC = () => {
  return (
    <div className="flex items-center justify-center h-48">
      <div className="border-8 border-gray-700 border-t-blue-500 rounded-full w-16 h-16 animate-spin"></div>
    </div>
  );
};

export default Loader;
