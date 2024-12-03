import React, { useState, useEffect, useRef, ChangeEvent, FC } from 'react';
import { useRouter } from 'next/router';
import catalogSettings from '@/config/catalogConfig';
import { useClickOutside } from '@/hooks/useClickOutside';
import useSearch from '@/hooks/useSearch';
import SearchDropdown from './SearchDropdown';
import { CatalogType } from '@/types';

const HeaderSearchBar: FC = () => {
  const {
    searchInput,
    setSearchInput,
    results,
    counts,
    isLoading,
    handleSearch,
  } = useSearch();
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside(dropdownRef, () => setDropdownVisible(false));

  useEffect(() => {
    if (searchInput.trim() !== '') {
      handleSearch(searchInput);
      setDropdownVisible(true);
    } else {
      setDropdownVisible(false);
    }
  }, [searchInput, handleSearch]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleResultClick = (type: CatalogType, id: number | string) => {
    router.push(`/catalog/${type}/${encodeURIComponent(id)}`);
    setDropdownVisible(false);
  };

  const handleViewMore = (type: CatalogType) => {
    router.push(`/catalog/${type}?query=${encodeURIComponent(searchInput)}`).then(() => {
      setSearchInput('');
    });
    setDropdownVisible(false);
  };

  const handleFocus = () => {
    if (searchInput.trim() !== '') {
      setDropdownVisible(true);
    }
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <div className="flex">
        <input
          type="text"
          className="w-full px-4 py-2 text-lg border border-gray-700 bg-gray-800 text-gray-200 rounded-lg focus:outline-none focus:ring focus:ring-blue-400"
          placeholder="Поиск..."
          value={searchInput}
          onChange={handleInputChange}
          onFocus={handleFocus}
        />
      </div>
      {isDropdownVisible && (
        <SearchDropdown
          results={results}
          counts={counts}
          catalogSettings={catalogSettings}
          onResultClick={handleResultClick}
          onViewMore={handleViewMore}
          isLoading={isLoading}
        />
      )}
    </div>
  );
};

export default HeaderSearchBar;