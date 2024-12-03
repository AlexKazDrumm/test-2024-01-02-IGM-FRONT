import React, { useState, useEffect } from 'react';
import Button from '../UI/Button';
import FiltersContainer from './FiltersContainer';

interface SearchBarProps {
  initialQuery: string;
  onSearch: (query: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  initialQuery,
  onSearch,
  placeholder,
}) => {
  const [searchInput, setSearchInput] = useState<string>(initialQuery);

  useEffect(() => {
    setSearchInput(initialQuery);
  }, [initialQuery]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedQuery = searchInput.trim();
    onSearch(trimmedQuery);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3 items-center">
      <FiltersContainer>
        <input
          type="text"
          name="query"
          placeholder={placeholder || 'Поиск...'}
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="flex-grow px-4 py-2 border border-gray-700 bg-gray-800 text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <Button
          type="submit"
          text="Поиск"
          variant="primary"
          className="px-4 py-2"
        />
      </FiltersContainer>
    </form>
  );
};

export default SearchBar;