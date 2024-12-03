import { useState } from 'react';
import Link from 'next/link';
import { catalogItems } from '@/config/catalogConfig';

const CatalogDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button className="font-medium text-gray-200 hover:text-blue-400 focus:outline-none">
        Каталог
      </button>
      {isOpen && (
        <div className="absolute left-0 top-full w-48 bg-gray-700 rounded-md shadow-lg z-50">
          {catalogItems.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              className={`block px-4 py-2 text-gray-200 hover:bg-blue-500 hover:text-white ${
                index === 0 ? 'rounded-t-md' : index === catalogItems.length - 1 ? 'rounded-b-md' : ''
              }`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default CatalogDropdown;