import { CatalogType, SortOption, OrderOption } from '../types';

interface BuildCatalogUrlParams {
  type: CatalogType;
  query?: string;
  page?: number;
  sort?: SortOption;
  order?: OrderOption;
}

export const buildCatalogUrl = ({
  type,
  query = '',
  page = 1,
  sort,
  order,
}: BuildCatalogUrlParams): string => {
  const params = new URLSearchParams();

  if (query) {
    params.append('query', encodeURIComponent(query));
  }

  if (page && page > 1) {
    params.append('page', page.toString());
  }

  if (sort) {
    params.append('sort', sort);
  }

  if (order) {
    params.append('order', order);
  }

  const queryString = params.toString();
  return `/catalog/${type}${queryString ? `?${queryString}` : ''}`;
};