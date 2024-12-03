import Link from 'next/link';
import HeaderSearchBar from './HeaderSearchBar';
import CatalogDropdown from './CatalogDropdown';
import NavLink from './NavLink';
import { FC } from 'react';

const Header: FC = () => {
  return (
    <header className="bg-gray-800 py-4 px-6 shadow-md border-b border-gray-700">
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex-shrink-0">
          <Link href="/">
            <img src="/logo.png" alt="Logo" className="h-10 object-contain" />
          </Link>
        </div>
        <nav className="flex items-center space-x-4 relative">
          <CatalogDropdown />
          <NavLink href="/about">О нас</NavLink>
          <NavLink href="/contact">Контакты</NavLink>
        </nav>
        <div className="w-full mt-3 md:mt-0 md:w-auto">
          <HeaderSearchBar />
        </div>
      </div>
    </header>
  );
};

export default Header;