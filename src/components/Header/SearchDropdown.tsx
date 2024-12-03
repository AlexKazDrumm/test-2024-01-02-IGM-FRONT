import React, { FC } from 'react';
import { CatalogType, MediaItem } from '@/types';
import SearchResultItem from './SearchResultItem';

interface SearchDropdownProps {
  results: Record<CatalogType, MediaItem[]>;
  counts: Record<CatalogType, number>;
  catalogSettings: typeof import('@/config/catalogConfig').default;
  onResultClick: (type: CatalogType, id: number | string) => void;
  onViewMore: (type: CatalogType) => void;
  isLoading: boolean;
}

const SearchDropdown: FC<SearchDropdownProps> = ({
  results,
  counts,
  catalogSettings,
  onResultClick,
  onViewMore,
  isLoading,
}) => {
  return (
    <div className="absolute top-full left-0 mt-1 bg-gray-800 border border-gray-700 rounded-lg shadow-lg w-full z-50">
      {isLoading ? (
        <div className="p-3 text-gray-400">Загрузка...</div>
      ) : (
        Object.keys(catalogSettings).map((type) => {
          const catalogType = type as CatalogType;
          const items = results[catalogType];
          const count = counts[catalogType];

          const hasResults = items && items.length > 0;

          return (
            <div key={catalogType} className="p-3 border-b last:border-b-0 border-gray-700">
              <h4 className="font-bold text-gray-400 mb-2">
                {catalogSettings[catalogType].search.title}:
              </h4>
              {hasResults ? (
                <>
                  <ul className="list-none p-0 m-0 space-y-2">
                    {items.map((item) => (
                      <SearchResultItem
                        key={item.id}
                        item={item}
                        onClick={() => onResultClick(catalogType, item.id)}
                      />
                    ))}
                  </ul>
                  {count > items.length && (
                    <button
                      className="mt-2 text-blue-400 hover:underline"
                      onClick={() => onViewMore(catalogType)}
                    >
                      ... И ещё {count - items.length} результатов
                    </button>
                  )}
                </>
              ) : (
                <p className="text-gray-500">Нет результатов</p>
              )}
            </div>
          );
        })
      )}
    </div>
  );
};

export default SearchDropdown;