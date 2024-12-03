import { useState, useCallback } from 'react';
import { CatalogType, MediaItem } from '@/types';
import catalogSettings from '@/config/catalogConfig';
import { debounce } from '@/utils/debounce';

const useSearch = () => {
  const [searchInput, setSearchInput] = useState('');
  const [results, setResults] = useState<Record<CatalogType, MediaItem[]>>(() => {
    const initial: Partial<Record<CatalogType, MediaItem[]>> = {};
    Object.keys(catalogSettings).forEach((type) => {
      initial[type as CatalogType] = [];
    });
    return initial as Record<CatalogType, MediaItem[]>;
  });
  const [counts, setCounts] = useState<Record<CatalogType, number>>(() => {
    const initial: Partial<Record<CatalogType, number>> = {};
    Object.keys(catalogSettings).forEach((type) => {
      initial[type as CatalogType] = 0;
    });
    return initial as Record<CatalogType, number>;
  });
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = useCallback(async (query: string) => {
    setIsLoading(true);
    try {
      const types = Object.keys(catalogSettings) as CatalogType[];
      const fetchPromises = types.map(async (type) => {
        try {
          const response = await fetch(`${catalogSettings[type].search.endpoint}?query=${encodeURIComponent(query)}`);
          if (!response.ok) {
            console.error(`Ошибка при запросе для типа ${type}: ${response.statusText}`);
            return { items: [], count: 0 };
          }
          const contentType = response.headers.get('Content-Type');
          if (contentType && contentType.includes('application/json')) {
            const data = await response.json();

            return data;
          } else {
            console.error(`Некорректный формат ответа для типа ${type}`);
            return { items: [], count: 0 };
          }
        } catch (err) {
          console.error(`Ошибка при запросе для типа ${type}:`, err);
          return { items: [], count: 0 };
        }
      });

      const data = await Promise.all(fetchPromises);

      const newResults: Record<CatalogType, MediaItem[]> = {} as Record<CatalogType, MediaItem[]>;
      const newCounts: Record<CatalogType, number> = {} as Record<CatalogType, number>;

      types.forEach((type, index) => {
        newResults[type] = data[index].items.slice(0, 3);
        newCounts[type] = data[index].count;
      });

      setResults(newResults);
      setCounts(newCounts);
    } catch (err) {
      console.error('Ошибка при поиске:', err);

      const emptyResults: Record<CatalogType, MediaItem[]> = {} as Record<CatalogType, MediaItem[]>;
      const emptyCounts: Record<CatalogType, number> = {} as Record<CatalogType, number>;
      Object.keys(catalogSettings).forEach((type) => {
        emptyResults[type as CatalogType] = [];
        emptyCounts[type as CatalogType] = 0;
      });
      setResults(emptyResults);
      setCounts(emptyCounts);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const debouncedFetch = useCallback(debounce(fetchData, 300), [fetchData]);

  const handleSearch = useCallback(
    (query: string) => {
      const trimmedInput = query.trim();
      if (trimmedInput === '') {
        const emptyResults: Record<CatalogType, MediaItem[]> = {} as Record<CatalogType, MediaItem[]>;
        const emptyCounts: Record<CatalogType, number> = {} as Record<CatalogType, number>;
        Object.keys(catalogSettings).forEach((type) => {
          emptyResults[type as CatalogType] = [];
          emptyCounts[type as CatalogType] = 0;
        });
        setResults(emptyResults);
        setCounts(emptyCounts);
        return;
      }
      debouncedFetch(trimmedInput);
    },
    [debouncedFetch]
  );

  return {
    searchInput,
    setSearchInput,
    results,
    counts,
    isLoading,
    handleSearch,
  };
};

export default useSearch;