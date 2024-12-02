import { useRouter } from 'next/router';
import type { GetServerSideProps } from 'next';
import Layout from '../../components/Layout';
import Card from '../../components/Card';
import Pagination from '../../components/Pagination';
import SearchBar from '../../components/SearchBar';
import SortControls from '../../components/SortControls';
import Loader from '../../components/Loader';
import { fetchItems } from '../../api/fetchItems';
import { useRouteLoading } from '../../hooks/useRouteLoading';
import { buildCatalogUrl } from '../../utils/buildCatalogUrl';
import catalogSettings from '@/config/catalogConfig';
import { MediaItem, SortOption, OrderOption, CatalogType } from '../../types';

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
  const router = useRouter();
  const loading = useRouteLoading(type);

  const { typeTitle, placeholderUrl, sortOptions } = catalogSettings[type];

  const updateCatalog = (
    updatedParams: Partial<{
      query: string;
      page: number;
      sort: SortOption;
      order: OrderOption;
    }>
  ) => {
    const newQuery = updatedParams.query !== undefined ? updatedParams.query : query;
    const newPage = updatedParams.page !== undefined ? updatedParams.page : current_page;
    const newSort = updatedParams.sort !== undefined ? updatedParams.sort : sort;
    const newOrder = updatedParams.order !== undefined ? updatedParams.order : order;

    router.push(
      buildCatalogUrl({
        type,
        query: newQuery,
        page: newPage,
        sort: newSort,
        order: newOrder,
      })
    );
  };

  const handlePageChange = (page: number) => updateCatalog({ page });
  const handleSearch = (searchQuery: string) =>
    updateCatalog({ query: searchQuery, page: 1 });
  const handleSortChange = (selectedSort: SortOption) =>
    updateCatalog({ sort: selectedSort, page: 1 });
  const handleOrderChange = (newOrder: OrderOption) =>
    updateCatalog({ order: newOrder, page: 1 });
  const handleResetFilters = () => router.push(`/catalog/${type}`);

  const showResetButton = Boolean(
    query ||
      sort !== catalogSettings[type].defaultSort ||
      order !== catalogSettings[type].defaultOrder
  );

  return (
    <Layout>
      <h1 className="text-3xl font-bold text-center text-gray-100 mb-6">
        Каталог {typeTitle}
      </h1>
      <div className="flex flex-wrap gap-4 items-center mb-6">
        <SearchBar
          initialQuery={query}
          onSearch={handleSearch}
          placeholder={`Поиск ${typeTitle}...`}
        />
        <SortControls
          sort={sort}
          order={order}
          onSortChange={handleSortChange}
          onOrderChange={handleOrderChange}
          sortOptions={sortOptions}
          disabled={!!query}
        />
        {showResetButton && (
          <button
            onClick={handleResetFilters}
            title="Сбросить фильтры"
            className="text-red-500 text-xl"
          >
            &#10005;
          </button>
        )}
      </div>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader />
        </div>
      ) : items.length === 0 ? (
        <p className="text-center text-lg text-gray-500">
          {typeTitle} не найдены.
        </p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {items.map((item) => (
              <Card
                key={`${type}-${item.id}`}
                item={item}
                placeholderUrl={catalogSettings[type].placeholderUrl}
              />
            ))}
          </div>
          <div className="mt-8">
            <Pagination
              currentPage={current_page}
              numPages={num_pages}
              onPageChange={handlePageChange}
            />
          </div>
        </>
      )}
    </Layout>
  );
};

export default CatalogPage;