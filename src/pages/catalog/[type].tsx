import type { GetServerSideProps } from 'next';
import Layout from '../../components/UI/Layout';
import Loader from '../../components/Catalog/Loader';
import { fetchItems } from '@/api/fetchItems';
import { useRouteLoading } from '@/hooks/useRouteLoading';
import catalogSettings from '@/config/catalogConfig';
import { MediaItem, SortOption, OrderOption, CatalogType } from '@/types';
import { useEffect, useState } from 'react';
import CatalogFilters from '@/components/Catalog/CatalogFilters';
import CatalogContent from '@/components/Catalog/CatalogContent';
import { useCatalog } from '@/hooks/useCatalog';

interface CatalogProps {
  items: MediaItem[];
  num_pages: number;
  current_page: number;
  query: string;
  sort: SortOption;
  order: OrderOption;
  type: CatalogType;
}

export const getServerSideProps: GetServerSideProps = async ({ query, params }) => {
  const type = params?.type as CatalogType;

  if (!catalogSettings[type]) {
    return { notFound: true };
  }

  const page = Math.min(parseInt((query.page as string) || '1', 10), 500);
  const searchQuery = (query.query as string) || '';
  const sort = (query.sort as SortOption) || catalogSettings[type].defaultSort;
  const order = (query.order as OrderOption) || catalogSettings[type].defaultOrder;

  try {
    const data = await fetchItems(type, page, searchQuery, sort, order);

    return {
      props: {
        items: data.items,
        num_pages: data.num_pages,
        current_page: data.current_page,
        query: searchQuery,
        sort,
        order,
        type,
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        items: [],
        num_pages: 0,
        current_page: page,
        query: searchQuery,
        sort,
        order,
        type,
      },
    };
  }
};

const CatalogPage: React.FC<CatalogProps> = ({
  items,
  num_pages,
  current_page,
  query,
  sort,
  order,
  type,
}) => {
  const loading = useRouteLoading(type);

  const { typeTitle, placeholderUrl, sortOptions, defaultSort, defaultOrder } = catalogSettings[type];
  const [localQuery, setLocalQuery] = useState(query);

  useEffect(() => {
    setLocalQuery(query);
  }, [query]);

  const {
    handlePageChange,
    handleSearch,
    handleSortChange,
    handleOrderChange,
    handleResetFilters,
  } = useCatalog({
    type,
    currentParams: { query, page: current_page, sort, order },
    defaultSort,
    defaultOrder,
  });

  const showResetButton = Boolean(
    query ||
    sort !== defaultSort ||
    order !== defaultOrder
  );

  return (
    <Layout>
      <h1 className="text-3xl font-bold text-center text-gray-100 mb-6">
        Каталог {typeTitle}
      </h1>
      <CatalogFilters
        localQuery={localQuery}
        onSearch={handleSearch}
        onSortChange={handleSortChange}
        onOrderChange={handleOrderChange}
        onReset={handleResetFilters}
        sort={sort}
        order={order}
        sortOptions={sortOptions}
        placeholder={`Поиск ${typeTitle}...`}
        showResetButton={showResetButton}
      />
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader />
        </div>
      ) : (
        <CatalogContent
          items={items}
          type={type}
          placeholderUrl={placeholderUrl}
          current_page={current_page}
          num_pages={num_pages}
          onPageChange={handlePageChange}
          typeTitle={typeTitle}
        />
      )}
    </Layout>
  );
};

export default CatalogPage;