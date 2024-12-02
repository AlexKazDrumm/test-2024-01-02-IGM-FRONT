import Link from 'next/link';
import HeaderSearchBar from './HeaderSearchBar';
import { useState } from 'react';

const Header: React.FC = () => {
  const [isCatalogOpen, setIsCatalogOpen] = useState(false);

  const handleMouseEnter = () => {
    setIsCatalogOpen(true);
  };

  const handleMouseLeave = () => {
    setIsCatalogOpen(false);
  };

  return (
    <header className="bg-gray-800 py-4 px-6 shadow-md border-b border-gray-700">
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex-shrink-0">
          <Link href="/">
            <img
              src="/logo.png"
              alt="Logo"
              className="h-10 object-contain"
            />
          </Link>
        </div>
        <nav className="flex items-center space-x-4 relative">
          <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <button
              className="font-medium text-gray-200 hover:text-blue-400 focus:outline-none"
            >
              Каталог
            </button>
            {isCatalogOpen && (
              <div className="absolute left-0 top-full w-48 bg-gray-700 rounded-md shadow-lg z-50">
                <Link
                  href="/catalog/movies"
                  className="block px-4 py-2 text-gray-200 hover:bg-blue-500 hover:text-white rounded-t-md"
                >
                  Фильмы
                </Link>
                <Link
                  href="/catalog/games"
                  className="block px-4 py-2 text-gray-200 hover:bg-blue-500 hover:text-white"
                >
                  Игры
                </Link>
                <Link
                  href="/catalog/board-games"
                  className="block px-4 py-2 text-gray-200 hover:bg-blue-500 hover:text-white"
                >
                  Настольные игры
                </Link>
                <Link
                  href="/catalog/books"
                  className="block px-4 py-2 text-gray-200 hover:bg-blue-500 hover:text-white rounded-b-md"
                >
                  Книги
                </Link>
              </div>
            )}
          </div>
          <Link href="/about" className="font-medium text-gray-200 hover:text-blue-400">
            О нас
          </Link>
          <Link href="/contact" className="font-medium text-gray-200 hover:text-blue-400">
            Контакты
          </Link>
        </nav>
        <div className="w-full mt-3 md:mt-0 md:w-auto">
          <HeaderSearchBar />
        </div>
      </div>
    </header>
  );
};

export default Header;
