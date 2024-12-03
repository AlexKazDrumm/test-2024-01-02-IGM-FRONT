import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { buildCatalogUrl } from '@/utils/buildCatalogUrl';
import { CatalogType, SortOption, OrderOption } from '@/types';

interface UpdateParams {
  query?: string;
  page?: number;
  sort?: SortOption;
  order?: OrderOption;
}

interface UseCatalogParams {
  type: CatalogType;
  currentParams: {
    query: string;
    page: number;
    sort: SortOption;
    order: OrderOption;
  };
  defaultSort: SortOption;
  defaultOrder: OrderOption;
}

export const useCatalog = ({
  type,
  currentParams,
  defaultSort,
  defaultOrder,
}: UseCatalogParams) => {
  const router = useRouter();

  const updateCatalog = useCallback(
    (updatedParams: UpdateParams) => {
      const newQuery = updatedParams.query ?? currentParams.query;
      const newPage = updatedParams.page ?? currentParams.page;
      const newSort = updatedParams.sort ?? currentParams.sort;
      const newOrder = updatedParams.order ?? currentParams.order;

      router.push(
        buildCatalogUrl({
          type,
          query: newQuery,
          page: newPage,
          sort: newSort,
          order: newOrder,
        })
      );
    },
    [router, type, currentParams]
  );

  const handlePageChange = (page: number) => updateCatalog({ page });
  const handleSearch = (searchQuery: string) =>
    updateCatalog({ query: searchQuery, page: 1 });
  const handleSortChange = (selectedSort: SortOption) =>
    updateCatalog({ sort: selectedSort, page: 1 });
  const handleOrderChange = (newOrder: OrderOption) =>
    updateCatalog({ order: newOrder, page: 1 });
  const handleResetFilters = () =>
    updateCatalog({ query: '', sort: defaultSort, order: defaultOrder, page: 1 });

  return {
    handlePageChange,
    handleSearch,
    handleSortChange,
    handleOrderChange,
    handleResetFilters,
  };
};