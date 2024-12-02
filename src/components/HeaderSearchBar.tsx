// src/components/HeaderSearchBar.tsx

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/router';
import { CatalogType, MediaItem } from '../types';
import catalogSettings from '@/config/catalogConfig';
import { useClickOutside } from '../hooks/useClickOutside';
import { formatDate } from '@/utils/formatDate';
import { debounce } from '@/utils/debounce';

const HeaderSearchBar: React.FC = () => {
  const [searchInput, setSearchInput] = useState('');
  const [results, setResults] = useState<{ [key in CatalogType]: MediaItem[] }>({} as any);
  const [isDropdownVisible, setDropdownVisible] = useState(false);
  const [counts, setCounts] = useState<{ [key in CatalogType]: number }>({} as any);
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useClickOutside(dropdownRef, () => setDropdownVisible(false));

  const fetchData = useCallback(async (query: string) => {
    try {
      const types = Object.keys(catalogSettings) as CatalogType[];
      const fetchPromises = types.map((type) =>
        fetch(`${catalogSettings[type].search.endpoint}?query=${encodeURIComponent(query)}`).then(
          (res) => res.json()
        )
      );

      const data = await Promise.all(fetchPromises);

      const newResults: { [key in CatalogType]: MediaItem[] } = {} as any;
      const newCounts: { [key in CatalogType]: number } = {} as any;

      types.forEach((type, index) => {
        newResults[type] = data[index].items.slice(0, 3);
        newCounts[type] = data[index].count;
      });

      setResults(newResults);
      setCounts(newCounts);
      setDropdownVisible(true);
    } catch (error) {
      console.error('Ошибка при поиске:', error);
      setResults({} as any);
      setCounts({} as any);
      setDropdownVisible(false);
    }
  }, []);

  const debouncedFetch = useCallback(debounce(fetchData, 300), [fetchData]);

  useEffect(() => {
    const trimmedInput = searchInput.trim();
    if (trimmedInput === '') {
      setResults({} as any);
      setCounts({} as any);
      setDropdownVisible(false);
      return;
    }
    debouncedFetch(trimmedInput);
  }, [searchInput, debouncedFetch]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleResultClick = (type: CatalogType, id: number | string) => {
    router.push(`/catalog/${type}/${encodeURIComponent(id)}`);
    setDropdownVisible(false);
  };

  const handleViewMore = (type: CatalogType) => {
    router.push(`/catalog/${type}?query=${encodeURIComponent(searchInput)}`);
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
        <div className="absolute top-full left-0 mt-1 bg-gray-800 border border-gray-700 rounded-lg shadow-lg w-full z-50">
          {Object.keys(catalogSettings).map((type) => (
            <div key={type} className="p-3 border-b last:border-b-0 border-gray-700">
              <h4 className="font-bold text-gray-400 mb-2">
                {catalogSettings[type as CatalogType].search.title}:
              </h4>
              {results[type as CatalogType] && results[type as CatalogType].length > 0 ? (
                <>
                  <ul className="list-none p-0 m-0 space-y-2">
                    {results[type as CatalogType].map((item) => (
                      <li
                        key={item.id}
                        className="cursor-pointer text-gray-200 hover:text-blue-400"
                        onClick={() => handleResultClick(type as CatalogType, item.id)}
                      >
                        {item.title}{' '}
                        {item.release_date ? `(${formatDate(item.release_date)})` : ''}
                      </li>
                    ))}
                  </ul>
                  {counts[type as CatalogType] > results[type as CatalogType].length && (
                    <button
                      className="mt-2 text-blue-400 hover:underline"
                      onClick={() => handleViewMore(type as CatalogType)}
                    >
                      ... И ещё {counts[type as CatalogType] - results[type as CatalogType].length}{' '}
                      результатов
                    </button>
                  )}
                </>
              ) : (
                <p className="text-gray-500">Нет результатов</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HeaderSearchBar;
